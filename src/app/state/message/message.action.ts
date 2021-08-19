import { createAction, props } from '@ngrx/store';


export const sendMessage = createAction(
    '[Send Message] Message',
    props<{ message: string }>()
);

export const clear_Message = createAction('[Clear Message] Message');