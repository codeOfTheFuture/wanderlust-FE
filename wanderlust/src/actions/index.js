import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";

// Sign Up Action Creator
export const SIGNUP_FETCHING = "SIGNUP_FETCHING";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const signUp = (method, accountData) => {
  return async (dispatch, getState, { getFirebase }) => {
    loadProgressBar();
    dispatch({ type: SIGNUP_FETCHING });
    const firebase = getFirebase();
    let provider;

    try {
      let user;
      // Sign up with email and password
      if (method === "email") {
        const { email, password } = accountData;
        user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        if (!user.additionalUserInfo.isNewUser) {
          await firebase.auth().signOut();
          console.log("facebook auth>>>>>", "account already exists");
          throw new Error("Account Already Exists - Please Sign In");
        }
      } else if (method === "facebook") {
        // Sign up with Facebook
        provider = await new firebase.auth.FacebookAuthProvider();

        user = await firebase.auth().signInWithPopup(provider);

        if (!user.additionalUserInfo.isNewUser) {
          await firebase.auth().signOut();
          console.log("facebook auth>>>>>", "account already exists");
          throw new Error("Account Already Exists - Please Sign In");
        }
      } else {
        // Sign up with Google
        provider = await new firebase.auth.GoogleAuthProvider();

        user = await firebase.auth().signInWithPopup(provider);

        console.log("user>>>>", user);

        if (!user.additionalUserInfo.isNewUser) {
          await firebase.auth().signOut();
          console.log("facebook auth>>>>>", "account already exists");
          throw new Error("Account Already Exists - Please Sign In");
        }
      }

      const { displayName, phoneNumber, photoURL } = user.user;
      const { creationTime, lastSignInTime } = user.user.metadata;

      const userInfo = {
        displayName,
        phoneNumber,
        photoURL,
        creationTime,
        lastSignInTime,
      };

      const idToken = await firebase.auth().currentUser.getIdToken(true);

      localStorage.setItem("firebase_jwt", idToken);

      const newUser = await axios.post(
        "https://wanderlust-nodejs-be.herokuapp.com/api/auth/register",
        // "http://localhost:4000/api/auth/register",
        { userInfo },
        {
          headers: {
            Authorization: idToken,
          },
        }
      );

      console.log("new user>>>>>>", newUser.data);
      dispatch({ type: SIGNUP_SUCCESS, payload: newUser.data });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error });
    }
  };
};

// Sign In Action Creator
export const SIGNIN_FETCHING = "SIGNIN_FETCHING";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";

export const signIn = (method, credentials) => {
  return async (dispatch, getState, { getFirebase }) => {
    loadProgressBar();
    dispatch({ type: SIGNIN_FETCHING });
    const firebase = getFirebase();
    let provider;

    try {
      let user;
      // Sign in with Email
      if (method === "email") {
        const { email, password } = credentials;
        user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
      } else if (method === "facebook") {
        // Sign in with Facebook
        provider = await new firebase.auth.FacebookAuthProvider();

        user = await firebase.auth().signInWithPopup(provider);

        if (user.additionalUserInfo.isNewUser) {
          console.log("sign in error");
          user = await firebase().auth().currentUser;
          await user.delete();
          throw new Error({ message: "Please Sign Up!" });
        }
      } else {
        // Sign in with Google
        provider = await new firebase.auth.GoogleAuthProvider();

        user = await firebase.auth().signInWithPopup(provider);
        console.log("sign in user>>>>>>>>", user);
        if (user.additionalUserInfo.isNewUser) {
          console.log("sign in error");
          await firebase().auth().currentUser.delete();
          throw new Error({ message: "Please Sign Up!" });
        }
      }
      const idToken = await firebase.auth().currentUser.getIdToken(true);

      localStorage.setItem("firebase_jwt", idToken);

      user = await axios.post(
        "https://wanderlust-nodejs-be.herokuapp.com/api/auth/login",
        // "http://localhost:4000/api/auth/login",
        {},
        {
          headers: {
            Authorization: idToken,
          },
        }
      );
      console.log("sign in>>>>>>", user);
      dispatch({ type: SIGNIN_SUCCESS, payload: user.data });
    } catch (error) {
      dispatch({ type: SIGNIN_FAILURE, payload: error });
    }
  };
};

// Get a user by id action creator
export const GET_SINGLE_USER_FETCHING = "GET_SINGLE_USER_FETCHING";
export const GET_SINGLE_USER_SUCCESS = "GET_SINGLE_USER_SUCCESS";
export const GET_SINGLE_USER_FAILURE = "GET_SINGLE_USER_FAILURE";

export const getSingleUserById = () => {
  return async (dispatch) => {
    loadProgressBar();
    dispatch({ type: GET_SINGLE_USER_FETCHING });
    const idToken = localStorage.getItem("firebase_jwt");
    try {
      const user = await axios.get(
        "https://wanderlust-nodejs-be.herokuapp.com/api/users/userId",
        // "http://localhost:4000/api/users/userId",
        {
          headers: {
            Authorization: idToken,
          },
        }
      );

      console.log("Get single user by id: ", user);
      dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: user.data });
    } catch (error) {
      console.log("Get single user by id: ", error.response);
      dispatch({ type: GET_SINGLE_USER_FAILURE, payload: error.response });
    }
  };
};

// Update User Info by id
export const UPDATE_USER_INFO_FETCHING = "UPDATE_USER_INFO_FETCHING";
export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FAILURE = "UPDATE_USER_INFO_FAILURE";

export const updateUserById = (userData) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({ type: UPDATE_USER_INFO_FETCHING });
    loadProgressBar();

    try {
      const idToken = localStorage.getItem("firebase_jwt");

      const updatedUser = await axios.put(
        "https://wanderlust-nodejs-be.herokuapp.com/api/users/update/user",
        // "http://localhost:4000/api/users/update/user",
        userData,
        {
          headers: {
            Authorization: idToken,
          },
        }
      );

      dispatch({ type: UPDATE_USER_INFO_SUCCESS, payload: updatedUser });
      console.log("updatedUser in actions>>>", updatedUser);
    } catch (error) {
      dispatch({ type: UPDATE_USER_INFO_FAILURE, payload: error });
    }
  };
};

// Tours

// Get all tours
export const FETCHING_TOURS_START = "FETCH_TOURS_START";
export const FETCHING_TOURS_SUCCESS = "FETCHING_TOURS_SUCCESS";
export const FETCHING_TOURS_FAILURE = "FETCHING_TOURS_FAILURE";

export const getAllTours = () => (dispatch) => {
  dispatch({ type: FETCHING_TOURS_START });
  loadProgressBar();

  const idToken = localStorage.getItem("firebase_jwt");

  axios
    .get(
      "https://wanderlust-nodejs-be.herokuapp.com/api/tours",
      // "http://localhost:4000/api/tours",
      {
        headers: {
          Authorization: idToken,
        },
      }
    )
    .then((res) => {
      console.log("Get all tours: ", res.data);
      dispatch({ type: FETCHING_TOURS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log("Get all tours err: ", err);
      dispatch({ type: FETCHING_TOURS_FAILURE, payload: err });
    });
};

// Get all of a single guides offered tours
export const FETCHING_OFFERED_TOURS_START = "FETCH_OFFERED_TOURS_START";
export const FETCHING_OFFERED_TOURS_SUCCESS = "FETCHING_OFFERED_TOURS_SUCCESS";
export const FETCHING_OFFERED_TOURS_FAILURE = "FETCHING_OFFERED_TOURS_FAILURE";

export const getSingleGuidesTours = () => {
  return async (dispatch) => {
    dispatch({ type: FETCHING_OFFERED_TOURS_START });
    loadProgressBar();

    const idToken = localStorage.getItem("firebase_jwt");
    try {
      const tours = await axios.get(
        "https://wanderlust-nodejs-be.herokuapp.com/api/users/offered-tours",
        // "http://localhost:4000/api/users/offered-tours",
        {
          headers: {
            Authorization: idToken,
          },
        }
      );
      dispatch({ type: FETCHING_OFFERED_TOURS_SUCCESS, payload: tours.data });
    } catch (error) {
      dispatch({ type: FETCHING_OFFERED_TOURS_FAILURE, payload: error });
    }
  };
};

// Get single tours by id
export const FETCHING_SINGLETOUR_START = "FETCH_SINGLETOUR_START";
export const FETCHING_SINGLETOUR_SUCCESS = "FETCHING_SINGLETOUR_SUCCESS";
export const FETCHING_SINGLETOUR_FAILURE = "FETCHING_SINGLETOUR_FAILURE";

export const getTourById = (id) => (dispatch) => {
  dispatch({ type: FETCHING_SINGLETOUR_START });
  loadProgressBar();

  const idToken = localStorage.getItem("firebase_token");
  console.log("id: >>>>>", id);

  axios
    .get(
      `https://wanderlust-nodejs-be.herokuapp.com/api/tours/${id}`,
      // `http://localhost:4000/api/tours/${id}`,
      {
        headers: {
          Authorization: idToken,
        },
      }
    )
    .then((res) => {
      console.log("Get Single Tour: ", res);
      dispatch({ type: FETCHING_SINGLETOUR_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log("Get single tour err: ", err.response);
      dispatch({ type: FETCHING_SINGLETOUR_FAILURE, payload: err.response });
    });
};

// Add a tour
export const ADD_TOUR_START = "ADD_TOUR_START";
export const ADD_TOUR_SUCCESS = "ADD_TOUR_SUCCESS";
export const ADD_TOUR_FAILURE = "ADD_TOUR_FAILURE";

export const addTour = (tour) => (dispatch) => {
  console.log("THIS IS THE TOUR GETTING ADDED", tour);
  dispatch({ type: ADD_TOUR_START });
  loadProgressBar();

  const idToken = localStorage.getItem("firebase_jwt");

  axios
    .post(
      "https://wanderlust-nodejs-be.herokuapp.com/api/tours",
      // "http://localhost:4000/api/tours",
      tour,
      {
        headers: {
          Authorization: idToken,
        },
      }
    )
    .then((res) => {
      console.log("add a tour SUCCESSFULL: ", res);
      dispatch({ type: ADD_TOUR_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log("add a tour err: ", err);
      dispatch({ type: ADD_TOUR_FAILURE, payload: err });
    });
};

// // Set Map Ref
// export const SET_MAP_REF_START = "SET_MAP_REF_START";
// export const SET_MAP_REF_SUCCESS = "SET_MAP_REF_SUCCESS";

// export const setMapRef = (mapRef) => (dispatch) => {
//   dispatch({ type: SET_MAP_REF_START });
//   dispatch({ type: SET_MAP_REF_SUCCESS, payload: mapRef });
// }

// Update a tour by id
export const UPDATE_TOUR_START = "UPDATE_TOUR_START";
export const UPDATE_TOUR_SUCCESS = "UPDATE_TOUR_SUCCESS";
export const UPDATE_TOUR_FAILURE = "UPDATE_TOUR_FAILURE";

export const updateTour = (id, changes) => (dispatch) => {
  dispatch({ type: UPDATE_TOUR_START });
  loadProgressBar();

  const idToken = localStorage.getItem("firebase_jwt");
  console.log("update tour id", id);
  console.log("update tour id token", idToken);

  axios
    .put(
      `https://wanderlust-nodejs-be.herokuapp.com/api/tours/${id}`,
      changes,
      {
        headers: {
          Authorization: idToken,
        },
      }
    )
    .then((res) => {
      console.log("Update a tour: ", res.data);
      dispatch({ type: UPDATE_TOUR_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log("Update a tour err: ", err);
      dispatch({ type: UPDATE_TOUR_FAILURE, payload: err });
    });
};

// Delete a tour by id
export const DELETE_TOUR_START = "DELETE_TOUR_START";
export const DELETE_TOUR_SUCCESS = "DELETE_TOUR_SUCCESS";
export const DELETE_TOUR_FAILURE = "DELETE_TOUR_FAILURE";

export const deleteTour = (id) => (dispatch) => {
  dispatch({ type: DELETE_TOUR_START });
  loadProgressBar();

  const idToken = localStorage.getItem("firebase_jwt");

  axios
    .delete(`https://wanderlust-nodejs-be.herokuapp.com/api/tours/${id}`, {
      headers: {
        Authorization: idToken,
      },
    })
    .then((res) => {
      console.log("Delete a tour: ", res.data);
      dispatch({ type: DELETE_TOUR_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      console.log("Delete a tour err: ", error);
      dispatch({ type: DELETE_TOUR_FAILURE, payload: error });
    });
};

// Add a tourist to a Tour By ID
export const ADD_TOURIST_TO_TOUR_START = "ADD_TOURIST_TO_TOUR_START";
export const ADD_TOURIST_TO_TOUR_SUCCESS = "ADD_TOURIST_TO_TOUR_SUCCESS";
export const ADD_TOURIST_TO_TOUR_FAILURE = "ADD_TOURIST_TO_TOUR_FAILURE";

export const addTouristToTour = (touristid, tourid) => (dispatch) => {
  dispatch({ type: ADD_TOURIST_TO_TOUR_START });
  loadProgressBar();
  axios
    .put(
      `https://roger-wanderlust.herokuapp.com/tourists/tourist/assignTourist/${touristid}/${tourid}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log("ADD TOURIST TO TOUR SUCESS: ", res);
      dispatch({ type: ADD_TOURIST_TO_TOUR_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log("ADD TOURIST TO TOUR ERROR: ", err);
      dispatch({ type: ADD_TOURIST_TO_TOUR_FAILURE, payload: err });
    });
};
