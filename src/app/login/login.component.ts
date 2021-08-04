import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  loginErrMess? :string;
  user = {email: '', password: ''};

  loggedIn?: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthenticationService) {}

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

  submitForm(): void {
    console.log('User: ', this.user);
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    this.authservice.logIn(this.user)
    .subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigateByUrl('/booksession')
        }
      },
      error: (error) => {
        console.log('login error', error)
        this.loginErrMess = error;
      }
    })
  }

}
