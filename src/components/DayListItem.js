import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";
//import E from "react-script";

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    if (spots === 1) {
      return `1 spot remaining`;
    } else if (spots > 1) {
      return `${spots} spots remaining`;
    } else {
      return 'no spots remaining';
    }
  };

  const listClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li data-testid="day" onClick={() => props.setDay(props.name)} className = {listClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}