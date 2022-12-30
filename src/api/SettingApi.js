import axios from "axios";
import { api_url, headers} from "./config";

export class SettingApi {
  async uploadImage(image) {
    let imageForm = new FormData();
    imageForm.append("image", image);

    try {
      const response = await axios({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        url: `${api_url}/category/upload/img`,
        data: imageForm,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
