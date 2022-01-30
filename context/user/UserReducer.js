export default function UserReducer(state, action) {

    const {type, payload} = action; 

    switch (type) {
        case 'USER_LOGIN':
            return { ...state, userInfo: payload }
        case 'USER_LOGOUT':
            return { ...state, userInfo: null, }
        case 'ERROR_MESSAGE':
            return { ...state, errorMessage: payload}
        default:
            return state;
    }
}