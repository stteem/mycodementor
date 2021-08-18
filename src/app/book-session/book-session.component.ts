import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AuthenticationService } from '../services/auth.service';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-book-session',
  templateUrl: './book-session.component.html',
  styleUrls: ['./book-session.component.scss']
})
export class BookSessionComponent implements OnInit {
  size: NzButtonSize = 'large';

  constructor(private authservice: AuthenticationService,
    private subservice: SubscriptionService) { 
      this.get_Subscription();
    }

  ngOnInit(): void {
    console.log('load cred from book session')
    this.authservice.loadUserCredentials();
  }

  get_Subscription(){
    this.authservice.loggedIn()
    .subscribe({
      next: res => {
        console.log('loggedin? book ',res)
        if (res === true) {
          this.subservice.checkStorage();
        }
      },
      error: error => console.log(error)
    })
   
  }

  /*isCalendlyEvent(e: any) {
    return e.data.event &&
           e.data.event.indexOf('calendly') === 0;
  };
   
  window.addEventListener(
    'message',
    (e) {
      if (isCalendlyEvent(e)) {
        console.log(e.data);
      }
    }
  );*/

}
