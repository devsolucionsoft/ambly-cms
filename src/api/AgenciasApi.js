import axios from "axios";
import { api_url, headers } from "./config";

export class AgenciaApi {
  constructor() {
    this.token_session = JSON.parse(localStorage.getItem("token_session"));
  }

  async GetAgencias() {
    try {
      return await axios.get(`${api_url}/agency`);
    } catch (error) {
      return error.response;
    }
  }

  async GetAgencia(id) {
    try {
      return await axios.get(`${api_url}/agency/${id}`);
    } catch (error) {
      return error.response;
    }
  }

  async GetVentas(id, params) {
    try {
      return await axios.get(`${api_url}/agency/searchdate/${id}`, {
        params,
        headers: {
          "Content-Type": "application/json",
          auth: this.token_session.token,
        },
      });
    } catch (error) {
      return error.response;
    }
  }
  async GetAllVentas(params) {
    const urlVentas = `sales?start_date=${params.date_inicial}&end_date=${params.date_final}`
    try {
      return await axios.get(`${api_url}/agency/${params.id}/${urlVentas}`, {
        headers: {
          "Content-Type": "application/json",
          auth: this.token_session.token,
        },
      });
    } catch (error) {
      return error.response;
    }
  }
  async CreateAgencia(inputs) {
    const data = {
      name_agency: inputs.name_agency,
      email: inputs.email,
      password: inputs.password,
      porcentaje_agency: inputs.porcentaje_agency,
      dateTime: new Date(),
    };

    try {
      const response = await axios.post(`${api_url}/agency`, data, {
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

  async EditeAgencia(inputs, id) {
    let data = {
      name_agency: inputs.name_agency,
      email: inputs.email,
      porcentaje_agency: inputs.porcentaje_agency,
    };

    if (inputs.password !== "") {
      data = {
        ...data,
        password: inputs.password,
      };
    }

    try {
      const response = await axios.patch(`${api_url}/agency/${id}`, data, {
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

  async deleteAgencia(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/agency/${id}`,
        headers: {
          auth: this.token_session.token,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
