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

  async GetInfluencerUser(id) {
    try {
      return await axios.get(`${api_url}/influencer/user/${id}`);
    } catch (error) {
      return error.response;
    }
  }

  async RefreshToken(token) {
    console.log({
      url: `${api_url}/auth/refresh-token`,
      headers: {
        "Content-Type": "application/json",
        refresh: token,
      },
    });
    try {
      return await axios.post(
        `${api_url}/auth/refresh-token`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            refresh: token,
          },
        }
      );
    } catch (error) {
      return error.response;
    }
  }
}
