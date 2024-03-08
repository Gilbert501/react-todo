import React from 'react';

const ToDoListItem = ({id, title}) => {
  return (
    <ul>
      <li key={id}>{title}</li>
    </ul>
 );
};

export default ToDoListItem;