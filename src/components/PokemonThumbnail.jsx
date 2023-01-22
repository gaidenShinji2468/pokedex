import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";

function PokemonThumbnail({url})
{
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        getData(url, setPokemon, console.log);
    }, [url])

    return (
	<>{pokemon ? <figure>
	    <figcaption>{pokemon.name}</figcaption>
	    <ul>
                <li>
	            <ul>
	                {
                            pokemon?.types.map((type, index) => {
                                return (
                                    <li key={index}>
				        <strong>{type.type.name}</strong>
			            </li>
			        );
		            })
		        }
	            </ul>
	        </li>
	        {
                    pokemon?.stats.map((stat, index) => {
                        return (
                            <li key={index}>
				<b>{stat.stat.name}</b><span>{stat.base_stat}</span>
			    </li>
			);
		    })
		}
	        <li>
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
