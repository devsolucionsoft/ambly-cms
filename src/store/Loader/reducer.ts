import { ON_LOADER } from "../actionTypes";

const initial_state = false;

const categoryReducer = (state = initial_state, action: any) => {
    switch (action.type) {
        case ON_LOADER:
            return action.payload;
        default: return state;
    }
}


export default categoryReducer