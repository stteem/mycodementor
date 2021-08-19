import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { Store, select } from '@ngrx/store';
import { selectUserData} from '../state/login/user.select';
import { selectSubscriptionData } from '../state/subscription/subscription.select';
import { AppState } from '../state/app.state';
import { sendMessage } from '../state/message/message.action';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public auth: AuthenticationService, 
    public router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.isLoggedIn()) {
      let message = 'You must sign in before you can book a session';
      this.store.dispatch(sendMessage({message}))
      this.router.navigate(['login']);
      return false;
    }
    if (this.isSubscribed() === false && this.subscriptionObj() === 0) {
      let message = 'You must subscribe to a plan before you can book a session';
      this.store.dispatch(sendMessage({message}))
      this.router.navigate(['subscription']);
      return false;
    }
      return true;
  }
  
  isSubscribed(): any {
    this.store.pipe(select(selectUserData))
    .subscribe(res => {
      //console.log('is subscribed ',res.user.isSubscribed)
      return res.user.isSubscribed;
    })
  }

  subscriptionObj(): any {
    this.store.pipe(select(selectSubscriptionData))
    .subscribe(res => {
      return res.subscription.session_per_month;
    })
  }
}
