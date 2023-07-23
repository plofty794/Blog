import axios from "axios";

export const axiosRoute = axios.create({
    baseURL: "http://localhost:3030",
    withCredentials: true,
});
