import {
    useState,
    useEffect
} from "react";
import useList from "/src/hooks/useList";
import "/src/assets/styles/Pagination.css";
import {
    ChevronLeft,
    ChevronDoubleLeft,
    ChevronRight,
    ChevronDoubleRight
} from "react-bootstrap-icons";


function Pagination({
    sendItem,
    collection,
    range
})
{
    const {
	init,
	item,
	chunk,
	selected,
	head,
	prev,
	next,
	tail,
	pointer
    } = useList(collection, range || 5);

    useEffect(() => {
        if(collection.length > 0)
	{
            init(collection);
	}
    }, [collection]);

    useEffect(() => {
        sendItem(item);
    }, [item]);

    const handleClick = event => {
        const value = JSON.parse(event.target.value);
	selected(value);
    }

    const handleMouseOver = event => {
        console.log(event.target)//DEBUG
    }

    return (
        <ul id="pag-ctrls">
	    <li>
	        <button
	            className="pag-ctrls-button"
	            onClick={() => head()}
	            disabled={!Boolean(pointer)}
	        ><ChevronDoubleLeft/></button>
	    </li>
	    <li>
	        <button
	            className="pag-ctrls-button"
	            onClick={() => prev()}
	            disabled={!Boolean(pointer)}
	        ><ChevronLeft/></button>
	    </li>
	    {
                chunk.map((page, index) => {
                    return (
                        <li key={index}>
			    <button
			        className="pag-ctrls-button"
			        onClick={handleClick}
			        value={JSON.stringify(page)}
			        style={page.isTarget ? 
				    {
				        backgroundColor: "#f83d37",
				        color: "white"
				    } : {
				        backgroundColor: "transparent",
					color: "inherit"
				    }}
			    >{page.pos + 1}</button>
			</li>
		    );
		})
	    }
	    <li>
	        <button
	            className="pag-ctrls-button"
	            onClick={() => next()}
	            disabled={pointer === collection.length - 1}
	        ><ChevronRight/></button>
	    </li>
	    <li>
	        <button
                    className="pag-ctrls-button"
	            onClick={() => tail()}
	            disabled={pointer === collection.length - 1}
	        ><ChevronDoubleRight/></button>
	    </li>
	</ul>
    );
}

export default Pagination;
