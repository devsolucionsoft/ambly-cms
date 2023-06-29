import axios from "axios";
import { api_url, headers } from "./config";

export class CoursesApi {
  constructor() {
    this.token_session = JSON.parse(localStorage.getItem("token_session"));
  }

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
      instructor: parseInt(inputs.instructor),
      category: parseInt(inputs.category),
    };

    console.log(data);

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/course/create`,
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

  async EditeCourse(data, id) {
    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/course/edite/${id}`,
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

  async deleteCourse(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/course/delete/${id}`,
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

  async deleteModule(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/modules/delete/${id}`,
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

  async EditeVideo(data, video) {
    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/videos/edit/${video} `,
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

  async deleteVideo(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/videos/delete/${id}`,
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

  async UploadFile(file) {
    let form = new FormData();
    form.append("pdf", file);

    try {
      const response = await axios({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        url: `${api_url}/files/upload/pdf`,
        data: form,
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

  async AddFile(inputs, module) {
    const data = {
      name_file: inputs.name,
      link_file: inputs.file,
      modules: module,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${api_url}/files`,
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

  async EditeFile(data, video) {
    try {
      const response = await axios({
        method: "patch",
        url: `${api_url}/files/${video} `,
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

  async deleteFile(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/files/remove/${id}`,
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
