import axios from "axios";

const api_url = "http://45.79.166.128:7034";

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
    console.log(data, id);
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
