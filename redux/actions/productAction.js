import axios from "axios"

const productActions = {

    fetchProducts: () => {
        return async(dispatch, getState) => {
            const res = await axios.get("https://backendparavalen.herokuapp.com/api/drinks")
            if(res.data.success){
                dispatch({type:'GET_PRODUCTS',payload:res.data})
            }else{
                console.error('Error trying to fetch')
            }
    }},
    filterProducts: ( filter,products, value) => {
        return(dispatch,getState) => {
            dispatch({type:'FILTER_PRODUCTS',payload:{filter,products,value}})
        }
    },
    deleteProduct: (productId) => {
        return async (dispatch, getState) => {
            try {
                // const token = localStorage.getItem('token')
                const res = await axios.delete(`https://backendparavalen.herokuapp.com/api/drinks/admin/drink/${productId}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({ type: 'DELETE_PRODUCT', payload: res.data.deletedId })

                // if(res.data.msg) {
                //     Swal.fire({title: 'Borrado de la BD!', position: 'center', background: 'black', color: 'white', toast: true})
                // }

                return res.data.users
            } catch (error) {
                return { msg: 'You must be login' }
            }

        }
    }
}

export default productActions