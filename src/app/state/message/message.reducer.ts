import { createReducer, on } from '@ngrx/store';
import { sendMessage } from './message.action';

interface MessageState {
    message: string
}

export const initialState: MessageState = {
  message: ''
};

export const messageReducer = createReducer(
  initialState,
  on(sendMessage, (state, { message }) => {
    return{...state, message}
  })
);