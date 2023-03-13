import React , {useState}from 'react';
import { Link } from 'react-router-dom';

import {useSelector,useDispatch } from 'react-redux';
import {login} from "../../redux/action/index";
import Navbar from "../../components/Navbar/Navbar";
import "./login.css";
// import 'bootstrap/dist/css/bootstrap.min.css';





export default function Login() {

  const dispatch=useDispatch();
  const admin=useSelector(state=>state.login.admin);
  const error=useSelector(state=>state.login.error);

      if(admin !== ''){
          window.location.href = "/";
      }
  
    
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

const LoginFun=(e)=>{
  e.preventDefault();
  dispatch(login(email,password))
}

  return (
    <div className="holder">
      <header className="header">
        <Navbar />
        {/* ________________________________________ */}
        
          <div className="body">
            <form id="form">
              <h2 id="h2">login</h2>
              <div className="qqq">
                <input id="input" type="text" placeholder="Your email" onChange={(e)=>setEmail(e.target.value)} />
                <p id="p1" />
              </div>
              <div className="qqq">
                <input
                  id="input"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e)=>setEmail(e.target.value)}/>
                <p id="p1" />
              </div>
              <input
                id="inputButtonLogin"
                type="button"
                defaultValue="login"
                onClick={(e)=> LoginFun(e)}/>
            </form>
          </div>
        {/* ________________________________________ */}

      </header>
    </div>
  );
}
