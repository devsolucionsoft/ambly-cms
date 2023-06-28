import axios from "axios";
import { api_url, headers } from "./config";

export class TrailersApi {
  constructor() {
    this.token_session = JSON.parse(localStorage.getItem("token_session"));
  }

  async GetTrailers() {
    try {
      return await axios.get(`${api_url}/trailer`);
    } catch (error) {
      return error.response;
    }
  }

  async CreateTrailers(inputs) {
    const data = {
      course_name: inputs.course_name,
      instructor: inputs.instructor,
      video: inputs.video,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/trailer`,
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

  async EditeTrailers(data, id) {
    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/trailer/${id}`,
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

  async deleteTrailers(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/trailer/${id}`,
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
