import React from "react";
import "./Tour.css";
import { connect } from "react-redux";
import { getTourById, addTouristToTour } from "../../actions";
import { Redirect } from "react-router";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";
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

class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      currentUserID: "1",
      modal: false,
      collapse: false,
      isWideEnough: false,
      randomAvatarValue: 0,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggleAndBook = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.bookTour();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    this.props.getTourById(this.props.location.pathname.split("/")[2]);
    this.setState({ randomAvatarValue: Math.random() * 100 });
  }

  bookTour() {
    this.props.addTouristToTour(
      JSON.parse(localStorage.getItem("user")).touristid,
      this.props.location.pathname.split("/")[2]
    );
  }

  render() {
    if (!localStorage.getItem("firebase_jwt")) {
      return <Redirect to='/' />;
    }

    let { displayName, first_name, isTourGuide } = this.props.currentUser;
    if (!displayName) {
      displayName = first_name;
    }
    return (
      <div>
        <header className='tour-wrapper'>
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
                          {this.props.currentUser.first_name}
                        </span>
                      </MDBDropdownToggle>
                      {isTourGuide ? (
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
                          <MDBDropdownItem href='/logout'>
                            Logout
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      ) : (
                        <MDBDropdownMenu color='unique-color'>
                          <MDBDropdownItem href='/explore-tours'>
                            Explore Tours
                          </MDBDropdownItem>

                          <MDBDropdownItem href='/settings'>
                            Settings
                          </MDBDropdownItem>
                          <MDBDropdownItem href='/logout'>
                            Logout
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      )}
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
                    {isTourGuide ? (
                      <>
                        <MDBNavLink to='/dashboard'>
                          My offered Tours
                        </MDBNavLink>
                        <MDBNavLink to='/add-tour'>Add a Tour</MDBNavLink>
                        <MDBNavLink to='/settings'>Settings</MDBNavLink>
                        <MDBNavLink to='/logout'>Logout</MDBNavLink>
                      </>
                    ) : (
                      <>
                        <MDBNavLink to='/explore-tours'>
                          Explore Tours
                        </MDBNavLink>
                        <MDBNavLink to='/settings'>Settings</MDBNavLink>
                        <MDBNavLink to='logout'>Logout</MDBNavLink>
                      </>
                    )}
                  </MDBNavItem>
                )}
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          <MDBView src='/assets/newyorkcityskyline.jpg'>
            <MDBMask className='flex-center flex-column text-white text-center rgba-black-strong'>
              <div className='header-wrapper'>
                <div>
                  <div className='header-text-wrapper'>
                    <h1
                      className='header poppins-font'
                      style={{
                        fontSize: "7rem",
                        fontWeight: "bold",
                        paddingBottom: "0rem",
                      }}
                    >
                      {this.props.tourProps.tour.tourname}
                    </h1>
                  </div>
                  {/* <h2 className='sub-header poppins-font' style={{ fontSize: '2rem', fontWeight: 'bold', paddingBottom: "27rem" }}>{this.props.tourProps.tour.category}</h2> */}
                </div>
              </div>
            </MDBMask>
          </MDBView>
        </header>
        <div className='tour-information-wrapper'>
          <div className='tour-information-left'>
            <div className='info-wrapper'>
              <div className='info-symbol' />
              <div className='description-wrapper'>
                <div className='description-header'>About this tour</div>
                <span className='decent-text'>
                  {this.props.tourProps.tour.tourdescription}
                </span>
              </div>
            </div>
            <div className='clock-wrapper'>
              <div className='clock-symbol' />

              <span className='clock-text'>
                Duration {this.props.tourProps.tour.durationhrs} hours
              </span>
            </div>
            <div className='people-wrapper'>
              <div className='people-symbol' />
              <span className='people-text'>
                Recommended Age ({this.props.tourProps.tour.recommendedage}+)
              </span>
            </div>
            <div className='note-wrapper'>
              <div className='note-symbol' />
              <div>
                <span className='decent-text'>What to bring:</span>
                <ul className='decent-text'>
                  <li>{this.props.tourProps.tour.whattobring}</li>
                  <li>Bottles Water</li>
                  <li>Sunscreen</li>
                </ul>
              </div>
            </div>
            <div className='target-wrapper'>
              <div className='target-symbol' />
              <div>
                <div className='decent-text'>
                  Address
                  <br />
                  {this.props.tourProps.tour.meetingaddress}
                </div>
              </div>
            </div>
          </div>
          <div className='tour-information-right'>
            <div className='call-to-action'>
              <div className='price'>
                US$ {this.props.tourProps.tour.price} <br />
                <span className='price-tiny'>per person</span>
              </div>
              <div className='booking'>
                {isTourGuide ? (
                  <></>
                ) : (
                  <MDBContainer>
                    <MDBBtn
                      color='indigo'
                      onClick={this.toggleAndBook}
                      style={{ marginLeft: "0.5rem", marginTop: "3rem" }}
                    >
                      Book Now
                    </MDBBtn>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                      <MDBModalHeader
                        toggle={this.toggle}
                        style={{ border: "none" }}
                      ></MDBModalHeader>
                      <MDBModalBody
                        style={{
                          textAlign: "center",
                          paddingBottom: "4rem",
                          fontSize: "1.8rem",
                          color: "green",
                        }}
                      >
                        Your tour has been booked!
                      </MDBModalBody>
                    </MDBModal>
                  </MDBContainer>
                )}
              </div>
            </div>
            <div className='social-media-wrapper'>
              <div className='heart-symbol' />
              <div className='favorites'>Add to favorites</div>
            </div>
            <div
              className={
                this.state.randomAvatarValue > 50
                  ? "avatar_dracarys"
                  : "avatar_reeves"
              }
            />
            <span className='avatar-text'>Your Tour Guide</span>
            <div className='guide-info'>
              {/* {this.props.tourProps.tour.guide && (
                <span className='tiny'>
                  {this.props.tourProps.tour.guide.firstname}{" "}
                  {this.props.tourProps.tour.guide.lastname}
                </span>
              )}
              {this.props.tourProps.tour.guide && (
                <span className='tiny'>
                  {this.props.tourProps.tour.guide.email}
                </span>
              )}
              {this.props.tourProps.tour.guide && (
                <span className='tiny'>
                  {this.props.tourProps.tour.guide.phonenumber}
                </span>
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
  tourProps: state.tourReducer,
});

export default connect(mapStateToProps, { getTourById, addTouristToTour })(
  Tour
);
