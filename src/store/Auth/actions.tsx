import { CREATE_SESSION } from "../actionTypes"

export const createSession = (payload: any) => {
  return {
    type: CREATE_SESSION,
    payload: payload,
  }
}
