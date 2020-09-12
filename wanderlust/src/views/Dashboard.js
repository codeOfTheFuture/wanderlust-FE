import React from "react";

import { MDBContainer, MDBMask, MDBView } from "mdbreact";
import "./Dashboard.css";

import NavBar from "../components/NavBar";
import OfferedToursList from "../components/OfferedToursList";
import {
  getAllTours,
  getSingleUserById,
  getSingleGuidesTours,
} from "../actions";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getSingleUserById();
    this.props.getSingleGuidesTours();
  }

  render() {
    return (
      <div>
        <header className='dashboardHeader'>
          <NavBar />
          <MDBView src='/assets/mountains2.png' className='background'>
            <MDBMask className='flex-center flex-column text-white text-center rgba-black-strong'>
              {this.props.currentUser.first_name && (
                <h2
                  className='poppins-font'
                  style={{ fontSize: "6rem", fontWeight: "bold" }}
                >
                  Hi {this.props.currentUser.first_name}
                </h2>
              )}
              <h3>Tours Dashboard</h3>
            </MDBMask>
          </MDBView>
        </header>

        <main>
          <h2
            style={{
              marginLeft: "20%",
              marginTop: "4rem",
              fontSize: "1.3rem",
              fontWeight: "bold",
            }}
          >
            Your Tour Offers
          </h2>
          <MDBContainer className='text-center my-5'>
            <div className='allToursWrapper'>
              {this.props.currentUser.offeredTours && (
                <Route
                  path='/dashboard'
                  render={(props) => (
                    <OfferedToursList
                      {...props}
                      offeredTours={this.props.currentUser.offeredTours}
                    />
                  )}
                />
              )}
            </div>
          </MDBContainer>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tourProps: state.tourReducer.tours,
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, {
  getAllTours,
  getSingleUserById,
  getSingleGuidesTours,
})(Dashboard);
