import productActionType from '../actionTypes/products'
import {get} from '../utils/api'
export const addNewProduct = (user) => {
  return {
    type: "ADD_PRODUCT",
    payload: user
  }
}
export const getProductsSuccess = (products) => {
  return {
    type: productActionType.GET_PRODUCT_SUCCESS,
    payload: products
  }

}
export const getProductsRequest = () => {
  return dispatch => {
    return get(`product/`).then(res => {
      dispatch(getProductsSuccess(res.data.data))
    })
  }
}


export const getProductsByCategoryRequest = (params) => {
  return dispatch => {
    return get(`fillter-product/category/${params}/1`).then(res => {
      dispatch(getProductsSuccess(res.data.data))
    })
  }
}