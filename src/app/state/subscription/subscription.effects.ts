import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { SubscriptionService } from '../../services/subscription.service';
import { getSubscription, retrieveSubscription, postSubscription, SubscriptionFailure } from './subscription.action';

@Injectable()
export class SubscriptionEffects {

  getSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(getSubscription),
    mergeMap(() => this.subscriptionservice.get_Subscription()
      .pipe(
        map(subscription => retrieveSubscription({subscription})),
        catchError(() => EMPTY)
      ))
    )
  );

  postSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(postSubscription),
    mergeMap(({data}) => this.subscriptionservice.post_Subscription(data)
      .pipe(
        map(subscription => retrieveSubscription({subscription})),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private subscriptionservice: SubscriptionService
  ) {}
}