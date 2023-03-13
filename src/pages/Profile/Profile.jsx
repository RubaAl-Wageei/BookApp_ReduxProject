import React, { useEffect, useState } from 'react';
import './profile.css';
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';


export default function Profile() {

    // const current_ID = JSON.parse(localStorage.getItem('id'));
    const current_ID = 1;
    // const user_email = localStorage.getItem('email');

    const [dataUsers,setDataUsers] = useState([]);

    useEffect(()=>{
        getDataUsers();
       
    },[]);

      // لعرض  بيانات المستخدم في الموقع
  const getDataUsers = () => {

    axios.get(`http://localhost:80/REACT_REDUX/book_app_redux/back_end/user.php/users/${current_ID}`)
    .then((respone)=>{
      setDataUsers(respone.data)
        console.log(respone.data);
    })
}

  return (
    <>
    {dataUsers.map((users,index)=>{

return <div key={index}>
<Navbar />

<div className='parent'>
<div className="wrapper">
        <div className="left">
          <img src={require(`../../images/${users.image}`)} alt="user" width={100} />
          <h4>{users.name}</h4>
          <p>FULL STACK DEVELOPER</p>
        </div>
        <div className="right">
          <div className="info">
            <h3>Information</h3>
            <div className="info_data">
              <div className="data">
                <h4>Email</h4>
                <p>{users.email}</p>
              </div>
              <div className="data">
                <h4>Phone</h4>
                <p>{users.phone}</p>
              </div>
            </div>
          </div>
          <div className="projects">
            <h3>Books</h3>
            <div className="projects_data">
              <div className="data">
                <h4>Recent</h4>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="data">
                <h4>Most Viewed</h4>
                <p>dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div className="social_media">
            <ul>
              <li><a href={`/profile/${users.id}/edit`}><i className="fab fa-facebook-f" />edit</a></li>
              {/* <li><a href="#f"><i className="fab fa-twitter" /></a></li>
              <li><a href="#f"><i className="fab fa-instagram" /></a></li> */}
            </ul>
          </div>
        </div>
      </div>
      </div>
      </div>
        })}
    </>
  )
}
