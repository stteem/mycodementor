import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserData } from './user.model';


const selectUser = (state: UserData) => state;


export const selectUserData = createSelector(
    selectUser,
    (user: UserData) => {
        return {user};
    }
);
