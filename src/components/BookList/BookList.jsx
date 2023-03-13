import React, { useEffect, useState } from 'react';
// import { useGlobalContext } from '../../context.';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";
import { Link } from 'react-router-dom';
import axios from 'axios';


const BookList = () => {
  const[Books,setBooks]=useState([]);

  useEffect(()=>{
    getBooks();

          },[])

          const getBooks =()=>{
        
            axios.get("http://localhost/REACT_REDUX/book_app_redux/back_end/books.php")
          
            .then((res)=>{
                console.log(res.data)
                setBooks(res.data)
            })
       } 

  // const booksWithCovers = books.map((singleBook) => {
  //   return {
  //     ...singleBook,
  //     id: (singleBook.id).replace("/works/", ""),
  //     cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
  //   }
  // });

  // if(loading) return <Loading />;

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          {/* <h2>{resultTitle}</h2> */}
          
          <div style={{display:'flex',justifyContent:'space-around'}}>
            <h2  style={{marginTop:'-19px'}}>All Books</h2>
            <Link to="/createBook">
                <button className='btn'>Add book</button>
            </Link>
          </div>
        </div>
        <div className='booklist-content grid'>
        {(Books == []) ?
                  <></>
                  :
                  Books.map((book) =>(
                    <Book   key = {book.id} Books ={book} />
                    ))}
        
                {/* <Book /> */}
                {/* // <Book key = {index} {...item} /> */}
            
        </div>
      </div>
    </section>
  )
}

export default BookList