import React from "react";
import { Calendar, momentLocalizer } from 
"react-big-calendar";
import { TimePicker } from 'antd';
import { RRule } from "rrule";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import 'antd/dist/antd.css';




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
     handleSelect = (event) => {
      this.setState({ pressed: true })
    }
  render() {
    if (this.state?.pressed != null){
      return (
      <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 300 }}
          // onDrillDown={this.onDrillDown}
          onSelectEvent={this.handleSelect}
          drilldownView= "null"
          // defaultView={Calendar.View('day')}

        />
      </div>)
    } else {
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={this.handleSelect}
          drilldownView= "null"
          

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
}

export default MyCalendar;
