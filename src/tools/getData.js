import axios from "axios";

export default (url, resolve, reject) => {
    return axios
	.get(url)
	.then(res => resolve(res?.data))
	.catch(err => resolve(err));
}
