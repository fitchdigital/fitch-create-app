import axios from 'axios';

const baseURL = process.env.API || 'http://localhost:1234';

const fetchData = async query => {
    const url = `${baseURL}/${query}`;
    return await axios.get(url);
};

export { fetchData };
