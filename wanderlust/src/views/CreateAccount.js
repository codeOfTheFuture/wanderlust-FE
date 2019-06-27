import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CreateAccountForm from '../components/CreatAccountForm';

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
} from 'mdbreact';
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';

import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
} from 'mdbreact';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
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
    return (
      <div>
        <MDBNavbar
          color='unique-color'
          fixed='top'
          dark
          expand='md'
          scrolling
          transparent
          style={{ boxShadow: 'none' }}>
          <MDBNavbarBrand href='/'>
            <strong style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              Wanderlust
            </strong>
          </MDBNavbarBrand>
          {!this.state.isWideEnough && (
            <MDBNavbarToggler onClick={this.onClick} />
          )}
          <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBNavbarNav right style={{}}>
              {!this.state.collapse ? (
                <MDBNavItem style={{ display: 'hide' }}>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret color='unique-color'>
                      {this.props.guide.username}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu color='unique-color'>
                      <MDBDropdownItem>My offered Tours</MDBDropdownItem>
                      <MDBDropdownItem>Settings</MDBDropdownItem>
                      <MDBDropdownItem>Logout</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              ) : (
                  <MDBNavItem
                    style={{
                      marginLeft: '1rem',
                      marginRight: '1rem',
                      fontSize: '1.3rem',
                      fontWeight: '400',
                    }}>
                    <MDBNavLink to='#'>My offered Tours</MDBNavLink>
                  </MDBNavItem>
                )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>

        <MDBView src='https://i.imgur.com/Khv7HRX.png'>
          <MDBMask
            overlay='black-light'
            className='flex-center flex-column text-white text-center'>
            <Route path="/create-account" render={(props) => <CreateAccountForm {...props} />
            } />
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mstp in createAccount', state)
  return {
    guide: state.userReducer.guide
  }
}

export default connect(mapStateToProps, {})(Settings)