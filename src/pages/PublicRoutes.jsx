import {
    Outlet,
    Navigate
} from "react-router-dom";
import {useSelector} from "react-redux";

function PublicRoutes()
{
    const currentUser = useSelector(state => state.currentUser);
    const userStored = useSelector(state => state.userStored);

    return (
        <>
	    {
                (currentUser === null && userStored === null) || (currentUser !== userStored) ?
		    <Outlet/> : <Navigate to="/pokedex"/>
	    }
	</>
    );
}

export default PublicRoutes;
