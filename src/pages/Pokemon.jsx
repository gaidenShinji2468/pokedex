import {
    useParams,
    useNavigate
} from "react-router-dom";
import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";
import "/src/assets/styles/Pokemon.css";

function Pokemon()
{
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});
    const [selector, setSelector] = useState("stats");
    const navigate = useNavigate();

    useEffect(() => {
	getData(`https://pokeapi.co/api/v2/pokemon/${id}/`, setPokemon, console.log);    
    }, []);

    return (
	<div>
            <aside>
                <header>
	            <button
	                onClick={() => navigate(-1)}
	            >Go back</button>
	            <button
                        onClick={() => setSelector("stats")}
	            >Stats</button>
	            <button
	                onClick={() => setSelector("moves")}
	            >Moves</button>
	        </header>
	        {
		    selector === "stats" ?
	                <ul id="stats">
	                    {
                                pokemon?.stats?.map((stat, index) => {
                                    return (
                                        <li key={index}>
				            <b>{stat.stat.name}</b><span>{stat.base_stat}</span>
				        </li>
			            );
			        })
		            }
	                </ul> :
	                <ul id="moves">
	                    {
                                pokemon?.moves?.map((move, index) => {
                                    return (
                                        <li key={index}>
				            <span>{move.move.name}</span>
				        </li>
			            );
			        })
		            }
	                </ul>
		}
	        <footer>
	            {
                        pokemon?.types?.map((type, index) => {
                            return (
                                <strong key={index}>{type.type.name}</strong>
			    );
			})
		    }
	        </footer>
	    </aside>
	    <aside>
	        <header>
	            <h2>{pokemon.name}</h2>
	        </header>
	        <img 
	            src={pokemon?.sprites?.front_default}
	            alt={`This is a ${pokemon.name} image`}
	        />
	        <footer>
	            <p>Abilities</p>
	            <ul>
                        {
                            pokemon?.abilities?.map((ability, index) => {
                                return (
                                    <li key={index}>
					<strong>{ability.ability.name}</strong>
				    </li>
				);
			    })
			}
	            </ul>
	        </footer>
	    </aside>
	</div>
    );
}

export default Pokemon;
