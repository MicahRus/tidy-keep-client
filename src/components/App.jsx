import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Calendar from "./Calendar";
import CreateAddress from"./CreateAddress";
import BookingPage from './BookingPage'
import AboutUs from './AboutUs'
import SiteLayout from '../layouts/SiteLayout'
import Confirm from './Confirm'

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <SiteLayout>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Landing {...props} Calendar={Calendar} />}
          />
          <Route exact path="/Login" data-testid="login" component={Login} />
          <Route exact path="/SignUp" data-testid="sign-up" component={SignUp}/>
          <Route exact path="/Calendar" component={Calendar} />
          <Route exact path="/CreateAddress" component={CreateAddress} />
          <Route exact path="/BookingPage" component={BookingPage} />
          <Route exact  path="/AboutUs" component={AboutUs}/>
          <Route exact path="/Confirm" component={Confirm} />
        </Switch>
        </SiteLayout>
      </>
    );
  }
}

export default App;
