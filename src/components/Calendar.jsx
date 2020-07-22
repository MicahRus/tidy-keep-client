import React from "react";
import { Calendar, momentLocalizer } from 
"react-big-calendar";
import { TimePicker } from 'antd';
import { RRule } from "rrule";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import 'antd/dist/antd.css';



import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";


const myEventsList = []
const rule = new RRule({
  freq: RRule.WEEKLY, // repeat weekly, possible freq [DAILY, WEEKLY, MONTHLY, ]
  interval: 1,
  byweekday: [RRule.MO],
  dtstart: new Date(2020, 6, 20, 10, 30),
  count: 4,
});

const localizer = momentLocalizer(moment);


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
  handleButtonSubmit = (event) => {
    console.log('here');
  }

  handleTimeChange = (time: moment, timeString: string) => {
    console.log(timeString)
    this.setState({ time: timeString })
    console.log(this.state)
  }


  onDrillDown = (event) => {
  };

  calendarHandleSelect = (event) => {
    this.setState({ startDate : event})
  }


  render() {

    return (
      <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={this.calendarHandleSelect}
          drilldownView= "null"
          onDrillDown={this.calendarOnDrillDown}
          onNavigate={this.calendarHandleSelect}
          

        />
        <TimePicker
        // defaultValue={moment()}
        format="HH:mm"
        minuteStep={15}
        use12Hours={true}
        onChange={this.handleTimeChange}
         />
      </div>
    );
    }
  }


export default MyCalendar;
