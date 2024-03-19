import axios from "axios";

const client = axios.create({ 
  baseURL: "https://harborserver-production.up.railway.app/api",
});
export default client;