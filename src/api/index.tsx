import axios from "axios"
import Constants from "expo-constants"
const url = Constants.manifest?.extra?.api_url

interface userLoginType {
  email: string
  password: string
}

type userRegistryType = userLoginType & {
  username: string
  phone: string
  city: string
  country: string
  gender: string
  email: string
  password: string
}

export class AuthApi {
  constructor() {}

  async ForgotPassword(email: string) {
    try {
      return await axios.put(`${url}/auth/forgot-password`, { email })
    } catch (error) {
      return error
    }
  }

  async UserLogin(data: userLoginType) {
    try {
      return await axios.post(`${url}/auth/login`, {
        email: "pruebas@gmail.com",
        password: "123456"
      })
    } catch (error) {
      return error
    }
  }

  async UserRegister(data: userRegistryType) {
    try {
      return await axios.post(`${url}/users`, {
        ...data,
        role: "user",
        dateTime: "1970-01-01T00:00:00.000Z",
      })
    } catch (error) {
      return error
    }
  }
}
