import { userReducer } from "./login/login.reducer";
import { subscriptionReducer } from "./subscription/subscription.reducer";
import { messageReducer } from "./message/message.reducer";
import { combineReducers } from "@ngrx/store";


export const reducer = combineReducers({
    user: userReducer,
    subscription: subscriptionReducer,
    message: messageReducer
});