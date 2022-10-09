import categoriesActionType from '../actionTypes/categories'


const initalState = {
  categoryList: []
}
const categoryReducer = (state = initalState, action) => {
  switch (action.type) {
    case categoriesActionType.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: action.payload
      }
    default:
      return state
  }
}
export default categoryReducer