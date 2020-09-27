import React, { Component } from "react";
import { connect } from "react-redux";
import EditDeleteTourCard from "./EditDeleteTourCard";
import { Route, Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import "./componentStyles/showTour.css";

class OfferedToursList extends Component {
  render() {
    if (this.props.offeredTours.length) {
      return (
        <div
          className='showTourList'
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {this.props.offeredTours.map((tour) => {
              return (
                <Route
                  path='/dashboard'
                  render={(props) => (
                    <EditDeleteTourCard
                      offeredTours={tour}
                      {...props}
                      key={tour.id}
                    />
                  )}
                />
              );
            })}
          </div>
          <div style={{ marginTop: "2em" }}>
            <Link to='/add-tour'>
              <MDBBtn color='blue'>Add Tour</MDBBtn>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            width: "500px",
            height: "100px",
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
            color: "black",
            fontSize: "2em",
          }}
        >
          <p>You have no offered tours</p>
          <Link to='/add-tour'>
            <MDBBtn color='blue'>Add Tour</MDBBtn>
          </Link>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log("state in offered tours: ", state);
  return {
    allTours: state.tourReducer.tours,
    currentUser: state.userReducer.currentUser,
  };
};

export default connect(mapStateToProps, {})(OfferedToursList);
