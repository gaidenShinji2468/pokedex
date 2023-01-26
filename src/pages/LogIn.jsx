import {
    Link,
    useNavigate
} from "react-router-dom";
import {
    useState,
    useEffect
} from "react";
import {
    useSelector,
    useDispatch
} from "react-redux";
import {setCurrentUser} from "/src/store/slices/currentUser.slice";

function LogIn()
{
    const [userName, setUserName] = useState("");
    const [error, setError] = useState(null);
    const userStored = useSelector(state => state.userStored);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    useEffect(() => {
        setTimeout(() => {
            setError(null);
	}, 4000);
    }, [error]);

    const handleSubmit = event => {
        event.preventDefault();
	if(userName === userStored)
	{
	    sessionStorage.setItem("currentUser", userName);
	    dispatch(setCurrentUser(userName));
	    navigate("/pokedex"); 
	}else{
            setError((
                <span
		    style={{color: "red"}}
		>This name is incorrect!... Are you sure, that you be a master?</span>
	    ));
	}
    }

    const handleChange = event => {
        const value = event.target.value;
	setUserName(value);
    }

    return (
	<div>
            <form onSubmit={handleSubmit}>
	        <fieldset>
	            <label htmlFor="userName">Pokemon's Master</label><input
	                id="userName"
	                value={userName}
	                onChange={handleChange}
	                placeholder="Into a name here, pokemon's master"
	            /><button type="submit">Submit</button>
	        </fieldset>
	    </form>
	    {error}
	    <div>
	        <p>Are you a new master?... Register <Link to="/register"><b>here</b></Link> my friend</p>
	    </div>
	</div>
    );
}

export default LogIn;
