import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props){
const lists = props.days.map((item) =>
    <DayListItem 
      key={item.id}
      name={item.name} 
      spots={item.spots} 
      selected={item.name === props.value}
      setDay={props.onChange}
      data-testid="day"
    />
  );

  return(
    <ul>
      {lists} 
    </ul>
  )
}