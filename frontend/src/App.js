import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from "./components/auth/Login";
import Femcare from "./components/Femcare";
import Navbar from "./components/Navbar";
import { login, selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar postsProp={ posts } setPostsProp={ setPosts } userProp={user}/>
        <Routes>
          <Route path="/" element={ <Login/> } />
          <Route path="/home" element={ <Femcare postsProp={ posts } setPostsProp={ setPosts }/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
