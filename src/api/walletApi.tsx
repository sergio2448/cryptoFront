import axios from "axios";

const baseURL = "http://localhost:3000";

const walletApi = axios.create({ baseURL });

export default walletApi;
