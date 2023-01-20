import {
    Outlet,
    Navigate
} from "react-router-dom";
import {useSelector} from "react-redux";
import Navbar from "/src/components/Navbar";
import Footer from "/src/components/Footer";

function ProtectedRoutes()
{
    const currentUser = useSelector(state => state.currentUser);
    const userStored = useSelector(state => state.userStored);

    return (
	<>
	    {
		(currentUser === userStored) && userStored ?
		    <>
	                <Navbar/>
	                <Outlet/>
	                <Footer/>
		    </>
	        : <Navigate to="/"/>
	    }
	</>
    );
}

export default ProtectedRoutes;
