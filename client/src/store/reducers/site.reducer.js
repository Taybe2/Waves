import { GET_SITE_VARS, UPDATE_VARS } from '../types';

let DEFAULT_SITE_STATE = {
    vars: {
        _id: null,
        address: '',
        hours: '',
        phone: '',
        email: ''
    }
}

export default function usersReducer(state=DEFAULT_SITE_STATE, action) {
    switch(action.type) {
        case GET_SITE_VARS:
            return { ...state, vars: action.payload }
        case UPDATE_VARS:
            return { ...state, vars: action.payload }
        default:
            return state;
    }
}