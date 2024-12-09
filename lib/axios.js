import axios from 'axios';
import localStorage from 'redux-persist/lib/storage';
import Cookies from 'js-cookie';

axios.defaults.baseURL = "http://localhost:8000/";
const url  = axios.defaults.baseURL
const token = Cookies.get('authToken');

const axioss = axios.create({
    'baseURL': url,
    'headers': { 'X-Requested-With': 'XMLHttpRequest',"content-type": 'multipart/form-data' ,"auth-token":token   },
    'withCredentials': true,
})

export default axioss