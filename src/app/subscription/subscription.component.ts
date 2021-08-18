import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';
import { Store, select } from '@ngrx/store';
import { selectSubscriptionData} from '../state/subscription/subscription.select';
import { AppState } from '../state/app.state';
import { getSubscription, postSubscription } from '../state/subscription/subscription.action';
import { Subscription } from '../state/subscription/subscription.model';

import { FormBuilder, FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';






@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  subscription_plan?: Subscription;
  dot = true;
  subErrMess?: string;
  notLogged? = true;
  message?: string;
  closeResult = '';
  

  validateForm!: FormGroup;


  constructor(private authservice: AuthenticationService,
      private subservice: SubscriptionService,
      private store: Store<AppState>,
      private router: Router,
      private fb: FormBuilder,
      private modalService: NgbModal
      ) { 
        this.validateForm = this.fb.group({
          companyname: ['', [Validators.required]],
          email: ['', [Validators.email, Validators.required]],
          comment: ['', [Validators.required]]
        });
  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {

      // TO DO // Dispatch action to get user login state
      this.authservice.loadUserCredentials();
      this.retrieveSubscriptionStore();
      this.get_Subscription();
      //console.log('sub ',this.subscription_plan)
  }

  retrieveSubscriptionStore() {
    console.log('retrieveSubscriptionStore')
    this.store.pipe(select(selectSubscriptionData))
    .subscribe(res => {
      if(res.subscription == null){
        this.message = "You have not subscribed to any plan, subscribe to start booking sessions";
      }else {
        this.message = '';
        this.subscription_plan = res.subscription;
        console.log('this.sub ',this.subscription_plan)
      }
    })
  }

  get_Subscription(){
    this.authservice.loggedIn()
    .subscribe({
      next: res => {
        console.log('loggedin? ',res)
        if (res === true) {
          this.notLogged = false;
          this.subservice.checkStorage();
          //this.store.dispatch(getSubscription()) 
        }
      },
      error: error => console.log(error)
    })
   
  }

  post_Subscription(plan: string, value: number): void {
    // Check if user is logged in
    this.authservice.loggedIn()
    .subscribe({
      next: res => {
        console.log('auth res ',res)
        if(res === true){
          if (plan === 'free' && value === 0) {
            // Send to database without payment
            let data = {plan, value}
            this.store.dispatch(postSubscription({data}))
          } else {
            // Call payment gateway
          }
        }
        else {
          // Navigate to login page
          this.router.navigateByUrl('/login');
        }
      },
      error: error => console.log(error)
    })
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

  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    
    this.subservice.submitMail(value)
    .subscribe({
      next: (res) => {
        console.log(res)
        this.message = "Mail sent, we'll get back to you shortly";
      },
      error: (error) => {
        this.subErrMess = error;
      }
    })
  }

}
