import { LOAD_COURSES, SELECT_COURSE } from "../actionTypes"

export const loadCourses = (payload: any) => {
  return {
    type: LOAD_COURSES,
    payload: payload,
  }
}

export const selectCourse = (payload: any) => {
  return {
    type: SELECT_COURSE,
    payload: payload,
  }
}