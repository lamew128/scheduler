/**
  * Get all the appointments that match the given day
  * @param {{state: Object, day: string}}
  * @return {array[]} 
  */
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const selected = state.days.filter(days => days.name === day)[0];
  if(!selected) {
    return [];
  }
  return selected.appointments.map((id) => state.appointments[id]);
}

/**
  * Get all the interviewers that match the given day
  * @param {{state: Object, day: string}}
  * @return {array[]} 
  */
export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  const selected = state.days.filter(days => days.name === day)[0];
  if(!selected) {
    return [];
  }
  return selected.interviewers.map((id) => state.interviewers[id]);
}

/**
  * Get the given interview from the state.
  * @param {{state: Object, interview: Object}}
  * @return {Object{}} 
  */
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  
  const interviewer = state.interviewers[interview.interviewer];
  const newInterview = {...interview, interviewer};

  return newInterview;
}