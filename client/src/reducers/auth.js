const initialState = {
  isAuthenticated: false
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: action.status,
      }
    default: return state
  }
}
