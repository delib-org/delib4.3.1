import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Council } from "../../model/councilModelC";
import { User } from "../../model/userModelC";

export const setCouncilAsync = createAsyncThunk(
  "councils/setCouncil",
  async ({council, user}: {council:Council, user:User}, {rejectWithValue}) => {
    const response = await setCouncilToDB(council, user);
    // The value we return becomes the `fulfilled` action payload
    if(response === false) rejectWithValue('error!')
    return response;
  }
);

async function setCouncilToDB(council: Council, user:User): Promise<Council | false> {
  try {
    const { data } = await axios.post("/api/councils/set-council", {council, creator: user});
    if (!data) throw new Error("No data");
   

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
