import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editUserApi } from "../api/user";

export const updateUserInfoAsync = createAsyncThunk(
  "user/updateUserInfoAsync",
  async (payload, { dispatch }) => {
    await editUserApi(payload.userId, payload.newInfo);
    dispatch(updateUserInfo(payload.newInfo));
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    changeLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
    clearUserInfo: (state, { payload }) => {
      state.userInfo = {};
    },
    updateUserInfo: (state, { payload }) => {
      for (let key in payload) {
        state.userInfo[key] = payload[key];
      }
    },
  },
});

export const {
  initUserInfo,
  changeLoginStatus,
  clearUserInfo,
  updateUserInfo,
} = userSlice.actions;

export default userSlice.reducer;
