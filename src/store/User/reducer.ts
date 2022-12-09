import { LOAD_COURSES, SELECT_COURSE } from "../actionTypes";

const initial_state = {
    myCourses: [],
    selectCourse: {},
};

const userReducer = (state = initial_state, action: any) => {
    switch (action.type) {
        case LOAD_COURSES:
            return {
                ...state,
                myCourses: action.payload
            };
        case SELECT_COURSE:
            return {
                ...state,
                selectCourse: action.payload
            };
        default: return { ...state };
    }
}


export default userReducer