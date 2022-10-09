import productActionType from '../actionTypes/products'


const initalState = {
  productList: [],
  product: {}
}
const productReducer = (state = initalState, action) => {
  switch (action.type) {
    case productActionType.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.payload
      }
    case productActionType.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: action.payload
      }
    default:
      return state
  }
}
export default productReducer