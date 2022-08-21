import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Council } from "../council/councilModelC";

export const setCouncilAsync = createAsyncThunk(
  "councils/setCouncil",
  async (council: Council, { rejectWithValue }) => {
    const response = await setCouncilToDB(council);

    // The value we return becomes the `fulfilled` action payload
    if (response === false) rejectWithValue("error!");
    return response;
  }
);

async function setCouncilToDB(council: Council): Promise<Council | false> {
  try {
    const { data } = await axios.post("/api/councils/set-council", { council });
    if (!data) throw new Error("No data");

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getCouncilAsync = createAsyncThunk(
  "councils/getCouncil",
  async (councilId: string, ThunkAPI) => {
    try {
      const { data, error }:{data:any, error:any} = await axios.get(
        `/api/councils/get-council?councilId=${councilId}`
      );
      if(error) throw error;

      console.log(data)
      if (!data) ThunkAPI.rejectWithValue("No data");
      const { council } = data;

      return council;
    } catch (error: any) {
      console.error(error)
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCouncilsAsync = createAsyncThunk(
  "councils/getCouncils",
  async (_, ThunkAPI) => {
    try {
      const { data, error }:{data:any, error:any} = await axios.get(
        `/api/councils/get-councils`
      );
      if(error) throw error;

      console.log(data)
      if (!data) ThunkAPI.rejectWithValue("No data");
      const { councils } = data;

      return councils;
    } catch (error: any) {
      console.error(error)
      ThunkAPI.rejectWithValue(error.message);
    }
  }
);