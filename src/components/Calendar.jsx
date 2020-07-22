import React from "react";
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
  console.log(rule.all());
}

class MyCalendar extends React.Component {
  state = {
    startDate: new Date(),
    eventList: [{}],
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
  };

  calendarHandleSelect = (event) => {
    this.setState({ startDate: event });
  };

  componentDidMount() {
    // Gets the booking data
    this.getBookingsData();
    // Sets the state based off the booking data and renders it to the calendar
    this.addBookingsToCalendar();
  }

  render() {
    return (
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

        <DatePicker
          selected={this.state.startDate}
          onChange={this.datePickerHandleChange}
          dateFormat="MMMM d, yyyy h:mm aa"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
        />
      </div>
    );
  }
}

export default MyCalendar;
