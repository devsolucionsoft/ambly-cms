import axios from "axios";
import { api_url, headers } from "./config";

export class SplashApi {
  constructor() {
    this.token_session = JSON.parse(localStorage.getItem("token_session"));
  }

  async GetSplash() {
    try {
      return await axios.get(`${api_url}/splash`);
    } catch (error) {
      return error.response;
    }
  }

  async CreateSplash(inputs) {
    const data = {
      title: inputs.name,
      image: inputs.image,
      description: inputs.description,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/splash`,
        data: data,
        headers: {
          "Content-Type": "application/json",
          auth: this.token_session.token,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async EditeSplash(data, id) {
    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/splash/${id}`,
        data: data,
        headers: {
          "Content-Type": "application/json",
          auth: this.token_session.token,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async deleteSplash(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/splash/${id}`,
        headers: {
          "Content-Type": "application/json",
          auth: this.token_session.token,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
