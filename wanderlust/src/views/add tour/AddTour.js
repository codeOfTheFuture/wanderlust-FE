import React, { Component } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { addTour, getSingleUserById } from "../../actions";
import NavBar from "../../components/NavBar";
import Map from "../../components/Map";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./AddTour.css";

import { MDBContainer, MDBMask, MDBView, MDBAutocomplete } from "mdbreact";
import { MDBSelect, MDBInput } from "mdbreact";

import { MDBModal, MDBModalBody, MDBModalHeader, MDBBtn } from "mdbreact";
// import { LoadScript } from "@react-google-maps/api";

class AddTour extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      tourTitle: "",
      tourCategory: "",
      tourDescription: "",
      tourguidephonenumber: "",
      tourLength: null,
      recommendedAge: "",
      whatTheyShouldBring: "",
      tourAddress: "",
      tourPrice: 0,
      lat: 40.7128,
      lng: -74.006,
      mapRef: {},
      options: [
        {
          text: "All Ages",
          value: "allAges",
        },
        {
          text: "13 Yrs +",
          value: "13Yrs+",
        },
        {
          text: "18 Yrs +",
          value: "18Yrs+",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.getSingleUserById();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  redirectDashBoard() {
    this.props.history.push("/dashboard");
  }

  handleInputChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Handle recommended age select
  handleSelect = (value) => {
    this.setState((state) => {
      return {
        ...state,
        recommendedAge: value[0],
      };
    });
  };

  addTour = (e) => {
    e.preventDefault();
    this.props.addTour({
      tourname: this.state.tourTitle,
      category: this.state.tourCategory,
      tourdescription: this.state.tourDescription,
      tourguidephonenumber: this.state.tourguidephonenumber,
      recommendedage: this.state.recommendedAge,
      durationhrs: this.state.tourLength,
      price: this.state.tourPrice,
      whattobring: this.state.whatTheyShouldBring,
      meetingaddress: this.state.tourAddress,
    });

    this.redirectDashBoard();
  };

  handPlaceSelected = (place) => {
    console.log(place);
  };

  getMapRef = (mapRef) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        mapRef: mapRef,
      };
    });
  };

  setLatLng = (lat, lng) => {
    if ((lat, lng))
      this.setState((prevState) => {
        return {
          ...prevState,
          lat,
          lng,
        };
      });

    this.state.mapRef.current.panTo({ lat, lng });
    this.state.mapRef.current.setZoom(14);
  };

  render() {
    return (
      <div>
        <header className='addTourHeader'>
          <NavBar {...this.props} currentUser={this.props.currentUser} />
          <MDBView src='/assets/mapwithcamera.jpg' className='d-flex h-100'>
            <MDBMask className='flex-center flex-column text-white text-center rgba-black-strong'>
              <h2
                className='poppins-font'
                style={{
                  fontSize: "6rem",
                  fontWeight: "bold",
                  marginTop: "5rem",
                }}
              >
                ADD A TOUR
              </h2>
              <h5 style={{ paddingBottom: "1rem" }}>
                Fill out the form to create a new tour thus enriching the life
                of hundreds of people!
              </h5>
              <div className='addTourWrapper'>
                <div className='tourTitleWrapper'>
                  <div className='tourTitle md-outline md-form form-lg'>
                    <MDBInput
                      label='Title'
                      className='title form-control'
                      size='lg'
                      id='title'
                      type='text'
                      name='tourTitle'
                      maxLength='35'
                      value={this.state.tourTitle}
                      onChange={this.handleInputChanges}
                      style={
                        {
                          // outline: "none",
                          // border: "none",
                          // fontSize: "2rem",
                        }
                      }
                    />
                  </div>
                </div>
              </div>
            </MDBMask>
          </MDBView>
        </header>
        <MDBContainer
          className='text-center d-flex'
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: "500px",
          }}
        >
          <div className='mapWrapper w-100' style={{ margin: "0 3rem" }}>
            <h2>Map</h2>
            <div
              className='map'
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              <Map
                google={this.props.google}
                center={{ lat: this.state.lat, lng: this.state.lng }}
                height='500px'
                zoom={12}
                lat={this.state.lat}
                lng={this.state.lng}
                getMapRef={this.getMapRef}
              />
            </div>
          </div>
          <div className='addTourAboutWrapper'>
            <div className='addTourAbout'>
              <h2
                style={{
                  textAlign: "left",
                  width: "60%",
                  marginLeft: "3rem",
                }}
              >
                About this tour
              </h2>
              <form onSubmit={this.addTour} className='d-flex flex-column'>
                <div className='d-flex'>
                  <div className='d-flex flex-column'>
                    <div className='info'>
                      <i className='infoSymbol'></i>
                      <textarea
                        className='tourDescription'
                        name='tourDescription'
                        value={this.state.tourDescription}
                        placeholder='Tour description'
                        onChange={this.handleInputChanges}
                        cols='40'
                        rows='5'
                      >
                        Description
                      </textarea>
                    </div>
                    <div className='clock'>
                      <i className='clockSymbol'></i>
                      <input
                        className='tourLength'
                        type='number'
                        placeholder='How long is it'
                        name='tourLength'
                        value={this.state.tourLength}
                        onChange={this.handleInputChanges}
                      />
                    </div>
                    <div className='people'>
                      <i className='peopleSymbol'></i>
                      <MDBSelect
                        required
                        getValue={this.handleSelect}
                        options={this.state.options}
                        selected='Recommended Age'
                        color='primary'
                        className='form-control'
                        style={{
                          backgroundColor: "#F2F2F2",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "50px",
                          width: "100%",
                          padding: "1rem 0.5rem",
                        }}
                      />
                    </div>
                    <div className='note'>
                      <i className='noteSymbol'></i>
                      <textarea
                        className='itemsToBring'
                        name='whatTheyShouldBring'
                        value={this.state.whatTheyShouldBring}
                        placeholder='What should tourists bring with them?'
                        onChange={this.handleInputChanges}
                        cols='40'
                        rows='5'
                      >
                        What should they bring
                      </textarea>
                    </div>
                    <div className='target'>
                      <i className='targetSymbol'></i>
                      {/* <input
                        className='tourAddress'
                        // type='text'
                        // placeholder='What is the address'
                        name='tourAddress'
                        // onPlaceSelected={this.handPlaceSelected}
                        // types={["(regions)"]}
                        value={this.state.tourAddress}
                        onChange={this.handleInputChanges}
                      /> */}
                      <Search setLatLng={this.setLatLng} />
                    </div>
                    <div></div>
                    {/* <MDBContainer style={{ marginLeft: "1.5rem" }}>
                      {/* <button className="btnCancel"  onClick={() => this.redirectDashBoard()}>Cancel</button> */}
                    {/* </MDBContainer>  */}
                    {/* <button className="btnAddTour" type='submit'>Add Tour</button> */}
                  </div>
                  <div>
                    <div className='tourPriceWrapper'>
                      <div className='tourPrice border-bottom border-light pb-4'>
                        <div>
                          <strong
                            className='d-flex px-3'
                            style={{ fontSize: "1.5em", fontWeight: "bold" }}
                          >
                            US${" "}
                          </strong>
                        </div>
                        <NumberFormat
                          thousandSeparator={true}
                          allowNegative={false}
                          allowEmptyFormatting={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          className='tourPriceInput py-3'
                          value={this.state.tourPrice}
                          style={{ color: "black", width: "6rem" }}
                          onValueChange={(values) => {
                            const { value } = values;
                            this.setState((state) => {
                              return {
                                ...state,
                                tourPrice: value,
                              };
                            });
                          }}
                        />
                        &nbsp;
                        <div style={{ fontWeight: 500, textAlign: "left" }}>
                          per person
                        </div>
                      </div>
                    </div>
                    <div className='profileImgWrapper d-flex pl-5'>
                      <div className='guideImage'></div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MDBBtn
                    className='btnAddTour'
                    gradient='blue'
                    type='submit'
                    onClick={this.toggle}
                    // style={{ width: "10rem", height: "3rem" }}
                  >
                    Save
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
                      Your tour is now published!
                    </MDBModalBody>
                  </MDBModal>
                  <MDBBtn
                    className='btnCancel'
                    // style={{
                    //   width: "2rem",
                    //   marginLeft: "0",
                    //   height: "3rem",
                    // }}
                    color='dark'
                    type='submit'
                    onClick={() => this.redirectDashBoard()}
                  >
                    Go Back
                  </MDBBtn>
                </div>
              </form>
            </div>
          </div>
        </MDBContainer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allTours: state.tourReducer.tours,
    currentUser: state.userReducer.currentUser,
  };
};

export default connect(mapStateToProps, {
  addTour,
  getSingleUserById,
  // setLatLong,
})(AddTour);

function Search({ setLatLng }) {
  // const [libraries] = useState(["places"]);
  const {
    // ready,
    value,
    suggestions: { data },
    setValue,
    // clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const logValue = (val) => {
    console.log("val", val);

    setValue(val, true);
    console.log("value", value);
    let x = data.map((item) => item.description);
    console.log("description", x);

    async function onPlaceSelected(address) {
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        console.log("lat, lng", lat, lng);
        setLatLng(lat, lng);
      } catch (error) {
        console.log("error!", error);
      }
    }
    onPlaceSelected(x[0]);
  };

  return (
    <div className='w-100'>
      <MDBAutocomplete
        clear
        data={data.map((item) => item.description)}
        label='Tour Address'
        id='tourAddress'
        getValue={logValue}
        className='address'
        style={{ wordWrap: "" }}
      />
    </div>
  );
}
