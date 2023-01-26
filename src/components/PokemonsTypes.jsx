import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";
import {Link} from "react-router-dom";
import Pokemons from "./Pokemons";
import PokemonThumbnail from "./PokemonThumbnail";
import Pagination from "./Pagination";
import "/src/assets/styles/PokemonsTypes.css";

function splitData(data, limit)
{
    let splitted = [];
    let offset = limit;

    for(let i = 0, j = 0; i < parseInt(data.length/limit); i++, j += limit)
    {
	splitted.push(data.slice(j, offset));
	offset += limit;
    }
    
    if(data.length%limit !== 0)
	splitted.push(data.slice(offset - limit, data.length));
    
    return splitted;
}

function PokemonsTypes({sendPokemon})
{
    const [types, setTypes] = useState([]);
    const [type, setType] = useState("All pokemons");
    const [pokemons, setPokemons] = useState([]);
    const [limit, setLimit] = useState(12);
    const [currentPos, setCurrentPos] = useState(0);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        getData("https://pokeapi.co/api/v2/type", res => setTypes(res.results), console.log);
    }, []);

    useEffect(() => {
        type !== "All pokemons" && getData(`https://pokeapi.co/api/v2/type/${type}`, res => handleSplit(res.pokemon), console.log);
    }, [type, limit])

    useEffect(() => {
        if(pokemons?.length)
	{
	    preparePositions();
	}
    }, [pokemons])

    const preparePositions = () => {
        const positionsCpy = [];

	for(let pos of pokemons.keys())
	    positionsCpy.push(pos);

	setPositions(positionsCpy);
    } 

    const handleSplit = pokemons => {
        setPokemons(splitData(pokemons, limit));
    }

    const handleChange = event => {
        setLimit(parseInt(event.target.value));
    }

    return (
	<div>
            <select onChange={event => setType(event.target.value)}>
                <option>All pokemons</option>
	        {
                    types?.map((type, index) => {
                        return (
                            <option
			        key={index}
			    >{type.name}</option>
		        );
		    })
	        }
	    </select>
	    {   
                type === "All pokemons" ? <Pokemons sendPokemon={sendPokemon}/> :
		<>
	        <fieldset>
                    <label htmlFor="limit">Limit to show</label><select
                        id="limit"
	                onChange={handleChange}
		        defaultValue={12}
	            >
	                <option>4</option>
	                <option>8</option>
	                <option>12</option>
	                <option>16</option>
	                <option>20</option>
	            </select>
	        </fieldset>
		<ul id="pokemons-types">
                    {
                        pokemons[currentPos]?.map((pokemon, index) => {
			   const id = pokemon.pokemon.url.split("/")[6]; 
			   return (
                               <li key={index}>
				   <PokemonThumbnail
				       url={pokemon.pokemon.url}
				       sendPokemon={sendPokemon}
				   />
			       </li>
			    );
		        })
		    }
	        </ul>
		<Pagination
                    sendItem={currentPos => setCurrentPos(currentPos)}
		    collection={positions}
		/>
	        </>
	    }
	</div>
    );
}

export default PokemonsTypes;
