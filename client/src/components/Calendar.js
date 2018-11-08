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

  /* TO DO:
   * Make it smaller in size, shouldn't cover whole screen.
   * Style it better so it looks nice.
   * Figure out how events work and how to optionally add them.
   * Read through docs & get familiar with v3 in React.
   */

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
