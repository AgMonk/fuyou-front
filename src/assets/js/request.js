import axios from "axios";
import {ElMessage} from "element-plus";

export const request = axios.create({
    baseURL:"/api/",
    timeout:5000,
    method:"post",

})

request.interceptors.response.use(response => {
    let data = response.data;
    if (data.code === 2000) {
        return data
    }
    ElMessage.warning(data.message);
    throw data.message;
}, (error) => Promise.reject(error));
