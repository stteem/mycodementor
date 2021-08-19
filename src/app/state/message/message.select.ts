import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


const selectMessageState = (state: AppState) => state.appstate.message.message;


export const selectMessage = createSelector(
    selectMessageState,
    (message: string) => {
        return {message};
    }
);
