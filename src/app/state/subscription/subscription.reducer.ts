import { createReducer, on, Action } from '@ngrx/store';
import { Subscription } from './subscription.model';
import { AppState } from '../app.state';
import { retrieveSubscription } from './subscription.action';
import { subscriptionState } from '../state.state';


interface SubscriptionState {
  subscription: Subscription
}

export const initialState: SubscriptionState = {
  subscription: subscriptionState
};

export const subscriptionReducer = createReducer(
  initialState,
  on(retrieveSubscription, (state, { subscription }) => {
    return{...state, subscription }
  })
);
