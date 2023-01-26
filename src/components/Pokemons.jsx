import {
    useState,
    useEffect
} from "react";
import getData from "/src/tools/getData";
import {Link} from "react-router-dom";
import PokemonThumbnail from "./PokemonThumbnail";
import Pagination from "./Pagination";
import "/src/assets/styles/Pokemons.css";

function Pokemons({sendPokemon})
{
    const [pokemons, setPokemons] = useState([]);
    const [length, setLength] = useState(null);
    const [counter, setCounter] = useState(0);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12); // con esto puedo elegir la max de resultados
    const [count, setCount] = useState(0);
    const [collection, setCollection] = useState([]);

    useEffect(() => {
       	getData("https://pokeapi.co/api/v2/pokemon", res => {
            getPokemons(res.results);
	    setLength(parseInt(res.count/limit) + Number(res.count%limit !== 0)); // añade el cociente y si el residuo es mayor a cero, añade una unidad mas
	    prepareCollection(res.count);
	    setCount(res.count);
	}, console.log);
    }, []);

    useEffect(() => prepareCollection(count), [limit]);

    useEffect(() => {
        getData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`, res => getPokemons(res.results), console.log);	
    }, [offset, limit]);

    const getPokemons = pokemons => {
        setPokemons(pokemons);
    }

    const prepareCollection = count => {
        let collectionCpy = [];

	for(let offset = 0; offset < count; offset += limit)
	    collectionCpy.push(offset);

	setCollection(collectionCpy);
    }

    const handleChange = event => {
        setLimit(parseInt(event.target.value));
    }
 
    return (
	<div>
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
            <ul id="pokemons-list">
	        {
                    pokemons?.map((pokemon, index) => {
			const id = pokemon.url.split("/")[6];
                        return (
                            <li key={index}>
                                <PokemonThumbnail
				    url={pokemon.url}
				    sendPokemon={sendPokemon}
				/>
			    </li>
		        );
		    })
	        }
	    </ul>
	    <Pagination
	        sendItem={offset => setOffset(offset)}
	        collection={collection}
	        range={6}
	    />
	</div>
    );
}

export default Pokemons;
