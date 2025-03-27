const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return { ...state, loading: true };
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, isAuthenticated: true };
    case 'AUTH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'AUTH_LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
