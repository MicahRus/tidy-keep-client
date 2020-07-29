import React from "react";
import { Redirect } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid, Header, Icon } from "semantic-ui-react";

const localizer = momentLocalizer(moment);

class MyCalendar extends React.Component {
  state = {
    startDate: new Date(),
    eventList: [{}],
    redirect: null,
    pricing: this.props.location.state.data,
  };

  header = () => {
    return (
      <div class="calendar-page-nav">
        <Grid columns={4} divided>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" className="calendarpage-header">
                {this.state.pricing.bedrooms}{" "}
              </Header>
              <p>Bedroom</p>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" className="calendarpage-header">
                {this.state.pricing.bathrooms}
              </Header>
              <p>Bathroom</p>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" className="calendarpage-header">
                {this.state.pricing.type}
              </Header>
              <p>Clean Type</p>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" className="calendarpage-header">
                ${this.state.pricing.totalCost}
              </Header>
              <p> Subtotal </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  };

  // Was originally going to include rendering all the bookings into the calendar, but was scrapped due to lack of time.
  // getBookingsData = async () => {
  //   const response = await fetch(`${process.env.REACT_APP_API}/bookings`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   const data = await response.json();
  //   // Sets the state for the bookings, as well as pushing them into the event list
  //   this.setState({
  //     bookings: data,
  //     eventList: [
  //       {
  //         id: data[0].id,
  //         title: "Booking event from api",
  //         start: data[0].date_of,
  //         end: data[0].date_of,
  //       },
  //     ],
  //   });
  // };

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

  // componentDidMount() {
  //   // Booking data is no longer required, since we're not rendering it to the page
  //   // Gets the booking data
  //   // this.getBookingsData();
  // }

  calendar = () => {
    return (
      <div>
        {this.header()}
        <div>
          <Header className="calendar-timedate-header"> Select a date</Header>
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

        <div className="time-pick">
          <Header className="calendar-timedate-header">Select a time</Header>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.datePickerHandleChange}
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            minDate={new Date()}
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
          />
        </div>
        <div className="next-button">
          <Button
            onClick={this.handleSubmit}
            className="calendar-next"
            icon
            labelPosition="right"
          >
            {" "}
            Next
            <Icon name="right arrow" />
          </Button>
        </div>
      </div>
    );
  };

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
    return this.calendar();
  }
}

export default MyCalendar;
