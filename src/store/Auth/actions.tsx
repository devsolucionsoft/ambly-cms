import { CREATE_SESSION, CLOSE_SESSION } from "../actionTypes"

export const createSession = (payload: any) => {
  return {
    type: CREATE_SESSION,
    payload: payload,
  }
}

export const closeSession = () => {
  return {
    type: CLOSE_SESSION,
  }
}
