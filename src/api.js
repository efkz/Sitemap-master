import axios from "axios";
export const baseUrl = "https://iclog.kz";
axios.defaults.baseURL = baseUrl;

const ax = axios.create();
const token = localStorage.getItem('accessToken')


ax.interceptors.request.use(
    async (config) => {
        config.headers = {
            ContentType: 'multipart/form-data; boundary=<calculated when request is sent>',
            Authorization: `Bearer ${token}`
        }
        return config;
    },
);

ax.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            window.location.href = '/login'
        }
        return Promise.reject(error);
    }
);

export default ax;