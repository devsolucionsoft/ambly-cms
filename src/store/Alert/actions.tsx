import { CLOSE_ALERT, OPEN_ALERT } from "../actionTypes"

export const openAlert = (payload: {
    title: string
    text: string
    icon?: "check" | "error"
  }
) => {
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

