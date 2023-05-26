import axios from "axios";
import { api_url, headers } from "./config";

export class AuthApi {
  async UserLogin(data) {
    try {
      return await axios.post(`${api_url}/auth/login`, data);
    } catch (error) {
      return error.response;
    }
  }

  async GetUser(id) {
    try {
      return await axios.get(`${api_url}/users/${id}`);
    } catch (error) {
      return error.response;
    }
  }
}
