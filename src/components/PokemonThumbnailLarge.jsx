import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";
import {Link} from "react-router-dom";
import useStylesTypes, {groundElectric} from "/src/hooks/useStylesTypes";
import "/src/assets/styles/PokemonThumbnailLarge.css";

function PokemonThumbnailLarge({pokemon})
{
    const {styles, colorA, colorB} = useStylesTypes(pokemon, "lg");
    const isType = groundElectric(pokemon);

    return (
	<Link to={`/pokedex/${pokemon.id}`}>
            <aside id="pokemon-thumbnail-large" style={styles}>
	        <figure>
	            <img
                        src={pokemon.sprites.front_default}
	                alt={`This is a ${pokemon.name} image`}
	            />
	            <figcaption
                        style={isType ? {color: "black"} : {color: "white"}}
	            >{pokemon.name}</figcaption>
	        </figure>
	        <ul>
	            <li>
                        <ul id="pokemon-thumbnail-stats">
	                    {
                                pokemon.stats.map((stat, index) => {
                                    return (
                                        <li key={index}
                                            style={isType ? {color: "black"} : {color: "white"}}
					>
				            <b
                                                style={{color: "inherit"}}
					    >{stat.stat.name}</b><span
                                                style={{color: "inherit"}}
					    >{stat.base_stat}</span>
				        </li>
			            );
			        })
			    }
		        </ul>
	            </li>
	            <li id="types">
	                {
                            pokemon.types.map((type, index) => {
                                return (
                                    <strong key={index}
					style={isType ? {
					    color: [colorA, colorB][index],
					    backgroundColor: "black",
					    borderLeft: `5px solid ${[colorA, colorB][index]}`
					} : {
					    color: [colorA, colorB][index],
					    backgroundColor: "white",
					    borderLeft: `5px solid ${[colorA, colorB][index]}`
					}}
				    >{type.type.name}</strong>
			        );
			    })
		        }
	            </li>
	        </ul>
	    </aside>
	</Link>
    );
}

export default PokemonThumbnailLarge;
