import {createSlice} from "@reduxjs/toolkit";

export const currentUser = createSlice({
    name: "currentUser",
    initialState: sessionStorage.getItem("currentUser"),
    reducers: {
        setCurrentUser: (state, action) => {
            return action.payload;
	}
    }
});

export const {
    setCurrentUser
} = currentUser.actions;

export default currentUser.reducer;
