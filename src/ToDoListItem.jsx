import React from 'react';

const ToDoListItem = (props) => {
  return (
    <ul>
      <li key={props.id}>{props.title}</li>
    </ul>
 );
};

export default ToDoListItem;