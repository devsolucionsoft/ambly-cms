import axios from "axios";
import { api_url, headers } from "./config";

export class InfluencersApi {
  constructor() {
    this.token_session = JSON.parse(localStorage.getItem("token_session"));
  }

  async GetInfluencer(id) {
    try {
      return await axios.get(`${api_url}/influencer/${id}`);
    } catch (error) {
      return error.response;
    }
  }

  async GetVentas(params) {
    try {
      return await axios.get(`${api_url}/influencer/sales?start_date=${params.date_inicial}&end_date=${params.date_final}`, {
        headers: {
          "Content-Type": "application/json",
          auth: this.token_session.token,
        },
      });
    } catch (error) {
      return error.response;
    }
  }

  async CreateInfluencer(inputs) {
    const data = {
      name_influencer: inputs.name_influencer,
      email: inputs.email,
      password: inputs.password,
      porcentaje_influencer: inputs.porcentaje_ganancia,
      percentage_discount: inputs.porcentaje_descuento,
      code_influencer: inputs.code_influencer,
      dateTime: new Date(),
      agencyId: parseInt(localStorage.getItem("agency_id")),
    };

    try {
      const response = await axios.post(`${api_url}/influencer`, data, {
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

  async EditeInfluencer(inputs, id) {
    let data = {
      name_influencer: inputs.name_influencer,
      email: inputs.email,
      porcentaje_influencer: inputs.porcentaje_influencer,
      code_influencer: inputs.code_influencer,
    };

    if (inputs.password !== "") {
      data = {
        ...data,
        password: inputs.password,
      };
    }

    try {
      const response = await axios.patch(`${api_url}/influencer/${id}`, data, {
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

  async deleteInfluencer(id) {
    try {
      const response = await axios({
        method: "delete",
        url: `${api_url}/influencer/${id}`,
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
