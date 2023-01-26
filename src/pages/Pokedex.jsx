import {
    useState,
    useEffect
} from "react";
import {Link} from "react-router-dom";
import Pokemons from "/src/components/Pokemons";
import PokemonsTypes from "/src/components/PokemonsTypes";
import PokemonThumbnail from "/src/components/PokemonThumbnail";
import PokemonThumbnailLarge from "/src/components/PokemonThumbnailLarge";
import "/src/assets/styles/Pokedex.css";

function Pokedex()
{
    const [pkmName, setPkmName] = useState("");
    const [url, setUrl] = useState("");
    const [selector, setSelector] = useState("type");
    const [pokemon, setPokemon] = useState(null);

    const handleClick = event => {
        setSelector(event.target.id);
    }

    const handleSubmit = event => {
        event.preventDefault();
	pkmName ? setUrl(`https://pokeapi.co/api/v2/pokemon/${pkmName}`) : setUrl("");
    }

    const getId = url => url.split("/")[6];

    useEffect(() => {
        
    }, [pokemon]);

    return (
	<div>
	    <aside>
	        <header>
	            <nav>
                        <button
	                    id="type"
	                    onClick={handleClick}
	                >Type</button>
	                <button
	                    id="pokemon"
	                    onClick={handleClick}
	                >Pokemon</button>
	            </nav>
	            {
			selector === "pokemon" &&
	                    <form onSubmit={handleSubmit}>
	                        <button type="submit">Search</button>
	                        <input
	                            type="text"
	                            onChange={event => setPkmName(event.target.value.toLowerCase())}
	                            placeholder="Into a pokemon name"
		                />
	                    </form> 
		    }
	        </header>
	        {
                    selector === "type" ?
		        <PokemonsTypes
                            sendPokemon={pokemon => setPokemon(pokemon)}
			/> :
		        <>
	                    {
		                url ? <PokemonThumbnail
				          url={url}
				          sendPokemon={pokemon => setPokemon(pokemon)}
				      /> :
				    <Pokemons
				        sendPokemon={pokemon => setPokemon(pokemon)}
				    />
	                    }
		        </>
	        }
	    </aside>
	    {pokemon && <PokemonThumbnailLarge
	        url={url}
	        pokemon={pokemon}
	    />}
	</div>
    );
}

export default Pokedex;
