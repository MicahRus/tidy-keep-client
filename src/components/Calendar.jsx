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
    pricing: this.props.location.state.data
  };



  addBookingsToCalendar = () => {
    this.setState({
      eventList: [
        {
          id: 1,
          title: "Test",
          start: new Date(),
          end: new Date(),
        },
      ],
    });
  };

  getBookingsData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/bookings`);
    const data = await response.json();
    this.setState({ bookings: data });
    console.log(data);
  };

  datePickerHandleChange = (date) => {
    this.setState({
      startDate: date,
    });
    console.log(this.state);
  };

  calendarHandleSelect = (event) => {
    this.setState({ startDate: event });
  };

  handleSubmit = () => {
    this.setState({ redirect: '/Confirm'  })
  }

  componentDidMount() {
    // Gets the booking data
    this.getBookingsData();
    // Sets the state based off the booking data and renders it to the calendar
    this.addBookingsToCalendar();
  }

  render() {
    console.log(this.props);
    if (this.state.redirect){
      return(
      <Redirect to={{
      pathname: this.state.redirect,
      state: {data: this.state} 
    }} />)
    }
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
        <div>
        <button onClick={this.handleSubmit}> Next</button>

        </div>
      </div>
    );
  }
}

export default MyCalendar;
