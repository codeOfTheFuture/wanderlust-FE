import React from "react";

import {
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";

const NavBarCenter = () => {
  return (
    <div>
      <MDBNavbarNav>
        <MDBNavItem
          style={{
            margin: "0 1rem",
            fontSize: "1.3rem",
            fontWeight: "400",
          }}
        >
          <MDBNavLink to='#'>Popular</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem
          style={{
            margin: "0 1rem",

            fontSize: "1.3rem",
            fontWeight: "400",
          }}
        >
          <MDBNavLink to='#'>Deals</MDBNavLink>
        </MDBNavItem>

        <MDBNavItem
          style={{
            margin: "0 1rem",

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
    </div>
  );
};

export default NavBarCenter;
