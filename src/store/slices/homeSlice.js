import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name : "home",
    initialState:{
        url:{}
    },
    reducers:{
        getApiConfig : (state, action)=>
        {
            state.url = action.payload;
        }
    }

})

export const {getApiConfig} = homeSlice.actions;
export default homeSlice.reducer;