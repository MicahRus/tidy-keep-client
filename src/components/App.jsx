import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Calendar from "./Calendar";
import CreateAddress from "./CreateAddress";
import BookingPage from "./BookingPage";
import AboutUs from "./AboutUs";
import SiteLayout from "../layouts/SiteLayout";
import Confirm from "./Confirm";
import Footer from "./Footer";
import TermsConditions from "./TermsConditions";
import PageNotFound from "./PageNotFound";
import Pay from "./Pay";
import ViewBookings from "./ViewBookings";
import Services from "./Services";
import ProtectedRoute from "./ProtectedRoutes";

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
            <Route
              exact
              path="/SignUp"
              data-testid="sign-up"
              component={SignUp}
            />
            <ProtectedRoute exact path="/Calendar" component={Calendar} />
            <ProtectedRoute
              exact
              path="/CreateAddress"
              component={CreateAddress}
            />
            <ProtectedRoute exact path="/BookingPage" component={BookingPage} />
            <Route exact path="/AboutUs" component={AboutUs} />
            <ProtectedRoute exact path="/Confirm" component={Confirm} />
            <Route exact path="/TermsConditions" component={TermsConditions} />
            <ProtectedRoute exact path="/Pay" component={Pay} />
            <ProtectedRoute
              exact
              path="/ViewBookings"
              component={ViewBookings}
            />
            <Route exact path="/Services" component={Services} />
            <Route path="/" component={PageNotFound} />
          </Switch>
        </SiteLayout>
        <Footer />
      </>
    );
  }
}

export default App;
