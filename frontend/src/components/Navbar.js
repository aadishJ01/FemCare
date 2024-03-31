import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar, Button } from "@material-ui/core";
import "./css/Navbar.css";
import "react-responsive-modal/styles.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "./Searchbar";
import CloseIcon from "@material-ui/icons/Close";
import { Modal } from "react-responsive-modal";

function Navbar({ postsProp, setPostsProp, userProp }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const Close = <CloseIcon />;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        window.location.href = "/";
        console.log("Logged out");
      })
      .catch(() => {
        console.log("error in logout");
      });
  };

  const handleHomeIcon = () => {
    window.location.href = "/home";
  }

  if(!userProp)
    return (
      <></>
    )
  
  return (
    <div className="navbarContainer">
        <div className="navbar_left">
          <div className="navbar_leftIcon" onClick={handleHomeIcon}>
            <HomeIcon />
          </div>
        </div>
        <div className="navbar_center">
          <Searchbar postsProp={ postsProp } setPostsProp={ setPostsProp }/>
        </div>
        <div className="navbar_right">
          <span>
            <Avatar src={user?.photo} />
          </span>
          <Button onClick={() => setIsLogoutModalOpen(true)}>Log Out</Button>
          <Modal
            open={isLogoutModalOpen}
            CloseIcon={Close}
            onClose={() => setIsLogoutModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            classNames={{
              modal: 'customModal',
            }}
          >
            <div className="modalContainer">
              <div className="modal_title">
                <h1>Are you Sure, You want to Logout ?</h1>
              </div>
              <div className="modal_footer">
                <button id="modal_footerCancelBtn" onClick={() => setIsLogoutModalOpen(false)}>
                  Cancel
                </button>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </Modal>
        </div>
    </div>
    
  );

}

export default Navbar;
