import axios from "axios";
import { api_url, headers } from "./config";

export class CategoriesApi {
  constructor() {
    this.token_session = JSON.parse(localStorage.getItem("token_session"));
  }

  async GetCategories() {
    try {
      return await axios.get(`${api_url}/category/all`);
    } catch (error) {
      return error.response;
    }
  }

  async uploadImage(image) {
    let imageForm = new FormData();
    imageForm.append("image", image);

    try {
      const response = await axios({
        method: "post",
        headers: { "Content-Type": "multipart/form-data", token: "xxxxxx" },
        url: `${api_url}/category/upload/img`,
        data: imageForm,
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

  async CreateCategorie(inputs) {
    const data = {
      name: inputs.name,
      image: inputs.image,
      image_banner: inputs.image_banner,
      description: inputs.description,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/category/create`,
        data: data,
        user: "....",
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

  async EditeCategorie(data, id) {
    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/category/edit/${id}`,
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

  async deleteCategory(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/category/delete/${id}`,
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
