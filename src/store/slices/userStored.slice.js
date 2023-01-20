import {createSlice} from "@reduxjs/toolkit";

export const userStored = createSlice({
    name: "userStored",
    initialState: sessionStorage.getItem("userStored"),
    reducers: {
       registerUser: (state, action) => {
           return action.payload;
       }
    }
});

export const {
    registerUser
} = userStored.actions;

export default userStored.reducer;
