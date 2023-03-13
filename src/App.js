import './App.css';
import {
   Routes, Route
} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreateBook from './components/BookList/CreateBook';
import EditBook from './components/BookList/editBook';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';

function App() {
  return (
    <>

      <Routes>
        <Route path = "/" element = {<Home />}>
          <Route path = "about" element = {<About />} />
          <Route path = "book" element = {<BookList />} />
          <Route path = "createBook" element = {<CreateBook />} />
          <Route path = "/book/:id" element = {<BookDetails />} />
          <Route path = "/editBook/:id" element = {<EditBook />} />
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/account" element={<Profile/>}/>
        <Route path='/profile/:id/edit' element={<EditProfile/>}/>

        
      </Routes>
  
    </>
  );
}

export default App;
