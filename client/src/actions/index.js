import * as TYPES from './type'

const setCurrentUser = (status) => {
  return {
    type: TYPES.SET_CURRENT_USER,
    status
  }
}

export {
  setCurrentUser
}