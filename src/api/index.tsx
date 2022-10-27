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

export class ConfigApi {
  async Splash() {
    try {
      return await axios.get(`${url}/splash`)
    } catch (error: any) {
      return error.response
    }
  }
}

export class AuthApi {
  async ForgotPassword(email: string) {
    try {
      return await axios.put(`${url}/auth/forgot-password`, { email })
    } catch (error: any) {
      return error.response
    }
  }

  async UserLogin(data: userLoginType) {
    try {
      return await axios.post(`${url}/auth/login`, data)
    } catch (error: any) {
      return error.response
    }
  }

  async UserRegister(data: userRegistryType) {
    try {
      return await axios.post(`${url}/users`, {
        ...data,
        role: "user",
        dateTime: "1970-01-01T00:00:00.000Z",
      })
    } catch (error: any) {
      return error.response
    }
  }
}

export class UserApi {
  async GetCategories() {
    try {
      return await axios.get(`${url}/category/all`)
    } catch (error: any) {
      return error.response
    }
  }

  async GetCourses() {
    try {
      return await axios.get(`${url}/course/all`)
    } catch (error: any) {
      return error.response
    }
  }
}
