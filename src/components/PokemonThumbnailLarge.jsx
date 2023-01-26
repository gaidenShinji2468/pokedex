import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";
import {Link} from "react-router-dom";

function PokemonThumbnailLarge({pokemon})
{
    return (
	<Link id="pkm-thumbnail-large" to={`/pokedex/${pokemon.id}`}>
            <aside>
	        <figure>
	            <img
                        src={pokemon.sprites.front_default}
	                alt={`This is a ${pokemon.name} image`}
	            />
	            <figcaption>{pokemon.name}</figcaption>
	        </figure>
	        <ul>
	            <li>
                        <ul>
	                    {
                                pokemon.stats.map((stat, index) => {
                                    return (
                                        <li key={index}>
				            <b>{stat.stat.name}</b><span>{stat.base_stat}</span>
				        </li>
			            );
			        })
			    }
		        </ul>
	            </li>
	            <li>
	                {
                            pokemon.types.map((type, index) => {
                                return (
                                    <strong key={index}>{type.type.name}</strong>
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
