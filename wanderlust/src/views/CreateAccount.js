import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CreateAccountForm from "../components/CreatAccountForm";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBMask,
  MDBView,
} from "mdbreact";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";

import { Redirect } from "react-router";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     username: this.props.guide.username
  //   })
  // }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    if (localStorage.getItem("firebase_jwt") === null) {
      return <Redirect to='/' />;
    }
    return (
      <div>
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
          {!this.state.isWideEnough && (
            <MDBNavbarToggler onClick={this.onClick} />
          )}
          <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBNavbarNav right style={{}}>
              {!this.state.collapse ? (
                <MDBNavItem style={{ display: "hide" }}>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret color='unique-color'>
                      <span style={{ fontSize: "1.3rem" }}>
                        {/* {JSON.parse(localStorage.getItem("user")).firstname} */}
                      </span>
                    </MDBDropdownToggle>
                    {/* {JSON.parse(localStorage.getItem("user")).istourguide ? ( */}
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
                    )
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
                  {/* {JSON.parse(localStorage.getItem("user")).istourguide ? ( */}
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
                </MDBNavItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>

        <MDBView src='https://i.imgur.com/Khv7HRX.png'>
          <MDBMask
            overlay='black-light'
            className='flex-center flex-column text-white text-center'
          >
            <Route
              path='/create-account'
              render={(props) => <CreateAccountForm {...props} />}
            />
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mstp in createAccount", state);
  return {
    // guide: state.userReducer.guide,
  };
};

export default connect(mapStateToProps, {})(Settings);
