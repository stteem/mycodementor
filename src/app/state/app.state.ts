import { Subscription } from './subscription/subscription.model';
import { UserData } from './login/user.model';

export interface AppState {
    appstate: {
        user: {
            user: UserData;
        },
        subscription: {
            subscription: Subscription;
        }
    }
}