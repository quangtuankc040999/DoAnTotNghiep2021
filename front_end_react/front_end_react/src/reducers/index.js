import productReducer from "./product";
import { combineReducers } from 'redux'
import categoryReducer from "./category";
import loginReducer from "./login";



const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  login: loginReducer
})
export default rootReducer