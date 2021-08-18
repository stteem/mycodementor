import { userReducer } from "./login/login.reducer";
import { subscriptionReducer } from "./subscription/subscription.reducer";
import { combineReducers } from "@ngrx/store";


export const reducer = combineReducers({
    user: userReducer,
    subscription: subscriptionReducer
});