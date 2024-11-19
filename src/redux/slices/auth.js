import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
  const data = await axios.post('/auth/login', params);
  return data.data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuth', async (params) => {
  const data = await axios.get('/auth/me');
  return data.data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const data = await axios.post('/auth/register', params);
  return data.data;
});

const initialState = {
  data: null,
  status: 'loading'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = 'loaded';
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = 'loaded';
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = 'loaded';
    }
  }
});

export const isAuth = state => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;