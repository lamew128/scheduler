export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const selected = state.days.filter(days => days.name === day)[0];
  if(!selected) {
    return [];
  }
  return selected.appointments.map((id) => state.appointments[id]);
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  const selected = state.days.filter(days => days.name === day)[0];
  if(!selected) {
    return [];
  }
  return selected.interviewers.map((id) => state.interviewers[id]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  
  const interviewer = state.interviewers[interview.interviewer];
  const newInterview = {...interview, interviewer};
  //console.log("selector getInterview() = ", newInterview);

  return newInterview;
}