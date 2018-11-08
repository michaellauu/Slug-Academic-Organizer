import React, { Component } from "react";
import FullCalendar from "fullcalendar-reactwrapper-with-scheduler";
import "../styles/Calendar.css";
import "../dist/fullcalendar.min.css";

export default class CalendarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          title: "All Day Event",
          start: "2018-11-07"
        },
        {
          title: "Long Event",
          start: "2018-11-07",
          end: "2018-11-10"
        }
      ]
    };
  }

  render() {
    return (
      <div id="calendar">
        <FullCalendar
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          id="your-custom-ID"
          header={{
            left: "prev,next today",
            center: "title",
            right: "month,basicWeek,basicDay"
          }}
          defaultDate={Date.now()}
          navLinks={true} // can click day/week names to navigate views
          editable={true}
          eventLimit={true} // allow "more" link when too many events
          events={this.state.events}
        />
      </div>
    );
  }
}
