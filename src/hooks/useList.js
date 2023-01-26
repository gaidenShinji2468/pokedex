import {
    useState,
    useEffect
} from "react";

export default function useList(sequence = [], $range = 5)
{
    const [list, setList] = useState(sequence);
    const [pointer, setPointer] = useState(0);
    const [range, setRange] = useState({start: 0, end: $range});
    const [item, setItem] = useState(null);
    const [chunk, setChunk] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if(list.length)
	{
	    handleSetItem();
	    handleSetChunk(); 
	}
    }, [list, range]);

    useEffect(() => {
        if(selected)
	{
            setPointer(selected.pos);
	}
    }, [selected]);

    useEffect(() => {
        handleSetItem();
	if(chunk.length && pointer === chunk[chunk.length - 1].pos + 1)
	{
            nextChunk();
	}else if(chunk.length && pointer === chunk[0].pos - 1)
	{
            prevChunk();
	}else{
            handleSetChunk();
	}
    }, [pointer]); 

    const handleSetChunk = () => {
        setChunk(list.slice(range.start, range.end).map(item => {
            if(item === list[pointer])
	    {
	        return {
		    isTarget: true,
		    value: item,
		    pos: list.indexOf(item)
	        };
	    }
	    
	    return {
                isTarget: false,
		value: item,
		pos: list.indexOf(item)
	    };
	}));
    }

    const handleSetItem = () => {
        setItem(list[pointer]);
    } 

    const next = () => {
        if(pointer < list.length - 1)
	    setPointer(pointer + 1);
    }

    const prev = () => {
        if(pointer > 0)
	    setPointer(pointer - 1);
    }

    const nextChunk = () => {
	if(range.end < list.length)
	    setRange({
                start: range.start + 1,
		end: range.end + 1
	    });
    }

    const prevChunk = () => {
        if(range.start > 0)
	    setRange({
                start: range.start - 1,
		end: range.end - 1
	    });
    }

    const head = () => {
        setPointer(0);
	setRange({start: 0, end: $range});
    }

    const tail = () => {
        setPointer(list.length - 1);
	setRange({
            start: list.length - range.end,
	    end: list.length
	});
    }

    return {
	item,
	chunk,
	list,
	init: sequence => setList(sequence),
        add: null,
	next,
	prev,
	pointer,
	selected: selected => setSelected(selected),
	head,
	tail,
	nextChunk,
	prevChunk
    };
}
