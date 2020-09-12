import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import CreateAccountForm from "../components/CreatAccountForm";

import { MDBMask, MDBView } from "mdbreact";

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
    };
  }

  render() {
    if (localStorage.getItem("firebase_jwt") === null) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <NavBar />
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
