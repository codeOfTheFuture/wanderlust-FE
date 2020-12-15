import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBarCenter from "./NavBarCenter";
import NavBarLeft from "./NavBarLeft";
import NavBarRightLogin from "./NavBarRightLogin";
import NavBarRightLoggedOut from "./NavBarRightLoggedOut";
import NavBarRightGuide from "./NavBarRightGuide";
import NavBarRightTourist from "./NavBarRightTourist";
import firebase from "firebase/app";

import { MDBNavbar, MDBNavbarToggler, MDBCollapse } from "mdbreact";

const NavBar = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough] = useState(false);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const fetchingUserError = useSelector(
    (state) => state.userReducer.fetchingUserError
  );
  const location = props.history.location.pathname;

  const handleSignOut = () => {
    localStorage.removeItem("firebase_jwt");
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push("/signin");
      });
  };

  const onClick = () => {
    setCollapse((state) => !state);
  };

  console.log("current location", location);
  return (
    <>
      <MDBNavbar
        color='unique-color'
        fixed='top'
        dark
        expand='md'
        scrolling
        transparent
        style={{
          boxShadow: "none",
        }}
      >
        {!isWideEnough && <MDBNavbarToggler onClick={onClick} />}
        <MDBCollapse
          isOpen={collapse}
          navbar
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <NavBarLeft />
          </div>
          <div>{location === "/explore-tours" && <NavBarCenter />}</div>
          <div>
            {location === "/signin" || location === "/signup" ? (
              <NavBarRightLogin {...props} />
            ) : fetchingUserError ? (
              <NavBarRightLoggedOut {...props} />
            ) : currentUser.isTourGuide ? (
              <NavBarRightGuide
                collapse={collapse}
                handleSignOut={handleSignOut}
              />
            ) : (
              <NavBarRightTourist
                collapse={collapse}
                handleSignOut={handleSignOut}
              />
            )}
          </div>
        </MDBCollapse>
      </MDBNavbar>
    </>
  );
};

export default NavBar;
