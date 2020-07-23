import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Landing extends Component {
  state = {
    bedrooms: 1,
    bathrooms: 1,
    choice: "Standard",
    services: [],
    redirect: null,
    totalCost: 0,
  };

  componentDidMount() {
    // Runs the methods to get data from the rails api
    this.getBookingsData();
    this.getServicesData();

  }

  // This function fetches the bookings data from the rails api
  getBookingsData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/bookings`);
    const data = await response.json();
    this.setState({ bookings: data });
  };

  // This function fetches the services data from the rails api
  getServicesData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/services`);
    const data = await response.json();
    this.setState({ services: data.reverse() });
  };

  // A method to calculate the cost of the currently selected cleaning items
  calculateCost = () => {
    // This will help to maintain the dryness of the code
    const services = this.state.services;

    let bathroomCost = services[0]?.price * this.state.bathrooms;
    let bedroomCost = services[1]?.price * this.state.bedrooms;

    // Logic that will decide what the cost multiplier will be
    let costMultiplier = services[2]?.price;
    if (this.state.choice === "Deluxe") {
      costMultiplier = services[3]?.price;
    } else if (this.state.choice === "Deep Clean") {
      costMultiplier = services[4]?.price;
    } else if (this.state.choice === "Moving in/out") {
      costMultiplier = services[5]?.price;
    }
    // Sets the total cost
    let totalCost = Math.round(
      (bedroomCost + bathroomCost) * (costMultiplier / 100)
    );
    // Checks to see if the totalCost is NaN
    if (!isNaN(totalCost)) {
      // If the state isn't the same as totalCost it will set the state to totalCost
      if (this.state.totalCost !== totalCost) {
        this.setState({ totalCost: totalCost });
      }
    }
  };


  // This will handle setting the state when button choices are changed
  handleChange = (event) => {
    let value = event.target.value;

    if (value.includes("bedroom")) {
      this.setState({ bedrooms: value[0] });
    } else if (value.includes("bathroom")) {
      this.setState({ bathrooms: value[0] });
    } else {
      this.setState({ choice: value });
    }


    // When the form is changed it will update the value
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: "/BookingPage" });
  };

  // A form containing the select buttons on the homepage.
  form = () => {
    return (
      <div>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <select>
            <option value="1 bedroom">1 bedroom</option>
            <option value="2 bedroom">2 bedroom</option>
            <option value="3 bedroom">3 bedroom</option>
            <option value="4 bedroom">4 bedroom</option>
            <option value="5 bedroom">5 bedroom</option>
          </select>

          <select>
            <option value="1 bathroom">1 bathroom</option>
            <option value="2 bathroom">2 bathroom</option>
            <option value="3 bathroom">3 bathroom</option>
            <option value="4 bathroom">4 bathroom</option>
          </select>

          <select>
            <option value="Standard">Standard </option>
            <option value="Deluxe">Deluxe </option>
            <option value="Deep Clean">Deep Clean </option>
            <option value="Moving in/out">Moving in/out </option>
          </select>

          <input
            type="submit"
            name="submit"
            value={`Get a quote from $${this.state.totalCost} =>`}
            
          />
          {this.calculateCost()}
        </form>
        
      </div>

    );
  };
  render() {
    // If the redirect state isn't null it will redirect the user
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { data: this.state },
          }}
        />
      );
    }
    return (
      <>
        <h1>On Landing</h1>
        <div>{this.form()}</div>
      </>
      
    );
  }
}
export default Landing;
