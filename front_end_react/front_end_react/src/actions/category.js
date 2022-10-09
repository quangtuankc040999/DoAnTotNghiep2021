import categoryActionType from '../actionTypes/categories'
import {get} from '../utils/api'
export const getCategoriesSuccess = (categories) => {
  return {
    type: categoryActionType.GET_CATEGORY_SUCCESS,
    payload: categories
  }

}
export const getCategoriesRequest = () => {
  return dispatch => {
    return get(`category/`).then(res => {
      dispatch(getCategoriesSuccess(res.data.data))
    })
  }
}