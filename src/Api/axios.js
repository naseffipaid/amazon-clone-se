import axios from "axios";

const axiosInstance = axios.create({
    // local instance of firebase functions
    // baseURL:"http://127.0.0.1:5001/ae-clone-6be8c/us-central1/api"
    
    // deployed version of amazon-api-deploy on WebGL2RenderingContext.com
    baseURL:"https://amazon-api-deploy-naseff.onrender.com/"

});

export {axiosInstance};

