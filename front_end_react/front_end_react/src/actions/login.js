import loginActionType from '../actionTypes/login'
import { post} from '../utils/api'

export const loginSuccess = (user) => {
  return {
    type: loginActionType.LOGIN_SUCCESS,
    payload: user
  }

}
export const loginRequest = (userParams) => {
  return dispatch => {
    return post(`auth/login/`, userParams).then(res => {
      dispatch(loginSuccess(res.data.data))
    })
  }
}