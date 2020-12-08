import React from "react";
import { MDBNavbarNav, MDBNavItem, MDBNavLink } from "mdbreact";

const NavBarRightLoggedOut = () => {
  return (
    <>
      <MDBNavbarNav right>
        <MDBNavItem
          style={{
            display: "flex",
            marginLeft: "1rem",
            marginRight: "1rem",
            fontSize: "1.3rem",
            fontWeight: "400",
          }}
        >
          <MDBNavLink to='/signin'>Sign In</MDBNavLink>
          <MDBNavLink to='/signup'>Sign Up</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    </>
  );
};

export default NavBarRightLoggedOut;
