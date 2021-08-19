import { createAction, props } from '@ngrx/store';


export const sendMessage = createAction(
    '[Dispatch Message] Message',
    props<{ message: string }>()
);