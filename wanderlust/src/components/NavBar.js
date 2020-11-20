import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";

const NavBar = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough, setIsWideEnough] = useState(false);

  const { handleSignOut } = props;

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const onClick = () => {
    setCollapse((state) => !state);
  };

  return (
    <>
      <MDBNavbar
        color='unique-color'
        fixed='top'
        dark
        expand='md'
        scrolling
        transparent
        style={{ boxShadow: "none" }}
      >
        <MDBNavbarBrand href='/'>
          <strong style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Wanderlust
          </strong>
        </MDBNavbarBrand>
        {!isWideEnough && <MDBNavbarToggler onClick={onClick} />}
        <MDBCollapse isOpen={collapse} navbar>
          {/* This part can be used for the explore-page */}
          <MDBNavbarNav left style={{ marginLeft: "35%" }}>
            <MDBNavItem
              style={{
                marginLeft: "1rem",
                marginRight: "1rem",
                fontSize: "1.3rem",
                fontWeight: "400",
              }}
            >
              <MDBNavLink to='#'>Popular</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem
              style={{
                marginLeft: "1rem",
                marginRight: "1rem",
                fontSize: "1.3rem",
                fontWeight: "400",
              }}
            >
              <MDBNavLink to='#'>Deals</MDBNavLink>
            </MDBNavItem>

            <MDBNavItem
              style={{
                marginLeft: "1rem",
                marginRight: "1rem",
                fontSize: "1.3rem",
                fontWeight: "400",
              }}
            >
              <MDBDropdown>
                <MDBDropdownToggle nav caret color='unique-color'>
                  Categories
                </MDBDropdownToggle>
                <MDBDropdownMenu color='unique-color'>
                  <MDBDropdownItem>Walking</MDBDropdownItem>
                  <MDBDropdownItem>Bus</MDBDropdownItem>
                  <MDBDropdownItem>Boat</MDBDropdownItem>
                  <MDBDropdownItem>Helicopter</MDBDropdownItem>
                  <MDBDropdownItem>City</MDBDropdownItem>
                  <MDBDropdownItem>Mountains</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right style={{}}>
            {localStorage.getItem("firebase_jwt") ? (
              !collapse ? (
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
                    {/* {JSON.parse(localStorage.getItem("user")).istourguide ? <MDBDropdownMenu color='unique-color'>
                        <MDBDropdownItem href="/dashboard">My offered Tours</MDBDropdownItem>
                        <MDBDropdownItem href="/add-tour">Add a Tour</MDBDropdownItem>
                        <MDBDropdownItem href="/settings">Settings</MDBDropdownItem>
                        <MDBDropdownItem href="/logout">Logout</MDBDropdownItem>
                      </MDBDropdownMenu> : */}{" "}
                    <MDBDropdownMenu color='unique-color'>
                      <MDBDropdownItem href='/explore-tours'>
                        Explore Tours
                      </MDBDropdownItem>

                      <MDBDropdownItem href='/settings'>
                        Settings
                      </MDBDropdownItem>
                      <MDBDropdownItem to='/logout' onClick={handleSignOut}>
                        Logout
                      </MDBDropdownItem>
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
                >
                  {/* {JSON.parse(localStorage.getItem("user")).istourguide ? (
                      <>
                        <MDBNavLink to='/dashboard'>
                          My offered Tours
                        </MDBNavLink>
                        <MDBNavLink to='/add-tour'>Add a Tour</MDBNavLink>
                        <MDBNavLink to='/settings'>Settings</MDBNavLink>
                        <MDBNavLink to='/logout'>Logout</MDBNavLink>
                      </>
                    ) : ( */}
                  <>
                    <MDBNavLink to='/explore-tours'>Explore Tours</MDBNavLink>
                    <MDBNavLink to='/settings'>Settings</MDBNavLink>
                    <MDBNavLink to='/logout' onClick={() => handleSignOut()}>
                      Logout
                    </MDBNavLink>
                  </>
                  )
                </MDBNavItem>
              )
            ) : (
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
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </>
  );
};

export default NavBar;
