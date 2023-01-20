import {useDispatch} from "react-redux";
import {registerUser} from "/src/store/slices/userStored.slice";

function LogOut()
{
    const dispatch = useDispatch();

    sessionStorage.clear();
    dispatch(registerUser(null));
}

export default LogOut;
