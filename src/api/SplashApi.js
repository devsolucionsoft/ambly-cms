import axios from "axios";

const api_url = "http://45.79.166.128:7034";

export class SplashApi {
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
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async deleteSplash(id) {
    try {
      const response = await axios({
        method: 'delete',
        url: `${api_url}/splash/${id}`
      })
      return response
    } catch (error) {
      return error.response
    }
  }
}
