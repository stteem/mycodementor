import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { loggin } from '../state/login/login.action';
import { User } from '../state/login/user.model';
import { selectMessage } from '../state/message/message.select'
import { AppState } from '../state/app.state';
import { clear_Message } from '../state/message/message.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  loginErrMess? :string | null;

  

  loggedIn?: boolean = false;
  private history: string[] = [];

  isSpinning = false;
  message?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private authservice: AuthenticationService,
    private store: Store<AppState>) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.history.push(event.urlAfterRedirects)
        }
      });
      this.getMessage();
    }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      //userName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      remember: [true]
    });
      console.log('load cred from login')
      this.authservice.loadUserCredentials();
  }

  getMessage() {
    this.store.pipe(select(selectMessage))
    .subscribe(res => {
      this.message = res.message;
      setTimeout(() => {
        this.store.dispatch(clear_Message());
      }, 5000);
    })
  }

  back(): void {
    this.history.pop()
    if (this.history.length > 0) {
      this.location.back()
    } else {
      this.router.navigateByUrl('/')
    }
  }

  submitForm(): void {
    this.loginErrMess = null;
    this.isSpinning = true;
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    const user: User = {
      email: this.validateForm.value.email,
      password: this.validateForm.value.password
    }

    this.authservice.logIn(user)
    .subscribe({
      next: (res) => {
        if (res.success) this.isSpinning = false;
        if(res.isSubscribed === true) this.router.navigateByUrl('/booksession');
        else this.router.navigateByUrl('/subscription'); 
      },
      error: (error) => {
        console.log('login error', error)
        this.isSpinning = false;
        this.loginErrMess = error;
      }
    })
  }

}
