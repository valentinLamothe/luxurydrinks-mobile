const authReducers = (
    state = {
        user: null,
        token: null,
        img: null,
        role: null,
        users: [],
    }, action) => {
        console.log('action.payload:',action);
    if (action.type === 'LOG_USER') {
        // localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            user: action.payload
        }

    } else if (action.type === 'LOG_OUT') {
        // localStorage.clear() 
        return {
            user: null,
            token: null,
            img: null
        }
    } else if (action.type === 'GET_USERS') {
        return {
            ...state,
            users: action.payload
        }

    } else if (action.type === 'DELETE_USER') {
        return {
            ...state,
            users: state.users.filter(userDB => userDB._id !== action.payload)
        }
    } else {

        return state
    }
}


export default authReducers;
