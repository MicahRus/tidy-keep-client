import React from "react";
import { Redirect } from "react-router-dom";

import { Button, Header, Segment} from "semantic-ui-react";


class Confirm extends React.Component {
  state = {
    data: this.props.location.state.data,
    bookings: "",
    redirect: null,
  };

  async componentDidMount() {
    this.getServicesData();
  }

  // A function that will post the booking data into the database
  postBookingData = async () => {
    // Sets the data that will be parsed into the post request
    let data = {
      recurring: true,
      price: this.state.data.data.pricing.totalCost,
      datetime: this.state.data.data.startDate,
      address_id: this.state.data.userChoice,
    };

    await fetch(`${process.env.REACT_APP_API}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ booking: data }),
    });
    // Calls this method to get the msot up-to-date booking data(Including what was just posted)
    this.getBookingData();
  };

  // Gets the services data
  getServicesData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/services`);
    const data = await response.json();
    this.setState({ services: data.reverse() });
  };

  // Gets the booking data
  getBookingData = async () => {
    let response = await fetch(`${process.env.REACT_APP_API}/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    let data = await response.json();
    this.setState({ bookings: data });
    this.setPricing();
  };

  // Posts the bookingServices data, with arguments
  postBookingServicesData = async (bookingId, quantityArray, serviceArray) => {
    // Sets the data to be parsed to the post request, based off the variables passed in to the arguments
    let data = {
      booking_id: bookingId,
      quantityArray: quantityArray,
      serviceArray: serviceArray,
    };
    await fetch(`${process.env.REACT_APP_API}/booking_service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ bookingservice: data }),
    });
    // Sets the bookingId to be passed down in props to the next page
    this.setState({ bookingId: bookingId, redirect: "/Pay" });
  };

  // Sets the pricing for the items
  setPricing = () => {
    let bookingId = this.state.bookings.bookings.reverse()[0].id;
    let pricing = this.state.data.data.pricing;
    // An array that will contain all the different quantities from the selected services
    let quantityArray = [];
    // An array that will contain the ID number of the selected services
    let serviceArray = [];

    for (let i = 0; i < pricing.addons.length + 3; i++) {
      let service = 1;
      let quantity = 1;

      // Checks for the number of bathrooms and passes it through as a variable
      if (i === 0) {
        quantity = pricing.bathrooms;
        service = 1;
      }

      // Same as above but for bedrooms
      if (i === 1) {
        quantity = pricing.bedrooms;
        service = 2;
      }

      // Check what type of clean it is and passes that service number through as a variable
      if (i === 2) {
        this.state.services.find((item) => {
          if (item.title === pricing.type.toLowerCase()) {
            service = item.id;
          }
          // The null returns here(lines 117, 119) are to avoid getting errors in returning nothing out of an arrow function
          return null;
        });
        // Loops through an array of addons, comparing each of them to the services array and matching them then passing their service number through as a variable
        pricing.addons.map((addon) => {
          this.state.services.find((item) => {
            if (addon.toLowerCase() === item.title.toLowerCase()) {
              service = item.id;
            }
            return null;
          });
          return null;
        });
      }
      quantityArray.push(quantity);
      serviceArray.push(service);
    }
    this.postBookingServicesData(bookingId, quantityArray, serviceArray);
  };

  // redirect to pay page
  handleClick = (event) => {
    this.postBookingData();
  };

  showData = () => {
    // Sets variables that are repeated, to help maintain code dryness
    const location = this.state.data;
    const pricing = this.state.data.data.pricing;
    return (
      <div className= "confirm-page-container">
        <Segment>
        <Header className="confirm-details"> Confirmation details </Header>
        <h4>Address:</h4>
        <p>{location.selectedAddress}</p>

        <h4>On:</h4>
        <p>{this.state.data.data.startDate.toString()}</p>
        <h4>Details:</h4>
        <p>Bathrooms: {pricing.bathrooms}</p>
        <p>Bedrooms: {pricing.bedrooms}</p>
        <p>Type: {pricing.type}</p>
        <p>TotalCost: ${pricing.totalCost}</p>

        <p>
          Add-ons:{" "}
          {pricing.addons.map((addon) => {
            return `${- addon}, `;
          })}
            <Button onClick={this.handleClick} className="confirmation-button"> Confirm booking</Button>
        </p>
        
        </Segment>
         

       
        
      </div>
    );
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.redirect,
            state: { bookingId: this.state.bookingId },
          }}
        />
      );
    }
    return (
      <div>        <div> Confirmation page</div>

        {this.showData()}
      </div>
    );
  }
}

export default Confirm;
