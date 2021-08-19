import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { SubscriptionService } from './subscription.service';
import { Store, select } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { sendMessage } from '../state/message/message.action';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionResolver implements Resolve<boolean> {

  constructor(
    public subservice: SubscriptionService, 
    public router: Router,
    private store: Store<AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.subservice.get_Subscription()
    .subscribe(res => {
      if (res === null) {
        console.log('resolver res ',res)
        let message = 'You must subscribe to a plan before you can book a session';
        this.store.dispatch(sendMessage({message}))
        this.router.navigate(['subscription']);
        return of(false);
      }
      return of(true);
    })
    
    return of(true);
  }

}
