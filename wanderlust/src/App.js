import React from "react";
import { Route } from "react-router-dom";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Dashboard from "./views/Dashboard";
import ExploreTours from "./views/ExploreTours";
import Tour from "./views/Tour";
import AddTour from "./views/AddTour";
import UpdateTour from "./views/UpdateTour";
import CreatAccount from "./views/CreateAccount";
import Settings from "./views/Settings";
import Logout from "./views/Logout";
import Admin from "./views/Admin";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App() {
  return (
    <div className='App'>
      <Route exact path='/' render={(props) => <SignIn {...props} />} />
      <Route exact path='/signup' render={(props) => <SignUp {...props} />} />
      <Route exact path='/dashboard' render={() => <Dashboard />} />
      <Route
        exact
        path='/explore-tours'
        render={(props) => <ExploreTours {...props} />}
      />
      <Route exact path='/tours/:id' render={(props) => <Tour {...props} />} />
      <Route
        exact
        path='/add-tour'
        render={(props) => <AddTour {...props} />}
      />
      <Route
        exact
        path='/update-tour'
        render={(props) => <UpdateTour {...props} />}
      />
      <Route
        exact
        path='/create-account'
        render={(props) => <CreatAccount {...props} />}
      />

      <Route exact path='/settings' render={() => <Settings />} />
      <Route exact path='/logout' render={() => <Logout />} />
      <Route exact path='/admin' render={() => <Admin />} />
    </div>
  );
}

export default App;
