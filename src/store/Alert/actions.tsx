import { CLOSE_ALERT, OPEN_ALERT } from "../actionTypes"

export interface openAlertType {
  title: string
  text: string
  icon?: "check" | "error"
}

export const openAlert = (payload: openAlertType) => {
  return {
    type: OPEN_ALERT,
    data: payload,
  }
}

export const closeAlert = () => {
  return {
    type: CLOSE_ALERT
  }
}

