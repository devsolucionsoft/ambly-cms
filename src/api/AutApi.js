import axios from "axios";
import { api_url, headers} from "./config";

export class AuthApi {
  async UserLogin(data) {
    try {
      return await axios.post(`${api_url}/auth/login`, data);
    } catch (error) {
      return error.response;
    }
  }
}
