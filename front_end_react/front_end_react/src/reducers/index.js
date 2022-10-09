import productReducer from "./product";
import { combineReducers } from 'redux'
import categoryReducer from "./category";
import loginReducer from "./login";
import cartReducer from "./cart";



const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  login: loginReducer,
  cart: cartReducer
})
export default rootReducer