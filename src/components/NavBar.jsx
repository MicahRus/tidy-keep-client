import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  onClick = () => {
    localStorage.removeItem("token");
    this.setState({ test: "test" });
  };
  render() {
    if (localStorage.getItem("token") !== null) {
      return (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/" onClick={this.onClick}>
            Logout
          </Link>

          <Link to="/AboutUs">About Us</Link>
          <Link to="/Services">Services</Link>
          <Link to="/ViewBookings">Current Bookings</Link>

        </nav>
      );
    }
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Login" data-testid="login">
          Login
        </Link>
        <Link to="/SignUp" data-testid="sign-up">
          Sign Up
        </Link>
        <Link to="/AboutUs">About Us</Link>
        <Link to="/Services">Services</Link>
      </nav>
    );
  }
}

export default NavBar;
