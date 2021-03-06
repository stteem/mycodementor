import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserData } from './user.model';


const selectUser = (state: AppState) => state.appstate.user.user;


export const selectUserData = createSelector(
    selectUser,
    (user: UserData) => {
        return {user};
    }
);
