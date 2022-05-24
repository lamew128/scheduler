import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const classname = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={classname} onClick={() => props.setInterviewer(props.value)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  );
}