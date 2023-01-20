import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Navbar()
{
    const currentUser = useSelector(state => state.currentUser);

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/pokedex">Pokedex</Link></li>
	            <li><p>{currentUser}</p></li>
	            <li><Link to="/logout">Log Out</Link></li>
	        </ul>
	    </nav>
	</header>
    );
}

export default Navbar;
