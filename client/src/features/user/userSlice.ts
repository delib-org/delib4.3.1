import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSchema } from "./userModelC";
import { getUserAsync } from "./usersAPI";

export interface UserState {
  user: User | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  user: null,
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      try {
        if (action.payload) {
          const { error } = UserSchema.validate(action.payload);
          if (error) throw error;
          state.user = action.payload;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if(action.payload && action.payload.uid){
          state.user = action.payload;
        }
        
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default userSlice.reducer;
