import { useContext, useRef } from 'react';
import './login.css'
import { loginCall } from '../../components/apiCalls';
import {AuthContext} from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";

export default function Login(){

 const email = useRef();
 const password = useRef();
 const {user,isFetching, error, dispatch} = useContext(AuthContext);


 const handleClick = (e) =>{
  e.preventDefault();
  
  loginCall(
    {email:email.current.value,password:password.current.value}
    ,dispatch)
 }

console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
          <h5 className="animate-charcter loginLogo">Buzz Talk</h5>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              name='email'
              ref={email}
            
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              name='password'
              ref={password}
              
            />
            <button className="loginButton"  type="submit" disabled={isFetching} >
            {isFetching ? <CircularProgress style={{color:"white"}}/> : "Log In"}
            </button>
      
            
            <Link to={`/register`}>
            <button className="loginRegisterButton" type="submit">
            {isFetching ? <CircularProgress style={{color:"white"}}/> : "Create a new account"}
            </button>
            </Link>


          </form>
        </div>
      </div>
    </div>
  );
}
