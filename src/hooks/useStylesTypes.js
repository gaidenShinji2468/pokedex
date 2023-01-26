import {
    useEffect,
    useState
}from "react";
import colorsTypes from "/src/data/colorsTypes";

function useStylesTypes(pokemon, size = "md")
{
    const [styles, setStyles] = useState(null);
    const [colorA, setColorA] = useState("");
    const [colorB, setColorB] = useState("");
    const deg = size === "md" ? "135deg" : "180deg";

    const getColorForType = () => {
        return pokemon.types.map(type => colorsTypes[type.type.name]);
    }

    useEffect(() => {
	if(pokemon)
	{
	    const [typeA, typeB] = getColorForType();
	    let stylesCpy;

	    setColorA(typeA);
	    setColorB(typeB);
            if(typeB)
	    {
                stylesCpy = {
                    background: `linear-gradient(${deg}, ${typeA} 50%, ${typeB} 50%)`,
		};
	    }else{
                stylesCpy = {
                    backgroundColor: typeA
		};
	    }
	    setStyles(stylesCpy);
	}
    }, [pokemon]);

    return {
	styles,
	colorA,
	colorB
    };
}

export function groundElectric(pokemon)
{
    const [isType, setIsType] = useState(false);

    useEffect(() => {
	if(pokemon)
	    setIsType(pokemon.types.some(type => ["ground", "electric"].includes(type.type.name))); 
    }, [pokemon]);

    return isType;
}

export default useStylesTypes;
