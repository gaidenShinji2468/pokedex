import {
    Link,
    useNavigate
} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {registerUser} from "/src/store/slices/userStored.slice";

function RegisterUser()
{
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const dispatch = useDispatch();
    
    const handleSubmit = event => {
        event.preventDefault();
	sessionStorage.setItem("userStored", userName);
	dispatch(registerUser(userName));
	navigate("/");
    }

    const handleChange = event => {
        const value = event.target.value;
	setUserName(value);
    }

    return (
        <div>
	    <form onSubmit={handleSubmit}>
	        <fieldset>
	            <label htmlFor="userName">Into your Name</label><input
	                id="userName"
	                value={userName}
	                onChange={handleChange}
	                placeholder="Into a name here and let start your adventure"
	            /><button type="submit">Register</button>
	        </fieldset>
	    </form>
	    <div>
	        <p>Are you a master?... Log in <Link to="/"><b>here</b></Link> my friend</p>
	    </div>
	</div>
    );
}

export default RegisterUser;
