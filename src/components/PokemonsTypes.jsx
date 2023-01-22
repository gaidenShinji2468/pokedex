import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";
import {Link} from "react-router-dom";
import Pokemons from "./Pokemons";
import PokemonThumbnail from "./PokemonThumbnail";

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

function PokemonsTypes()
{
    const [types, setTypes] = useState([]);
    const [type, setType] = useState("All pokemons");
    const [pokemons, setPokemons] = useState([]);
    const [currentPos, setCurrentPos] = useState(0);

    useEffect(() => {
        getData("https://pokeapi.co/api/v2/type", res => setTypes(res.results), console.log);
    }, []);

    useEffect(() => {
        type !== "All pokemons" && getData(`https://pokeapi.co/api/v2/type/${type}`, res => handleSplit(res.pokemon), console.log);
    }, [type])

    useEffect(() => {
        pokemons?.length && setCurrentPos(0); 
    }, [pokemons])

    const handleSplit = pokemons => {
        setPokemons(splitData(pokemons, 20));
    }

    const handlePrev = () => {
        if(currentPos > 0) setCurrentPos(currentPos - 1);
    }

    const handleNext = () => {
        if(currentPos < pokemons.length) setCurrentPos(currentPos + 1);
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
                type === "All pokemons" ? <Pokemons/> :
		<>
		<ul>
                    {
                        pokemons[currentPos]?.map((pokemon, index) => {
			   const id = pokemon.pokemon.url.split("/")[6]; 
			   return (
                                <li key={index}>
				    <Link to={`/pokedex/${id}`}>
				        <PokemonThumbnail url={pokemon.pokemon.url}/>
				    </Link>
			        </li>
			    );
		        })
		    }
	        </ul>
		<div>
		    <button
                        onClick={handlePrev}
		        disabled={!Boolean(currentPos)}
		    >Prev</button>
		    <button
                        onClick={handleNext}
		        disabled={currentPos === pokemons.length - 1}
		    >Next</button>
		</div>
		</>
	    }
	</div>
    );
}

export default PokemonsTypes;
