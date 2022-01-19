import axios from 'axios';

const authActions = {
    signUpUser: (newUser) => {
        return async (dispatch, getState) => {
            const res = await axios.post('https://backendparavalen.herokuapp.com/api/user/signup', newUser)
            if (res.data.success && !res.data.error) {
                dispatch({ type: 'LOG_USER', payload: res.data.response });
                return res
            } else {
                return res
            }
        }
    },
    signInUser: (logUser) => {
        return async (dispatch, getState) => {
            const res = await axios.post('https://backendparavalen.herokuapp.com/api/user/login', { ...logUser })
            if (res.data.success && !res.data.error) {
                dispatch({ type: 'LOG_USER', payload: res.data.response.user })
                return res
            } else {
                return res
            }
        }
    },
    logOut: () => {
        return async (dispatch, getState) => {
            dispatch({ type: "LOG_OUT" })
        }
    },
    authUser: (token) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://backendparavalen.herokuapp.com/api/user/auth', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                const authUser = response.data.response
                authUser.token = token
                dispatch({ type: "LOG_USER", payload: authUser })
            } catch (error) {
                console.error(error)
                return dispatch({ type: 'LOG_OUT' })
            }
        }
    },
    getUsers: () => {
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get('https://backendparavalen.herokuapp.com/api/admin/users', {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'GET_USERS', payload: res.data.users })
                return res.data.users
            } catch (error) {
                return { msg: 'Unauthorized' }
            }

        }
    },
    deleteUser: (userId) => {
        return async (dispatch, getState) => {
            try {
                // const token = localStorage.getItem('token')
                const res = await axios.delete(`https://backendparavalen.herokuapp.com/api/admin/user/${userId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'DELETE_USER', payload: res.data.deletedId })

                return res.data.users
            } catch (error) {
                return { msg: 'You must be login' }
            }

        }
    },

}

export default authActions
