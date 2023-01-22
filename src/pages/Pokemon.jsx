import {
    useParams,
    useNavigate
} from "react-router-dom";
import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";

function Pokemon()
{
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getData(`https://pokeapi.co/api/v2/pokemon/${id}/`, setPokemon, console.log);    
    }, []);

    return (
	<div>
	    <p>{pokemon.name}</p>
            <span
	        style={{cursor: "pointer"}}
	        onClick={() => navigate(-1)}
	    >Go back</span>
	</div>
    );
}

export default Pokemon;
