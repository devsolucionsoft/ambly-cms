import axios from "axios";
import { api_url, headers} from "./config";

export class AuthApi {
  async UserLogin(data) {
    try {
      return await axios.post(`${api_url}/auth/login`, data, config);
    } catch (error) {
      return error.response;
    }
  }
}
