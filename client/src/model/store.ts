import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import councilsSlice from '../features/councils/councilsSlice';
import messagesSlice from '../features/council/chat/messagesSlice';

export const store = configureStore({
  reducer: {
    user:userReducer,
    councils:councilsSlice,
    messages:messagesSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
