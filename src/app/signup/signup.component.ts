import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { SignupService } from '../services/signup.service';
//import { Signup } from '../shared/signup';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  validateForm: FormGroup;
  signUpErrMess: string =  '';

  ngOnInit(): void {
    console.log('load cred from sign up')
      this.authservice.loadUserCredentials();
  }

  emailAsyncValidator = (control: FormControl) =>
  new Observable((observer: Observer<ValidationErrors | null>) => {
    setTimeout(() => {
      
      this.signupservice.emailExists(control.value)
      .subscribe({
        next: (res) => {
          console.log('email res ',res)
          if (control.value === res[0].email) {
            // you have to return `{error: true}` to mark it as an error event
            observer.next({ error: true, duplicated: true });
          }else {
            observer.next(null);
          }
          observer.complete();
        },
        error: (error) => {
          console.log('error ',error);
          observer.next({ error: true, AbortSignal: true });
        },
        complete: () => console.log('complete')
      })
    }, 1000);
  });


  constructor(private fb: FormBuilder,
    private signupservice: SignupService,
    private router: Router,
    private location: Location,
    private authservice: AuthenticationService
    ) {
      this.validateForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required], [this.emailAsyncValidator]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }


  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    
    delete value.confirm;
    console.log('delete confirm ',value);
    this.signupservice.submitSignup(value)
    .subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigateByUrl('/login')
      },
      error: (error) => {
        this.signUpErrMess = error;
      }
    })
  }
  
}
