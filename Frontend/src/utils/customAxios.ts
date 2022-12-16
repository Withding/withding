import axios from "axios";

function customAxios() {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.defaults.maxBodyLength =Infinity;
    axios.defaults.maxContentLength = Infinity;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    return axios;
}

export default customAxios;