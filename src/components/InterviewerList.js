import React from "react";
//import classNames from "classnames";

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const lists = props.interviewers.map((interviewer) =>
  <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      value={interviewer.id}    
      setInterviewer={props.onChange}
  />
);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {lists}
      </ul>
    </section>
  );
}