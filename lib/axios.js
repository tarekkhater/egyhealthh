import axios from 'axios';

//http://egyhealtth.onlinewebshop.net
axios.defaults.baseURL = "https://egyhealtth.onlinewebshop.net/api";
const url  = axios.defaults.baseURL

const axioss = axios.create({
    'baseURL': url,
    'headers': { 'X-Requested-With': 'XMLHttpRequest',"content-type": 'multipart/form-data' },
    'withCredentials': false,
})

export default axioss
