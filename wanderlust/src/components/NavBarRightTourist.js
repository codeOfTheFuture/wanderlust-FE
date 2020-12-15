import React from "react";
import { useSelector } from "react-redux";

import {
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
} from "mdbreact";

const NavBarRightTourist = (props) => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const { collapse, handleSignOut } = props;

  return (
    <>
      <MDBNavbarNav right>
        {!collapse ? (
          <MDBNavItem style={{ display: "hide" }}>
            <MDBDropdown>
              <MDBDropdownToggle nav caret color='unique-color'>
                <img
                  src={currentUser.photoURL}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "0.3rem",
                  }}
                  alt='Profile Photo'
                />
                <span
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "400",
                    marginRight: "0.3rem",
                  }}
                >
                  {currentUser.displayName}
                </span>
              </MDBDropdownToggle>
              <MDBDropdownMenu color='unique-color'>
                <MDBNavLink to='/dashboard'>
                  <MDBDropdownItem>My Booked Tours</MDBDropdownItem>
                </MDBNavLink>
                <MDBNavLink to='/explore-tours'>
                  <MDBDropdownItem>Explore Tours</MDBDropdownItem>
                </MDBNavLink>
                <MDBNavLink to='/settings'>
                  <MDBDropdownItem>Settings</MDBDropdownItem>
                </MDBNavLink>
                <MDBNavLink to='/logout'>
                  <MDBDropdownItem onclick={handleSignOut}>
                    Logout
                  </MDBDropdownItem>
                </MDBNavLink>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        ) : (
          <MDBNavItem
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              fontSize: "1.3rem",
              fontWeight: "400",
            }}
          ></MDBNavItem>
        )}
      </MDBNavbarNav>
    </>
  );
};

export default NavBarRightTourist;
