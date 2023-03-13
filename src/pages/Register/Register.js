import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./register.css";
import { Component } from 'react';
import axios from "axios";


const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const checkPass=RegExp(/^^[A-Za-z]\w{8,31}$/);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }




  export default class Register extends Component {


    constructor(props) {
        super(props);
          this.state = {
            name: null,
            email: null,
            password: null,
            phone: null,
            repassword: null,
            test:"",
            accept:false,
            users:[],
            errors: {
              name: '',
              email: '',
              phone: '',
              password: '',
              repassword: '',
            }
          };
          this.users =this.props.users
          console.log(this.users);
        }
        componentDidMount = () =>{
          axios.get("http://localhost:80/REACT_REDUX/book_app_redux/back_end/user.php/users/")
          .then((respone)=>{
            let email = respone.data.map((ele) => {
                  return ele.email
            })
            console.log(email);
              this.setState({
                  users:email
              })
              // setUsers(respone.data)
              console.log(respone.data);
          })
      }
        handleChange = (event) => {
          console.log(event);
          // event.preventDefault();
          const { name, value } = event.target;
          console.log( event.target.name, event.target.value );
            // let name = event.target.name;
            // let value = event.target.value;
          let errors = this.state.errors;
          switch (name) {
            case 'name': 
              errors.name = 
                value.length < 5
                  ? 'Full Name must be 5 characters long!'
                  : '';
              break;
              case 'email': 
              errors.email = 
              !validEmailRegex.test(value)
              ? 'Email is not valid!'
              : this.state.users.includes(value) 
              ? 'Email is already has been taken'
              : '' ; 
              break;
              case 'phone': 
                errors.phone = 
                  value.length !== 10
                    ? 'Phone must be 10 characters !'
                    : '';
                break;
            case 'password': 
            this.setState({
              test:value
            })
            errors.password = 
            checkPass.test(value)
            
            // value.length < 8 
  
            ? ''
            : 'Password must be 8 characters long!';
            break;
            case 'repassword': 
            console.log(this.state.test);
              errors.repassword = 
                value !== this.state.test
                  ? 'Confirm Password not match!'
                  : '';
              break;
            default:
              break;
          }
        
          this.setState({errors, [name]: value}, ()=> {
              console.log(errors)
          })
        }



        handleSubmit = (event) => {
          event.preventDefault();
          this.setState({accept:true,})

          const { name, email,password,phone } = this.state;
  
          let errors = this.state.errors;
          if(name === null){
              errors.name =  'Name is required'
          }
          if(email=== null){
              errors.email =  'email is required'
          }
          if(phone=== null){
              errors.phone =  'phone is required'
          }
          if(password === null){
              errors.password =  'password is required'
          }
   
          this.setState({errors}, ()=> {
              console.log(errors)
          })
  
          if(validateForm(this.state.errors)) {
            console.info('Valid Form')
            // let newUser ={name:this.state.name,email:this.state.email,password:this.state.password}
            // this.users.push(newUser);
            let inputs = {name:this.state.name,email:this.state.email,phone:this.state.phone,password:this.state.password}
            axios.post("http://localhost:80/REACT_REDUX/book_app_redux/back_end/user.php/save",inputs)
            .then((respone)=>{
                console.log(respone.data);
                window.localStorage.setItem('email',this.state.email)

                window.location.assign('/book');
            })
    
  
            // localStorage.setItem('users',JSON.stringify(this.users))
          }else{
            console.error('Invalid Form')
          }
          console.log( this.users);
  
        }
      




  render() {
    const {errors} = this.state;
  return (
    <div className="holder">
      <header className="header">
        <Navbar />

        <div className="body">
          <form id="form"  method="POST" onSubmit={this.handleSubmit} noValidate>
            <h2 id="h2">Register</h2>

            <div className="qqq">
              <input id="input"type='text' name='name' onChange={this.handleChange} noValidate placeholder="Your Name" />
              {errors.name.length > 0 && this.state.accept &&  <p id="p1">{errors.name}</p>}
            </div>

            <div className="qqq">
              <input id="input" type="email" name='email' onChange={this.handleChange} noValidate placeholder="Your email" />
              {errors.email.length > 0 && this.state.accept &&  <p id="p1">{errors.email}</p>}
            </div>

            <div className="qqq">
              <input id="input" type="text"  name='phone' onChange={this.handleChange} noValidate placeholder="Your phone" />
              {errors.phone.length > 0 && this.state.accept &&  <p id="p1">{errors.phone}</p>}
            </div>

            <div className="qqq">
              <input id="input" type="password" name="password" onChange={this.handleChange} noValidate  placeholder="Enter password" />
              {errors.password.length > 0 && this.state.accept &&  <p id="p1">{errors.password}</p>}
            </div>

            <div className="qqq">
              <input id="input" type="password" name='repassword' onChange={this.handleChange} noValidate placeholder="Enter repassword" />
              {errors.repassword.length > 0 && this.state.accept &&  <p id="p1">{errors.repassword}</p>}
            </div>

            <input id="inputButtonRegister" type="submit" defaultValue="Register"/>
          </form>
        </div>
      </header>
    </div>
    );
  }
  
  }
