import React from "react";
import {
  Segment,
  // Container,
  // Header,
  // Form,
  // Button,
  // Icon,
} from "semantic-ui-react";

class ViewBookings extends React.Component {
  state = {
    // street_address: "",
    // post_code: "",
    // state: "VIC",
    // redirect: null,
    // data: this.props.location.state.data,
    // addresses: [],
    // userChoice: null,
    // selectedAddress: "",
    primaryColour: "CornflowerBlue",
    bookings: []
  };

  async componentDidMount() {
    this.getBookingsData();
  
    // this.setState({ bookings: this.state.bookings });
  }


 getBookingsData = async () => {
    let response = await fetch(`${process.env.REACT_APP_API}/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    let data = await response.json();
    // let bookings = data.bookings
    this.setState({ bookings: data.bookings });

    console.log(this.state);
  };


  // delete will fix tomorrow (sunday) georgia
  // deleteBooking = async (id) => {
  //   await fetch(`http://localhost:3000/bookings/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   this.getBookingsData();
  // };

  renderBookings = () => {
    return this.state.bookings.map((booking, index) => {
      return (
        <div key={index}>
          <div value={booking.id} className="booking">
            <p>charge</p> <p>{booking.price}</p> <p>address</p><p>{booking.address.street_address},{booking.address.state}, {booking.address.post_code}</p>
          </div>
          {/* <div className="delete-container">
            <Button onClick={() => this.deleteBooking(booking.id)}>
              Delete
            </Button>
          </div> */}
          <hr />
        </div>
      );
    });
  };

  // addressOnClick = (event) => {
  //   event.preventDefault();
  //   this.setState(
  //     {
  //       userChoice: event.target.value,
  //       selectedAddress: event.target.innerText,
  //     },
  //     console.log(this.state)
  //   );
  // };

  // addressStyleSelect = (position) => {
  //   if (this.state.userChoice?.includes(position)) {
  //     return {
  //       backgroundColor: this.state.primaryColour,
  //     };
  //   }
  // };

  render() {
    
    return (
      <>
        <div className="booking-container">
          <Segment stacked>
            <h1>Current Bookings</h1>
            <div>{this.renderBookings()}</div>
          </Segment>
        </div>
      </>
    );
  }
}
export default ViewBookings;
