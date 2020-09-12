import React, { useState } from "react";
import { connect } from "react-redux";

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
  const { isTourGuide, first_name } = props.currentUser;

  const onClick = () => {
    setCollapse(!collapse);
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
          <MDBNavbarNav right style={{}}>
            {!collapse ? (
              <MDBNavItem style={{ display: "hide" }}>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret color='unique-color'>
                    <span style={{ fontSize: "1.3rem" }}>{first_name}</span>
                  </MDBDropdownToggle>
                  {isTourGuide ? (
                    <MDBDropdownMenu color='unique-color'>
                      <MDBDropdownItem href='/dashboard'>
                        My offered Tours
                      </MDBDropdownItem>
                      <MDBDropdownItem href='/add-tour'>
                        Add a Tour
                      </MDBDropdownItem>
                      <MDBDropdownItem href='/settings'>
                        Settings
                      </MDBDropdownItem>
                      <MDBDropdownItem href='/logout'>Logout</MDBDropdownItem>
                    </MDBDropdownMenu>
                  ) : (
                    <MDBDropdownMenu color='unique-color'>
                      <MDBDropdownItem href='/explore-tours'>
                        Explore Tours
                      </MDBDropdownItem>
                      <MDBDropdownItem href='/settings'>
                        Settings
                      </MDBDropdownItem>
                      <MDBDropdownItem href='/logout'>Logout</MDBDropdownItem>
                    </MDBDropdownMenu>
                  )}
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
                {isTourGuide ? (
                  <>
                    <MDBNavLink to='/dashboard'>My offered Tours</MDBNavLink>
                    <MDBNavLink to='/add-tour'>Add a Tour</MDBNavLink>
                    <MDBNavLink to='/settings'>Settings</MDBNavLink>
                    <MDBNavLink to='/logout'>Logout</MDBNavLink>
                  </>
                ) : (
                  <>
                    <MDBNavLink to='/explore-tours'>Explore Tours</MDBNavLink>
                    <MDBNavLink to='/settings'>Settings</MDBNavLink>
                    <MDBNavLink to='logout'>Logout</MDBNavLink>
                  </>
                )}
              </MDBNavItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allTours: state.tourReducer.tours,
    currentUser: state.userReducer.currentUser,
  };
};

export default connect(mapStateToProps, {})(NavBar);
