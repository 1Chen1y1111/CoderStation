import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTypeApi } from "../api/type";

export const getTypeList = createAsyncThunk("type/getTypeList", async () => {
  const response = await getTypeApi();
  return response.data;
});

const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [],
  },
  reducers: {},
  // 专门处理异步的reducer
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, { payload }) => {
      state.typeList = payload;
    });
  },
});

export default typeSlice.reducer;
