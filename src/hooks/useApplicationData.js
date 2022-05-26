import { useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });

  /**
  * Add the appointment to the api server.
  * @param {{id: Number, interview: Object}}
  * @return {Promise{}} update the api server with given id
  */
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

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({...state, appointments, days: updatedDays });
    })
  };

  /**
  * Detele the appointment from the api server.
  * @param {{id: Number}}
  * @return {Promise{}} update the api server with given id
  */
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

  /**
  * Get all the infomations from the api server.
  * @return {Promise{}} for setting the state to render the page.
  */
  function getInfo() {
    return Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    getInfo
  };
}