import React from "react";

import {
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
} from "mdbreact";

const NavBarRight = (props) => {
  console.log("nav right>>>", props.history.location);
  const loc = props.history.location.pathname;
  const { collapse, handleSignOut, currentUser } = props;

  if (loc === "/signin" || loc === "/signup") {
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
  } else if (!currentUser === {}) {
    if (currentUser.isTourGuide) {
      return (
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
                  <MDBDropdownItem href='/dashboard'>
                    My offered Tours
                  </MDBDropdownItem>
                  <MDBDropdownItem href='/add-tour'>Add a Tour</MDBDropdownItem>
                  <MDBDropdownItem href='/settings'>Settings</MDBDropdownItem>
                  <MDBDropdownItem href='/logout' onclick={handleSignOut}>
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
            ></MDBNavItem>
          )}
        </MDBNavbarNav>
      );
    } else {
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
                    <MDBDropdownItem href='/dashboard'>
                      My Booked Tours
                    </MDBDropdownItem>
                    <MDBDropdownItem href='/explore-tours'>
                      Explore Tours
                    </MDBDropdownItem>
                    <MDBDropdownItem href='/settings'>Settings</MDBDropdownItem>
                    <MDBDropdownItem href='/logout' onclick={handleSignOut}>
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
              ></MDBNavItem>
            )}
          </MDBNavbarNav>
        </>
      );
    }
  } else {
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
  }
};

export default NavBarRight;
