import axios from 'axios';

const authActions = {
    signUpUser: (newUser) => {
        return async (dispatch, getState) => {
            const res = await axios.post('https://backendparavalen.herokuapp.com/api/user/signup', newUser)
            if (res.data.success && !res.data.error) {
                // localStorage.setItem('token', res.data.response.token)
                dispatch({ type: 'LOG_USER', payload: { _id: res.data.response._id, token: res.data.response.token, userImg: res.data.response.img, firstName: res.data.response.firstName, role: res.data.response.role } });
                return res
            } else {
                console.error(res)
                return res
            }
        }
    },
    signInUser: (logUser) => {
        return async (dispatch, getState) => {
            const res = await axios.post('https://backendparavalen.herokuapp.com/api/user/login', { ...logUser })
            console.log('actionAuth:', res);
            if (res.data.success && !res.data.error) {
                // localStorage.setItem('token', res.data.response.token)
                dispatch({ type: 'LOG_USER', payload: { _id: res.data.response._id, token: res.data.response.token, userImg: res.data.response.img, firstName: res.data.response.name, role: res.data.response.role } })
                console.log(res);
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
