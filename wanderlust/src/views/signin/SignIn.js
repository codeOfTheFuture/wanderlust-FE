import React from "react";
import SignIn from "../../components/SignIn";
import Navbar from "../../components/NavBar";
import { Route } from "react-router-dom";
import {
  MDBMask,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
} from "mdbreact";

import "../../App.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  render() {
    return (
      <div>
        <header>
          <Navbar {...this.props} />
          {/* <MDBNavbar
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
            {!this.state.isWideEnough && (
              <MDBNavbarToggler onClick={this.onClick} />
            )}
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav right style={{}}>
                <MDBNavItem
                  style={{
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    fontSize: "1.1rem",
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
                    fontSize: "1.1rem",
                    fontWeight: "400",
                  }}
                >
                  {this.props.location.pathname === "/signup" ? (
                    <MDBNavLink to='/'>Sign In</MDBNavLink>
                  ) : (
                    <MDBNavLink to='/signup'>Sign Up</MDBNavLink>
                  )}
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar> */}
        </header>
        <MDBView src='https://i.imgur.com/4ox5JIo.png'>
          <MDBMask
            overlay='black-light'
            className='flex-center flex-column text-white text-center'
          >
            <div className='mountain-background-card'>
              <MDBCol style={{ maxWidth: "30rem" }}>
                <MDBCard
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50%",
                    marginLeft: "25rem",
                    padding: "2rem",
                    width: "35rem",
                  }}
                >
                  <MDBCardBody>
                    <MDBCardText>
                      <Route
                        path='/signin'
                        render={(props) => <SignIn {...props} />}
                      />
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </div>
          </MDBMask>
        </MDBView>
        {/* <footer>@copy; Wanderlust 2019</footer> */}
      </div>
    );
  }
}

export default Home;
