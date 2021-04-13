import * as React from "react";
import { Route } from "react-router-dom";

import Login from "./views/login/Login";
import CreateAccount from "./views/create account/CreateAccount";
import Dashboard from "./views/dashboard/Dashboard";
import ExploreTours from "./views/explore tours/ExploreTours";
import Tour from "./views/tour/Tour";
import AddTour from "./views/add tour/AddTour";
import UpdateTour from "./views/update tour/UpdateTour";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <div>
        <Route exact path='/' render={() => <ExploreTours />} />
        <Route exact path='/sign-up' render={() => <Login />} />
        <Route exact path='/sign-in' render={() => <Login />} />
        <Route exact path='/create-account' render={() => <CreateAccount />} />
        <Route exact path='/dashboard-guide' render={() => <Dashboard />} />
        <Route exact path='/dashboard-user' render={() => <Dashboard />} />
        <Route exact path='/tours/:id' render={() => <Tour />} />
        <Route exact path='/add-tour' render={() => <AddTour />} />
        <Route exact path='/update-tour' render={() => <UpdateTour />} />
      </div>
    </div>
  );
};

export default App;
