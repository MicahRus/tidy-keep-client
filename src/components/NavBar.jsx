import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
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
