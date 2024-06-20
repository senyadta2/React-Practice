import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  file: [],
  status: "idel",
};

export const fetchFile = createAsyncThunk("fetchFile", async () => {
  const res = await axios.get("https://bca-file-backend.onrender.com/semester");
  return res.data;
});

export const postFile=createAsyncThunk("postFile",async(value,{dispatch})=>{
    const res = await axios.post("https://bca-file-backend.onrender.com/semester",value,{
        headers:{
            Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZGFyc2giLCJpYXQiOjE3MTcyMTc5NzcsImV4cCI6MTcxNzMwNDM3N30.Q5wh2X0rFkpDsvtqGByTbhJs5YuVXIS5S3lc_5ui8Ac33jbOwLzsdlORw-VAX6om" 
        }
    })
    dispatch(fetchFile())
    return res.data
})



const fileSlice = createSlice({
  name: "file",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFile.fulfilled, (state, action) => {
        state.file = action.payload;
        state.status = "success";
      });
  },
});

export default fileSlice.reducer;
