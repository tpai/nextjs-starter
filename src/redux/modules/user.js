const SET_USER = 'user/change'

const reducer = (state = '', action) => {
  switch (action.type) {
  case SET_USER:
    return action.data
  default:
    return state
  }
}

export default reducer

export function setUser() {
  return {
    type: SET_USER,
    data: 'Anthony'
  }
}
