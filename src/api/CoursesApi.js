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

  async deleteCourse(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/course/delete/${id}`,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async AddModule(inputs, course) {
    const data = {
      name_module: inputs.name_module,
      description: inputs.description,
      time_module: inputs.time_module,
      course: course,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/modules/create`,
        data: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async EditeModule(inputs, module) {
    const data = {
      name_module: inputs.name_module,
      description: inputs.description,
      time_module: inputs.time_module,
    };

    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/modules/edit/${module}`,
        data: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async deleteModule(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/modules/delete/${id}`,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async AddVideo(inputs, module) {
    const data = {
      name_video: inputs.name,
      description_video: inputs.description,
      video: inputs.video,
      modules: module,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/videos`,
        data: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async EditeVideo(data, video) {
    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/videos/edit/${video} `,
        data: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async deleteVideo(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/videos/delete/${id}`,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
