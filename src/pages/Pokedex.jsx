import {
    useState,
    useEffect
} from "react";
import {Link} from "react-router-dom";
import Pokemons from "/src/components/Pokemons";
import PokemonsTypes from "/src/components/PokemonsTypes";
import PokemonThumbnail from "/src/components/PokemonThumbnail";

function Pokedex()
{
    const [pkmName, setPkmName] = useState("");
    const [url, setUrl] = useState("");
    const [selector, setSelector] = useState("type");

    const handleClick = event => {
        setSelector(event.target.id);
    }

    const handleSubmit = event => {
        event.preventDefault();
	pkmName ? setUrl(`https://pokeapi.co/api/v2/pokemon/${pkmName}`) : setUrl("");
    }

    const getId = url => url.split("/")[6];

    return (
	<div>
	    <div>
                <button
	            id="type"
	            onClick={handleClick}
	        >Type</button>
	        <button
	            id="pokemon"
	            onClick={handleClick}
	        >Pokemon</button>
	    </div>
	    {
                selector === "type" ?
		    <PokemonsTypes/> :
		    <>
	                <form onSubmit={handleSubmit}>
	                    <button type="submit">Search</button>
	                    <input
	                        type="text"
	                        onChange={event => setPkmName(event.target.value.toLowerCase())}
	                        placeholder="Into a pokemon name"
		            />
	                    <button
	                        type="reset"
	                        onClick={() => setPkmName("")}
	                    >Clean</button>
	                </form> 
	                {
		            url ?
		                <Link to={getId(url)}>
				    <PokemonThumbnail url={url}/>
				</Link> : <Pokemons/>
	                }
		    </>
	    }
	</div>
    );
}

export default Pokedex;
