import axios from "axios";

const api_url = "http://45.79.166.128:7034";

export class CoursesApi {
  async GetCourses() {
    try {
      return await axios.get(`${api_url}/course`);
    } catch (error) {
      return error.response;
    }
  }

  async CreateCourse(inputs) {
    const data = {
      ...inputs,
      dateTime: new Date(),
      num_modulos: 0,
      characteristic1: inputs.time_course,
      characteristic3: 0,
      popular_course: [false],
      next_course: [false],
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

  async EditeCourse(data, id) {
    console.log("EditeCourse",data);
    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/course/edite/${id}`,
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
