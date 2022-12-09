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

  async UserLoginGoogle(email?: string) {
    try {
      return await axios.post(`${url}/social/google`, {
        email_google: email,
      })
    } catch (error: any) {
      return error.response
    }
  }

  async UserRegistryGoogle(data: { email: string }) {
    try {
      return await axios.post(`${url}/social/google`, {
        email_google: data.email,
        password: "0000000",
        username: data.email,
        role: "user",
        dateTime: "1970-01-01T00:00:00.000Z",
      })
    } catch (error: any) {
      return error.response
    }
  }

  async UserLoginFacebook(email?: string) {
    try {
      return await axios.post(`${url}/social/facebook`, {
        email_facebook: email,
      })
    } catch (error: any) {
      return error.response
    }
  }

  async UserRegistryFacebook(data: { email: string }) {
    try {
      return await axios.post(`${url}/social/facebook`, {
        email_facebook: data.email,
        password: "0000000",
        username: data.email,
        role: "user",
        dateTime: "1970-01-01T00:00:00.000Z",
      })
    } catch (error: any) {
      return error.response
    }
  }

  async UserLoginApple(user?: any) {
    try {
      return await axios.post(`${url}/social/apple`, {
        token_apple: user,
      })
    } catch (error: any) {
      return error.response
    }
  }

  async UserRegistryApple(data: any) {
    try {
      return await axios.post(`${url}/social/apple`, {
        email_apple: data.email,
        token_apple: data.id,
        password: "0000000",
        username: data.email,
        role: "user",
        dateTime: "1970-01-01T00:00:00.000Z",
      })
    } catch (error: any) {
      return error.response
    }
  }

  async UserRegister(data: any) {
    try {
      return await axios.post(`${url}/users`, {
        username: data.username,
        password: data.password,
        email: data.email,
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

  async GetCourse(id: string | number) {
    try {
      return await axios.get(`${url}/course/${id}`)
    } catch (error: any) {
      return error.response
    }
  }

  async GetAllCourses() {
    try {
      return await axios.get(`${url}/course/all`)
    } catch (error: any) {
      return error.response
    }
  }

  async GetMyCourses(id: any) {
    try {
      return await axios.get(`${url}/course/all/course/${id}`)
    } catch (error: any) {
      return error.response
    }
  }
}

export class CourseApi {
  async saveVideoTrailer(data: {
    time_seen: number,
    modules_id: number,
    video_id: number
}) {
    try {
      return await axios.post(`${url}/modules/save/video`, {
        "time_seen": data.time_seen,
        "modules_id": data.modules_id,
        "video_id": data.video_id
    })
    } catch (error: any) {
      return error.response
    }
  }
}
