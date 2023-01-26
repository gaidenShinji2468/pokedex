export default class List {
    constructor(sequence = [], range = {})
    {
        this.$list = sequence;
	this.$pointer = 0;
	this.$range = range;
    }

    set init(sequence)
    {
        this.$list = sequence;
    }

    add(item)
    {
        this.$list.push(item);
    }

    get item()
    {
        this.$list[this.$pointer];
    }

    get next()
    {
	if(this.$pointer < 0) this.$pointer++;
        if(this.$pointer < this.length)
	    return this.$list[this.$pointer++];
    }

    get prev()
    {
	if(this.$pointer === this.length) this.$pointer--;
        if(this.$pointer >= 0)
	    return this.$list[this.$pointer--];
    }

    get pointer()
    {
        return this.$pointer;
    }

    reset()
    {
        this.$pointer = 0;
    }

    get head()
    {
        return this.$list[0];
    }

    get tail()
    {
        return this.$list[this.length - 1];
    }

    get list()
    {
        return this.$list;
    }

    get length()
    {
        return this.$list.length;
    }

    get chunk()
    {
	return this.$list.slice(this.$range.start, this.$range.end);
    }

    set range(range)
    {
        this.$range = range;
    }

    get nextChunk()
    {
	if(this.$range.end < this.length)
	{
            this.$range.start++;
	    this.$range.end++;
	    return this.chunk;
	}else{
            return null;
	}
    }

    get prevChunk()
    {
	if(this.$range.start > 0)
	{
            this.$range.start--;
	    this.$range.end--;
	    return this.chunk;
	}else{
            return null;
	}
    }
};

