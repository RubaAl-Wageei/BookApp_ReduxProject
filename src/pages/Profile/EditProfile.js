import React, { useEffect, useState } from 'react';
import './profile.css';
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function EditProfile() {


    const {id} = useParams();
    const navigate = useNavigate();
    const [inputs , setInputs] = useState("");
    const [file, setFile] = useState(null);
    const [user , setUser] = useState([]);

    
    useEffect(()=>{
        getUser();
    } , [])

    function getUser(){
        axios.get(`http://localhost:80/REACT_REDUX/book_app_redux/back_end/users.php/${id}`)
        .then(response => {
            console.log(response.data);
            setUser(response.data);
        })
    }
    const handleEditUser = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs( {...inputs , [name]: value})
      }
  
      const handleEditUserSubmit  = async (e) => {
        e.preventDefault();
    
        const formEditData = new FormData();
  
        formEditData.append("name", inputs['name']);
        formEditData.append("phone", inputs['phone']);
        formEditData.append("password", inputs['password']);
        formEditData.append("file", file);
      
        try {
          const response = await axios.post(
            `http://localhost:80/REACT_REDUX/book_app_redux/back_end/editUserProfile.php/${id}`, formEditData
          );
          console.log(response.data);
          navigate(`/account`);
        //   window.location.assign(`/profile/${id}`);
        } catch (error) {
          console.error(error);
        }
      };



  return (
    <>

<Navbar />

        
<div className='profileForm'>
    <h1>Edit User Info</h1>
    <form onSubmit={handleEditUserSubmit}>
    <label htmlFor="">Name</label>
      <input type="text" placeholder="name" name="name" defaultValue={user.name} onChange={handleEditUser} />
    {/* <label htmlFor="">Email</label>
      <input /> */}
    <label htmlFor="">Phone</label>
      <input type="number"  placeholder="phone"  name="phone" defaultValue={user.phone}  onChange={handleEditUser} />
    <label htmlFor="">Password</label>
      <input  type="password"  placeholder="Email" name="password" defaultValue={user.password} onChange={handleEditUser} />
      <br/>
      <input type="file" style={{border:'none',borderRadius:'0'}}  placeholder="image"   name="file" id="file"onChange={(e) => setFile(e.target.files[0])}/>
      <button type='submit'>Submit</button>
    </form>
   </div>
        
        
    </>
  )
}
