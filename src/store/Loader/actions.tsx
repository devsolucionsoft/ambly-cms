import { ON_LOADER } from "../actionTypes"



export const onLoader = (payload: boolean) => {
  return {
    type: ON_LOADER,
    payload: payload,
  }
}

