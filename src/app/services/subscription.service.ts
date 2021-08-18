import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Store } from '@ngrx/store';

import { retrieveSubscription, getSubscription } from '../state/subscription/subscription.action';
import { Subscription } from '../state/subscription/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient,
    private store: Store,
  	private ProcessHttpmsgService: ProcessHttpmsgService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  post_Subscription(data:any): Observable<any>{
    const body = {plan: data.plan, value: data.value};
    return this.http.post<any>(baseURL + 'user/subscription', body, this.httpOptions)
  	.pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  checkStorage() {
    const loadSubscription = JSON.parse(localStorage.getItem('JWT') || '{}');
    console.log('loadSub ',loadSubscription)
    //let parsedSubscription = JSON.parse(loadSubscription)
    
    if (loadSubscription !== null) {
      let subscription = loadSubscription.subscription;
      console.log('Sub ',subscription)
      if(Object.keys(subscription).length === 0) {
        console.log('dispatching..', Object.keys(subscription).length)
        this.store.dispatch(getSubscription())
      }
      else {
        this.store.dispatch(retrieveSubscription({subscription}));
      }
    } 
  }

  get_Subscription() {
    console.log('get sub called')
    return this.http.get<any>(baseURL + 'user/subscription')
    .pipe(
    shareReplay(),
    catchError(this.ProcessHttpmsgService.handleError));
  }

  submitMail(value:any) {
    return this.http.post<any>(baseURL + 'user/subscription/mail', value, this.httpOptions)
  	.pipe(catchError(this.ProcessHttpmsgService.handleError));
  }
}
