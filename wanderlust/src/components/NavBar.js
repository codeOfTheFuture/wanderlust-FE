import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBarCenter from "./NavBarCenter";
import NavBarLeft from "./NavBarLeft";
import NavBarRight from "./NavBarRight";
import firebase from "firebase/app";

import { MDBNavbar, MDBNavbarToggler, MDBCollapse } from "mdbreact";

const NavBar = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("firebase_jwt");
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push("/signin");
      });
  };

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const onClick = () => {
    setCollapse((state) => !state);
  };

  console.log("current location", props.history.location);
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
          <div>
            {props.history.location.pathname === "/explore-tours" && (
              <NavBarCenter />
            )}
          </div>
          <div>
            <NavBarRight
              {...props}
              collapse={collapse}
              handleSignOut={handleSignOut}
              currentUser={currentUser}
            />
          </div>
        </MDBCollapse>
      </MDBNavbar>
    </>
  );
};

export default NavBar;
