import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signUp, getSingleUserById } from "../actions";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBAlert,
  MDBAnimation,
} from "mdbreact";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    error: false,
  };

  handleInputChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSignUp = (event, method) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signUp(method, { email, password }).then(() => {
      if (!this.props.signUpErr) {
        this.props.history.push("/create-account");
      } else {
        this.setState((state) => {
          return {
            ...state,
            error: true,
          };
        });
        setTimeout(() => {
          this.setState((state) => {
            return {
              ...state,
              error: false,
            };
          });
        }, 5000);
      }
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.error && (
            <MDBAnimation type='fadeIn fadeOut' delay='3s'>
              <MDBAlert color='danger' dismiss>
                {this.props.signUpErr.message}
              </MDBAlert>
            </MDBAnimation>
          )}
          <span className='h4 poppins-font main-color-blue'>
            Sign Up for Wanderlust
          </span>
        </div>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <form onSubmit={(event) => this.handleSignUp(event, "email")}>
                <div className='grey-text'>
                  <MDBInput
                    label='Email'
                    group
                    size='sm'
                    type='text'
                    validate
                    error='wrong'
                    success='right'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleInputChanges}
                    autoComplete='on'
                  />
                  <MDBInput
                    label='Password'
                    group
                    size='sm'
                    type='password'
                    validate
                    name='password'
                    value={this.state.password}
                    onChange={this.handleInputChanges}
                    autoComplete='on'
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MDBInput
                    label='Remember Me?'
                    type='checkbox'
                    id='checkbox2'
                    checked={this.state.isTourGuide}
                    onChange={this.checkedTourGuide}
                  />

                  <div className='text-center'>
                    <MDBBtn
                      size='md'
                      gradient='blue'
                      type='submit'
                      className='py-2 px-5'
                    >
                      Sign Up
                    </MDBBtn>
                  </div>
                </div>
              </form>
              <p className='text-center my-3'>or</p>
              <div style={{ display: "flex" }}>
                <MDBBtn
                  onClick={(event) => this.handleSignUp(event, "facebook")}
                  color='blue'
                  size='sm'
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MDBIcon fab icon='facebook' size='2x' className='px-2' />
                  Continue with Facebook
                </MDBBtn>
                <MDBBtn
                  onClick={(event) => this.handleSignUp(event, "google")}
                  color='red'
                  size='sm'
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MDBIcon fab icon='google' size='2x' className='px-2' />
                  Continue with Google
                </MDBBtn>
              </div>
              <div
                className='info'
                style={{ display: "flex", justifyContent: "center" }}
              >
                <span className='h9 poppins-font'>
                  Already have an account?{" "}
                  <strong className='main-color-blue linker'>
                    <Link exact to='/signin'>
                      Sign In
                    </Link>
                  </strong>
                </span>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    signUpErr: state.userReducer.signUpErr,
  };
};

export default connect(mapStateToProps, {
  signUp,
  getSingleUserById,
})(SignUp);
