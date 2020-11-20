import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllTours, getSingleUserById } from "../actions";
import NavBar from "../components/NavBar";
import ShowTourList from "../components/ShowTourList";
// import { Redirect } from "react-router";
import "./explore-tours.css";
import firebase from "firebase/app";

import { MDBContainer, MDBMask, MDBView } from "mdbreact";

class ExploreTours extends Component {
  constructor() {
    super();
    this.state = {
      selected: "",
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  componentDidMount() {
    this.props.getSingleUserById();
    this.props.getAllTours();
    /* console.log('These are all the tours: ', tours); */
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setSelected(searchTerm) {
    this.setState({
      selected: searchTerm,
    });
  }

  handleSignOut = () => {
    localStorage.removeItem("firebase_jwt");
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push("/signin");
      });
  };

  render() {
    let { displayName, first_name } = this.props.currentUser;
    if (!displayName) displayName = first_name;
    return (
      <div>
        <header>
          <NavBar handleSignOut={this.handleSignOut} />

          <MDBView src='https://i.imgur.com/eAs1xr6.png'>
            <MDBMask
              overlay='black-strong'
              className='flex-center flex-column text-white text-center'
            >
              <h2
                className='poppins-font'
                style={{ fontSize: "6rem", fontWeight: "bold" }}
              >
                TRAVEL THE WORLD
              </h2>
              <h5>
                There was never a better time in history to explore the world
                than today!
              </h5>
            </MDBMask>
          </MDBView>
        </header>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "10rem",
            position: "absolute",
            bottom: "-2.7rem",
            marginLeft: "20%",
          }}
        >
          <input
            type='text'
            style={{ padding: "2rem", width: "60vw", outline: "none" }}
            maxLength='50'
            value={this.state.selected}
            name='selected'
            onChange={this.handleInput}
            autoComplete='on'
          ></input>
          <button
            className='search-button'
            style={{ position: "absolute", right: "2rem", bottom: "1.3rem" }}
          >
            Search
          </button>
        </div>
        <main>
          <h2
            style={{
              marginLeft: "20%",
              marginTop: "4rem",
              fontSize: "1.3rem",
              fontWeight: "bold",
            }}
          >
            Popular tours
          </h2>
          <MDBContainer className='text-center my-5'>
            <div className='allToursWrapper'>
              <ShowTourList
                allTours={
                  this.state.selected.length === 0
                    ? this.props.tourProps
                    : this.props.tourProps.filter(
                        (tour) =>
                          tour.tourname
                            .toLowerCase()
                            .includes(this.state.selected.toLowerCase()) ||
                          tour.tourdescription
                            .toLowerCase()
                            .includes(this.state.selected.toLowerCase())
                      )
                }
              />
            </div>
          </MDBContainer>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
  tourProps: state.tourReducer.tours,
});

export default connect(mapStateToProps, { getAllTours, getSingleUserById })(
  ExploreTours
);
