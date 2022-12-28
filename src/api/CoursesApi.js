import axios from "axios";

const api_url = "http://45.79.166.128:7034";

export class CoursesApi {
  async GetCategories() {
    try {
      return await axios.get(`${api_url}/category/all`);
    } catch (error) {
      return error.response;
    }
  }

  async CreateCourse(inputs) {
    const data = {
      name_course: "juan",
      description: "A través ",
      image_course: "link",
      num_modulos: 3,
      image_name:
        "https://app-ambly.s3.amazonaws.com/static/uploads/0f4538bd56fbc96a7280-ambly-los-pilares-para-una-vida-saludable-2.png",
      time_course: "03:32",
      popular_course: [false],
      next_course: true,
      price: "30000",
      dateTime: "1970-01-01T00:00:00.000Z",
      characteristic1: "2",
      characteristic2: "2",
      characteristic3: "2",
      characteristic4: "2",
      instructor: "id",
      categories: "id",
    };

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/course/create`,
        data: data,
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
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
