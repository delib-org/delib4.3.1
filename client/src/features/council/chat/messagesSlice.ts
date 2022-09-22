import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../../model/store";

import {  Council } from "../councilModelC";
import { uid, updateArrayBy_ID } from "../../../control/helpers";



import { Message } from "./messageModel";
import { User } from "../../user/userModelC";
export interface Messages {
  messages: Message[];
  status: "idle" | "loading" | "failed";
}

const initialState: Messages = {
  messages: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{
        message: string;
        councilId: string;
        creator: User;
      }>
    ) => {
      try {
        const { creator, councilId, message } = action.payload;
        const newMessage: Message = {
          message,
          time: new Date().getTime(),
          creator,
          councilId,
          isTemp: true,
          _id: uid(),
        };
        console.dir(newMessage)
        state.messages = updateArrayBy_ID(state.messages, newMessage);
        console.log(state.messages)
      } catch (error) {
        console.error(error);
      }
    },
  }
  
});

export const { addMessage } = messagesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const messages = (state: RootState) => state.messages.messages;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default messagesSlice.reducer;
