import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import RegisterUser from "./pages/RegisterUser";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import PublicRoutes from "./pages/PublicRoutes";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";

function Router()
{
    return ( 
	<BrowserRouter>
	    <Routes>
	        <Route element={<PublicRoutes/>}>
	            <Route
	                path="/"
	                element={<LogIn/>}
	            />
	            <Route
                        path="/register"
	                element={<RegisterUser/>}
	            />
	        </Route>
	        <Route element={<ProtectedRoutes/>}>
	            <Route
	                path="/pokedex"
	                element={<Pokedex/>}
	            />
	            <Route
                        path="/pokedex/:id"
	                element={<Pokemon/>}
	            />
	            <Route
                        path="/logout"
	                element={<LogOut/>}
	            />
	        </Route>
	    </Routes>
        </BrowserRouter>
    );
}

export default Router;
