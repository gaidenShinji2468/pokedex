import {configureStore} from "@reduxjs/toolkit";
import userStored from "/src/store/slices/userStored.slice";
import currentUser from "/src/store/slices/currentUser.slice";

export default configureStore({
    reducer: {
        userStored,
	currentUser
    }
});
