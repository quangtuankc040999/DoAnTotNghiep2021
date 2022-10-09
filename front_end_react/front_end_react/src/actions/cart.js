import cartActionType from '../actionTypes/cart'
import {get, put} from '../utils/api'

export const getCartByUserIdSuccess = (cart) => {
  return {
    type: cartActionType.GET_CART_BY_USER_ID_SUCCESS,
    payload: cart
  }
}

export const getProductCardByUserIdRequest = (userId) => {
  return dispatch => {
    return get(`user/cart/${userId}`).then(res => {
      dispatch(getCartByUserIdSuccess(res.data.data.productCart))
    })
  }
}

export const addPrdductIntoCartRequest = ({userId, product}) => {
    return dispatch => {
      return put(`user/cart/${userId}`, product).then(res => {
        dispatch(getProductCardByUserIdRequest(userId))
      })
    }
  }
  export const updateProductInCartRequest = ({userId, product}) => {
    return dispatch => {
      return put(`user/cart/update/${userId}`, product).then(res => {
        dispatch(getProductCardByUserIdRequest(userId))
      })
    }
  }