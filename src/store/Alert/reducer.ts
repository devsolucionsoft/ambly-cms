import { OPEN_ALERT, CLOSE_ALERT } from "../actionTypes";

const initial_state = {
    open: false,
    data: {
        title: "",
        text: "",
        icon: ""
    }
};

const categoryReducer = (state = initial_state, action: any) => {
    switch (action.type) {
        case OPEN_ALERT:
            return {
                open: true,
                data: action.data
            };
        case CLOSE_ALERT:
            return initial_state;
        default: return { ...state };
    }
}


export default categoryReducer