import cartActionType from '../actionTypes/cart'


const initalState = {
  cart: []
}
const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case cartActionType.GET_CART_BY_USER_ID_SUCCESS:
      return {
        ...state,
        cart: action.payload
      }
    default:
      return state
  }
}
export default cartReducer