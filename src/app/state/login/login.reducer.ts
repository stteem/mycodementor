import { createReducer, on, Action } from '@ngrx/store';
import { logginSuccess } from './login.action';
import { userState } from '../state.state';
import { UserData } from './user.model'

interface UserState {
    user: UserData
}

export const initialState: UserState = {
  user: userState
};

export const userReducer = createReducer(
  initialState,
  on(logginSuccess, (state, { user }) => {
    return{...state, user}
  })
);