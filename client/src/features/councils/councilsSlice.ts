import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState} from "../../model/store";

import { CouncilSchema, Council } from "../council/councilModelC";
import { updateArrayBy_ID } from "../../control/helpers";

//api
import { getCouncilAsync, setCouncilAsync,getCouncilsAsync } from "./councilsAPI";

export interface CouncilsState {
  councils: Council[];
  status: "idle" | "loading" | "failed";
}

const initialState: CouncilsState = {
  councils: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const councilsSlice = createSlice({
  name: "councils",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addCouncil: (state, action: PayloadAction<Council>) => {
      try {
        const { error } = CouncilSchema.validate(action.payload);
        if (error) throw error;
        state.councils = updateArrayBy_ID(state.councils, action.payload);
      } catch (error) {
        console.error(error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCouncilAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setCouncilAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.councils = updateArrayBy_ID(state.councils, action.payload);
      })
      .addCase(setCouncilAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCouncilAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCouncilAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        if (action.payload)
          state.councils = updateArrayBy_ID(state.councils, action.payload);
      })
      .addCase(getCouncilAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCouncilsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCouncilsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        if (action.payload)
          state.councils =  action.payload;
      })
      .addCase(getCouncilsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});



export const { addCouncil } = councilsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const councilsSelect = (state: RootState) => state.councils.councils;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default councilsSlice.reducer;
