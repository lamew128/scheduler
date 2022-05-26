import React, { useEffect } from "react";
import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {state, setDay, bookInterview, cancelInterview, getInfo } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dailyAppointments.map(appointment => {
    const interviewers = getInterviewersForDay(state, state.day);
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });

  useEffect(() => {
    //axios request here...
    getInfo();
    //React Hook useEffect has a missing dependency: 'getInfo'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, [])

  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
