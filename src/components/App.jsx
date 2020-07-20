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
<<<<<<< HEAD
          <Route exact path="/Login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Booking" component={Calendar} />
=======
<Route exact path="/Login" data-testid="login" component={Login} />
<Route exact path="/SignUp" data-testid="sign-up" component={SignUp} />
>>>>>>> b8f171faf0f6eafe15b69cc73e45986e55672f55
        </Switch>
      </>
    );
  }
}

export default App;
