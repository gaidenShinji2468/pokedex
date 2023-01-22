import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";
import {Link} from "react-router-dom";
import PokemonThumbnail from "./PokemonThumbnail";

function Pokemons()
{
    const [pokemons, setPokemons] = useState([]);
    const [length, setLength] = useState(null);
    const [counter, setCounter] = useState(0);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20); // con esto puedo elegir la max de resultados

    useEffect(() => {
       	getData("https://pokeapi.co/api/v2/pokemon", res => {
            getPokemons(res.results);
	    setLength(parseInt(res.count/limit) + Number(res.count%limit !== 0)); // añade el cociente y si el residuo es mayor a cero, añade una unidad mas
	}, console.log);
    }, []);

    useEffect(() => {
        getData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`, res => getPokemons(res.results), console.log);	
    }, [offset, limit]);

    const getPokemons = pokemons => {
        setPokemons(pokemons);
    }

    const handlePrev = () => {
	if(counter > 0)
	{
	    setOffset(offset - limit);
	    setCounter(counter - 1);
	}
    }

    const handleNext = () => {
	if(counter - 1 < length)
	{
            setOffset(offset + limit);
	    setCounter(counter + 1);
	}
    }

    return (
	<div>
            <ul>
	        {
                    pokemons?.map((pokemon, index) => {
			const id = pokemon.url.split("/")[6];
                        return (
                            <li key={index}>
			        <Link to={`/pokedex/${id}`}>
                                    <PokemonThumbnail
				        url={pokemon.url}
				    />
			        </Link>
			    </li>
		        );
		    })
	        }
	    </ul>
	    <div>
	        <button
	            onClick={handlePrev}
	            disabled={!Boolean(counter)}
	        >Prev</button>
	        <button
	            onClick={handleNext}
	            disabled={counter + 1 === length}
	        >Next</button>
	    </div>
	</div>
    );
}

export default Pokemons;
