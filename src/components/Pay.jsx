import React from "react";
import "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";

class Pay extends React.Component {
  
  state = {  };


  async componentDidMount() {
    const stripe = await loadStripe(
      "pk_test_YzJXNFNGJSrhVigrjuN8I4u300hejKa2CR"
    );

    this.setState({ stripe: stripe, bookingId: this.state.bookingId});
        console.log(this.state);
        console.log(this.state.booking_id);

  }

getStripeKey = () => {
    const id = this.state.bookingId;
    fetch(`http://localhost:3000/payments/session?id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        this.state.stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  };


  render() {
    return (
      <>
      <div>
        <h2>on Pay</h2>
         
      </div>
      </>
    );
  }
}

export default Pay;
