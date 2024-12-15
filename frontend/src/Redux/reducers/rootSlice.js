import { createSlice } from "@reduxjs/toolkit";

export const rootReducer = createSlice({
  name: "root",
  initialState: {
    loading: true,
    userInfo: {},
    type:"",
  },
  reducers: {
    setLoading: (state, action) => {
        
      state.loading = action.payload;
    },
    setUserInfo: (state, action) => {
    console.log('payload');
    
      state.userInfo = action.payload;

    },
    setType: (state,action) => {
      state.type = action.payload;
    }
  },
});

export const { setLoading, setUserInfo, setType } = rootReducer.actions;
export default rootReducer.reducer;