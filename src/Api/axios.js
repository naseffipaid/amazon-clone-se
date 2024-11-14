import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://127.0.0.1:5001/ae-clone-6be8c/us-central1/api"
});

export {axiosInstance};

