import { createAction, props } from '@ngrx/store';
import { User, UserData } from './user.model';


export const loggin = createAction(
    '[Login Page] Login',
    props<{ user: User }>()
);

export const logginSuccess = createAction(
    '[Login Page] Login Success',
    props<{ user: UserData }>()
);

export const logginFailure = createAction(
    '[Login Page] Login Failure',
    props<{ error: string }>()
);