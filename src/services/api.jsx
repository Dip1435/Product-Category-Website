import axios from "axios";

const api = axios.create({
  baseURL: "https://testapi.demoserver.biz/api",
});

export default api;
