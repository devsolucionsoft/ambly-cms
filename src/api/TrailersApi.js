import axios from "axios";
import { api_url } from "./config";

export class TrailersApi {
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
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async deleteTrailers(id) {
    try {
      const response = await axios({
        method: 'delete',
        url: `${api_url}/trailer/${id}`
      })
      return response
    } catch (error) {
      return error.response
    }
  }
}
