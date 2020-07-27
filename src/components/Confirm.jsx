import React from "react";
import { RRule } from "rrule";
import { Redirect } from "react-router-dom";


class Confirm extends React.Component {
  state = { data: this.props.location.state.data, bookings: "", redirect: null };

  newRRule = () => {
    const rule = new RRule({
      freq: RRule.WEEKLY, // repeat weekly, possible freq [DAILY, WEEKLY, MONTHLY, ]
      interval: 1,
      // interval: this.state.data.interval
      dtstart: this.state.data.data.startDate,
      count: 5,
    });
  };
  async componentDidMount() {

    this.getServicesData();
    this.newRRule();
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
    this.getBookingData();
  };

  getServicesData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/services`);
    const data = await response.json();
    this.setState({ services: data.reverse() });
  };

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

  postBookingServicesData = async (quantity, service, bookingId) => {
    let data = {
      booking_id: bookingId,
      service_id: service,
      quantity: quantity,
    };
    let booking_id = data.booking_id;
    await fetch(`${process.env.REACT_APP_API}/booking_service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ bookingservice: data }),
    });
    this.setState({ bookingId: bookingId, redirect: "/Pay" });

  };

  setPricing = () => {
    let bookingId = this.state.bookings.reverse()[0].id;
    let pricing = this.state.data.data.pricing;

    for (let i = 0; i < 7; i++) {
      let quantity = 1;
      let service = i;

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
        });
        // Loops through an array of addons, comparing each of them to the services array and matching them then passing their service number through as a variable
        pricing.addons.map((addon) => {
          this.state.services.find((item) => {
            if (addon.toLowerCase() === item.title.toLowerCase()) {
              service = item.id;
            }
          });
        });
      }

      this.postBookingServicesData(quantity, service, bookingId);
    }
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
      <div>
        <h3>Address</h3>
        <p>{location.selectedAddress}</p>

        <h3>On</h3>
        <p>{this.state.data.data.startDate.toString()}</p>

        <h3>For</h3>
        <p>Bathrooms: {pricing.bathrooms}</p>
        <p>Bedrooms: {pricing.bedrooms}</p>
        <p>Type: {pricing.type}</p>
        <p>TotalCost: {pricing.totalCost}</p>

        <p>
          Addons:{" "}
          {pricing.addons.map((addon) => {
            return `${addon}, `;
          })}
        </p>

        <h1> Is this information correct?</h1>

        <button onClick={this.handleClick}> Confirm booking</button>
      </div>
    );
  };


  render() {
        const { bookings } = this.state;

       if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { bookingId: this.state.bookingId },
          }}
        />
      );
    }
    return (
      <div>
        <div> Confirmation page</div>
        {this.showData()}
      </div>
    );
  }
}

export default Confirm;
