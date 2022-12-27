import axios from "axios"

const api_url = "http://45.79.166.128:7034"

export class AuthApi {
  async UserLogin(data) {
    try {
      return await axios.post(`${api_url}/auth/login`, data)
    } catch (error) {
      return error.response
    }
  }
}