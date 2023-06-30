import axios from "axios";
import { api_url, headers } from "./config";

export class SettingApi {
  constructor() {
    this.token_session = JSON.parse(localStorage.getItem("token_session"));
  }
  async uploadImage(image) {
    let imageForm = new FormData();
    imageForm.append("image", image);

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/category/upload/img`,
        data: imageForm,
        headers: {
          "Content-Type": "multipart/form-data",
          auth: this.token_session.token,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
