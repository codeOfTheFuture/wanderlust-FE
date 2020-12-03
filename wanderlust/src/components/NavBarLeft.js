import React from "react";

import { MDBNavbarBrand } from "mdbreact";

const NavBarLeft = () => {
  return (
    <>
      <MDBNavbarBrand href='/explore-tours'>
        <strong style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Wanderlust
        </strong>
      </MDBNavbarBrand>
    </>
  );
};

export default NavBarLeft;
