import axios from "axios";

const api_url = "http://45.79.166.128:7034";

export class InstructorsApi {
  async GetInstructors() {
    try {
      return await axios.get(`${api_url}/instructor`);
    } catch (error) {
      return error.response;
    }
  }

  async CreateInstructor(inputs) {
    const data = {
      name_instructor: inputs?.name_instructor,
      image_instructor: inputs?.image_instructor,
      description_instructor: inputs?.description_instructor,
      image_secondary: inputs?.image_secondary,
      description_secondary: inputs?.description_secondary,
      description_third: inputs?.description_tertiary,
      carousel_images: "",
    };

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/instructor/create`,
        data: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async deleteInstructor(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/instructor/delete/${id}`,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
