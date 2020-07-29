import React from "react";
import {
  Segment,
  Container,
  Header,
  Form,
  Button,
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
    bookings: [],
  };

  async componentDidMount() {
    this.getBookingsData();

    this.setState({ bookings: this.state.bookings });
  }

  getBookingsData = async () => {
    let response = await fetch(`${process.env.REACT_APP_API}/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    let data = await response.json();
    let bookings = data.bookings;
    this.setState({ bookings: data.bookings });
    console.log(bookings);
    console.log(this.state);
  };

  confirmDelete = (id) => {
    if (window.confirm("Click OK to cancel this booking")) {
      this.deleteBooking(id);
    }
  }

  deleteBooking = async (id) => {
    await fetch(`http://localhost:3000/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.getBookingsData();
  };

  renderBookings = () => {
    return this.state.bookings.map((booking, index) => {
      let bookingDate = Date(booking.datetime);
      return (
        <div key={index}>
          <div value={booking.id} className="booking">
         <p><h4>Address</h4></p>
            <p>
              {booking.address.street_address},{booking.address.state},{" "}
              {booking.address.post_code}
            </p>
            <p><h4>Date</h4></p> <p>{ bookingDate}</p> 
               <p><h4>Charge</h4></p> <p>{booking.price}</p> 
          </div>
          <hr />
          <div className="delete-container">
            <p><button class="ui negative basic button" onClick={() => this.confirmDelete(booking.id)}>
              Delete
            </button></p>
          </div>
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
            <p><h1>Current Bookings</h1></p>
            <div>{this.renderBookings()}</div>
          </Segment>
        </div>
      </>
    );
  }
}
export default ViewBookings;
