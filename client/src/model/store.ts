import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../control/redux/user/userSlice';
import councilsSlice from '../control/redux/councils/councilsSlice';
import messagesSlice from '../control/redux/councils/messagesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
