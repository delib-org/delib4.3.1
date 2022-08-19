import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../../model/userModelC";

export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async (_, {rejectWithValue}) => {
    const response = await getUserFromDB();
    // The value we return becomes the `fulfilled` action payload
    if(response === false) rejectWithValue('error!, no user')
    return response;
  }
);

async function getUserFromDB(): Promise<User | false> {
  try {
    const { data } = await axios.get("/api/users/get-user");
    if (!data) throw new Error("No data");
   

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}