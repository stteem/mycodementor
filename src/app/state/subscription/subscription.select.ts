import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Subscription } from './subscription.model';


const selectSubscription = (state: AppState) => state.appstate.subscription.subscription;

export const selectSubscriptionData = createSelector(
    selectSubscription,
    (subscription: Subscription) => {
        return {subscription};
    }
);
