import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Error from "components/Appointment/Error.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  /**
  * Add the appointment to the api server.
  * @param {{name: string, interviewer: Object}}
  */
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(error => transition(ERROR_SAVE));
  }

  /**
  * Delete the appointment and update the api server.
  */
  function deleteAppoinment() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(error => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
        {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={back} onSave={save}/>}
        {mode === SAVING && <Status message="SAVING" />}
        {mode === DELETING && <Status message="DELETING" />}
        {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={deleteAppoinment} onCancel={back}/>}
        {mode === ERROR_SAVE && <Error message="Cannot book appoinment." onClose={back}/>}
        {mode === ERROR_DELETE && <Error message="Cannot cancel appoinment." onClose={back}/>}
    </article>
  );
}