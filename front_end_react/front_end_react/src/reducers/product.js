import productActionType from '../actionTypes/products'


const initalState = {
  productList: []
}
const productReducer = (state = initalState, action) => {
  switch (action.type) {
    case productActionType.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.payload
      }
    default:
      return state
  }
}
export default productReducer