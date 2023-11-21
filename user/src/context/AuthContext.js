import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

const INITIAL_STATE = {
  // user:JSON.parse(localStorage.getItem("user")) || null,
  user:null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [profile , setProfile] = useState(null);
  
  useEffect(() => {
   const user = JSON.parse(localStorage.getItem('user'));
    const fetchUser = async (user) => {
      const res = await axios.get(`/users?userId=${user}`);
      console.log('res', res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setProfile(res.data);
    };
    if(user) {
        fetchUser(user?._id);
      }
        console.log("userId", user);
  }, []);

  

  return (
    <AuthContext.Provider
      value={{
        user: state.user ? state.user : profile,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
