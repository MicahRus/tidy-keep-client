import React from "react";
import "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";

class Pay extends React.Component {
  state = {};

  getBookingData = async () => {
    let response = await fetch(`${process.env.REACT_APP_API}/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    let data = await response.json();
    let bookingId = data.bookings.reverse()[0].id;
    this.setState({ bookingId: bookingId });
  };

  async componentDidMount() {
    this.getBookingData();
    const stripe = await loadStripe(
      "pk_test_YzJXNFNGJSrhVigrjuN8I4u300hejKa2CR"
    );

    this.setState({ stripe: stripe, bookingId: this.state.bookingId });
  }

  getStripeKey = () => {
    const id = this.state.bookingId;
    fetch(`${process.env.REACT_APP_API}/payments/session?id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        this.state.stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  };

  //   makeSubscription = () => {
  //   const id = this.state.bookingId;
  //   fetch(`${process.env.REACT_APP_API}/payments/make_subscription?id=${id}`, {
  //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.state.stripe.redirectToCheckout({
  //         sessionId: data.id,
  //       });
  //     });
  // };

  render() {
    return (
      <>
        <div>
          <h2>Your booking is confirmed</h2>
          <p>click through to payment</p>
          <button onClick={this.getStripeKey} id="stripe">
            make payment
          </button>
          <button onClick={this.makeSubscription} id="stripe">
            create subscription
          </button>
        </div>
      </>
    );
  }
}

export default Pay;
