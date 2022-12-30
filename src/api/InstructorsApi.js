import axios from "axios";
import { api_url, headers} from "./config";

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

  async EditInstructor(inputs, id) {
    const data = {
      name_instructor: inputs?.name_instructor,
      image_instructor: inputs?.image_instructor,
      description_instructor: inputs?.description_instructor,
      image_secondary: inputs?.image_secondary,
      description_secondary: inputs?.description_secondary,
      description_third: inputs?.description_third,
      carousel_images: "",
    };

    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/instructor/update/${id}`,
        data: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async AddReviewsInstructor(inputs, id) {
    const data = {
      review: inputs.review,
      author: inputs.author,
      instructor_id: id,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/instructor/review`,
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

  async deleteReviewInstructor(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/instructor/review/delete/${id}`,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
