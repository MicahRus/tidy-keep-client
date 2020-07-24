import React from "react";
import { Redirect } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import { RRule } from "rrule";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const myEventsList = [];
const rule = new RRule({
  freq: RRule.WEEKLY, // repeat weekly, possible freq [DAILY, WEEKLY, MONTHLY, ]
  interval: 1,
  byweekday: [RRule.MO],
  dtstart: new Date(2020, 6, 20, 10, 30),
  count: 4,
});

const localizer = momentLocalizer(moment);
// A loop that will push all the events generated into the event list
for (let i = 0; i < rule.all().length; i++) {
  let newHours = rule.all()[i].getHours() + 2;
  let newDate = rule.all()[i].setHours(newHours);
  myEventsList.push({
    id: i,
    title: "Recurrence test",
    start: rule.all()[i],
    end: new Date(newDate),
    completed: false,
  });
}

class MyCalendar extends React.Component {
  state = {
    startDate: new Date(),
    eventList: [{}],
    redirect: null,
    pricing: this.props.location.state.data,
  };

  header = () => {
    return (
      <div>
        <div> Header goes here</div>
        <div>
          <img src="https://picsum.photos/100/100" alt="placeholder" />
          <h4>{this.state.pricing.bedrooms} </h4>
          <p>Bedroom</p>
          <h4>{this.state.pricing.bathrooms}</h4>
          <p>Bathroom</p>
          <h4>{this.state.pricing.type}</h4>
          <p>Clean Type</p>
          <h4>{this.state.pricing.totalCost}</h4>
          <p> Subtotal </p>
        </div>
      </div>
    );
  };

  // // Pushes the bookings into state
  // addBookingsToCalendar = () => {
  //   if (this.state.bookings)
  //   this.setState({
  //     eventList: [
  //       {
  //         id: 1,
  //         title: "test",
  //         start: new Date(),
  //         end: new Date()
  //       },
  //       {
  //         id: this.state.bookings[0].id,
  //         title: "Booking event from api",
  //         start: this.state.bookings[0].date_of,
  //         end: this.state.bookings[0].date_of
  //       },
  //     ],
  //   });
  // };

  getBookingsData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    // Sets the state for the bookings, as well as pushing them into the event list
    this.setState({
      bookings: data,
      eventList: [
        {
          id: data[0].id,
          title: "Booking event from api",
          start: data[0].date_of,
          end: data[0].date_of,
        },
      ],
    });
  };

  // Changes the start date in state when a date is clicked on the datepicker
  datePickerHandleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  // Sets the start date in state when a date is clicked on the calendar
  calendarHandleSelect = (event) => {
    this.setState({ startDate: event });
  };

  // When the submit button is pressed redirects to the next page
  handleSubmit = () => {
    this.setState({ redirect: "/CreateAddress" });
  };

  componentDidMount() {
    // Gets the booking data
    this.getBookingsData();
  }

  render() {
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
      <div>
        {this.header()}
        <div>
          <Calendar
            localizer={localizer}
            events={this.state.eventList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={this.calendarHandleSelect}
            drilldownView="null"
            onDrillDown={this.calendarOnDrillDown}
            onNavigate={this.calendarHandleSelect}
          />
        </div>

        <div>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.datePickerHandleChange}
            // dateFormat=" h:mm aa"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            minDate={new Date()}
            // showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
          />
        </div>
        <div>
          <button onClick={this.handleSubmit}> Next</button>
        </div>
      </div>
    );
  }
}

export default MyCalendar;
