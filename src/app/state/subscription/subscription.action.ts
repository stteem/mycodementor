import { createAction, props } from '@ngrx/store';
import { Subscription } from './subscription.model';

export const postSubscription = createAction(
  '[Subscription Page] Post Subscription',
  props<{ data: any }>()
);

export const getSubscription = createAction('[Subscription Page] Get Subscription');

export const retrieveSubscription = createAction(
  '[Subscription Page] Retrieve Subscription Success',
  props<{ subscription: Subscription }>()
);

export const SubscriptionFailure = createAction(
  '[Subscription Page] Retrieve Subscription Failure',
  props<{ error: string }>()
);

