const AuthReducer = (state, action) => {
  
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
      
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };

    case "UPDATE_START":
      return {
        ...state,
        isFetching:true
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };

    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state?.user?.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      console.log("unfollwo", state)
      return {
        ...state,
        user: {
          ...state.user,
          followings: state?.user?.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
