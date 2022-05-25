import axios from "axios";

const baseURL = "https://guarded-cliffs-22069.herokuapp.com";

const walletApi = axios.create({ baseURL });

export default walletApi;
