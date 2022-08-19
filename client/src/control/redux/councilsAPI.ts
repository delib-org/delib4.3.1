import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Council } from "../../model/councilModelC";

export const setCouncilAsync = createAsyncThunk(
  "councils/setCouncil",
  async (council: Council, {rejectWithValue}) => {
    const response = await setCouncilToDB(council);
    // The value we return becomes the `fulfilled` action payload
    if(response === false) rejectWithValue('error!')
    return response;
  }
);

async function setCouncilToDB(council: Council): Promise<Council | false> {
  try {
    const { data } = await axios.post("/api/councils/set-council", {council});
    if (!data) throw new Error("No data");
   

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
