import loginActionType from '../actionTypes/login'


const initalState = {
  userInfo: {}
}
const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case loginActionType.LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        userInfo: action.payload
      }
    default:
      return state
  }
}
export default loginReducer