import React from "react";
import { Segment } from "semantic-ui-react";
import moment from 'moment'

class ViewBookings extends React.Component {
  state = {
   
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
  };

  confirmDelete = (id) => {
    if (window.confirm("Click OK to cancel this booking")) {
      this.deleteBooking(id);
    }
  };
//deletes specified address by id in db
  deleteBooking = async (id) => {
    await fetch(`${process.env.REACT_APP_API}/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.getBookingsData();
  };

  renderBookings = () => {
    return this.state.bookings.map((booking, index) => {
      return (
        <div key={index}>
          <div value={booking.id} className="booking">
            <p>
              <h4>Address</h4>
            </p>
            <p>
              {booking.address.street_address}, {booking.address.state}, {" "}
               {booking.address.post_code}
            </p>
            <p>
              <h4>Date</h4>
            </p>{" "}
            <p>{moment(booking.datetime).format("MMMM Do, h:mm a")}</p>
            <p>
              <h4>Charge</h4>
            </p>{" "}
            <p>${booking.price}</p>
          </div>
          <hr />
          <div className="delete-container">
            <p>
              <button
                class="ui negative basic button"
                onClick={() => this.confirmDelete(booking.id)}
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      );
    });
  };



  render() {
    return (
      <>
        <div className="booking-container">
          <Segment stacked>
            <p>
              <h1>Current Bookings</h1>
            </p>
            <div>{this.renderBookings()}</div>
          </Segment>
        </div>
      </>
    );
  }
}
export default ViewBookings;
