import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";
import useStylesTypes, {groundElectric} from "/src/hooks/useStylesTypes";
import "/src/assets/styles/PokemonThumbnail.css";

function PokemonThumbnail({url, sendPokemon})
{
    const [pokemon, setPokemon] = useState(null);
    const {styles} = useStylesTypes(pokemon);
    const isType = groundElectric(pokemon);

    useEffect(() => {
        getData(url, setPokemon, console.log);
    }, [url]);

    const handleClick = () => {
        sendPokemon(pokemon);
    }
 
    return (
	<>{pokemon ? <figure
		         id="pokemon-thumbnail"
		         onClick={handleClick}
		         style={styles}
		     >
	    <figcaption
                style={isType ? {color: "black"} : {color: "white"}}
	    >{pokemon.name}</figcaption>
	    <ul>
                <li>
	            <ul id="types-thumbnail">
	                {
                            pokemon?.types.map((type, index) => {
                                return (
                                    <li key={index}>
				        <strong
					    style={isType ? {color: "black"} : {color: "white"}}
					>{type.type.name}</strong>
			            </li>
			        );
		            })
		        }
	            </ul>
	        </li>
	       	<li id="pokemon-thumbnail-img">
	            <img
	                src={pokemon.sprites.front_default}
	                alt={`This is a ${pokemon.name} image`}
	            />
	        </li>
	    </ul>
	</figure> : <p>Loading...</p>}</>
    );
}

export default PokemonThumbnail;
