// eslint-disable-next-line
import React, { useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const isEditing = !!state.appointments[id].interview;
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = [...state.days].map((day) => {
      return {...day, spots: day.name === state.day && !isEditing ? day.spots-1 : day.spots}
    });

    console.log("state.day = ", state.day);
    console.log("updatedDays = ", updatedDays);

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({...state, appointments, days: updatedDays });
    })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = [...state.days].map((day) => {
      return {...day, spots: day.name === state.day ? day.spots+1 : day.spots}
    });

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({...state, appointments, days: updatedDays});
    })
  };

  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  };
}