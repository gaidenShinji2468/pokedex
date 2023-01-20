import {useDispatch} from "react-redux";
import {setCurrentUser} from "/src/store/slices/currentUser.slice";

function LogOut()
{
    const dispatch = useDispatch();

    sessionStorage.clear();
    dispatch(setCurrentUser(null));
}

export default LogOut;
