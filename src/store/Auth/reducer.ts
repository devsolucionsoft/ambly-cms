import { CREATE_SESSION } from "../actionTypes";

const initial_state = {
    session: false,
    user: {}
};

const categoryReducer = (state = initial_state, action: any) => {
    switch (action.type) {
        case CREATE_SESSION:
            return {
                session: true,
                user: action.payload
            };

        default: return { ...state };
    }
}


export default categoryReducer