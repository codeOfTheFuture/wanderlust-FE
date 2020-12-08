import React from "react";

import { MDBNavbarNav, MDBNavItem, MDBNavLink } from "mdbreact";

const NavBarRightLogin = (props) => {
  return (
    <>
      <MDBNavbarNav right>
        <MDBNavItem
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
            fontSize: "1.3rem",
            fontWeight: "400",
            marginTop: "0.5rem",
          }}
        >
          <a
            href='https://www.about-wanderlust.jeff-oliver.com'
            style={{ textDecoration: "none", color: "white" }}
          >
            About
          </a>
        </MDBNavItem>
        <MDBNavItem
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
            fontSize: "1.3rem",
            fontWeight: "400",
          }}
        >
          {props.location.pathname === "/signup" ? (
            <MDBNavLink to='/signin'>Sign In</MDBNavLink>
          ) : (
            <MDBNavLink to='/signup'>Sign Up</MDBNavLink>
          )}
        </MDBNavItem>
      </MDBNavbarNav>
    </>
  );
};

export default NavBarRightLogin;
