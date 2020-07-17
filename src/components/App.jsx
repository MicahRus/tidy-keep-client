import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Calendar from "./Calendar";

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Booking" component={Calendar} />
        </Switch>
      </>
    );
  }
}

export default App;
