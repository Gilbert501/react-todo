import React from 'react';
import ToDoListItem from './ToDoListItem';

const todoList = [
  {id:1, title:'Walk the dog'}, 
  {id:2, title:'Go to the grocery store'}, 
  {id:3, title:'Take out the garbage'}
];

const TodoList = () => {
      return (
        <ul>
           {todoList.map(todoItem => (
           <ToDoListItem key={todoItem.id} id={todoItem.id} title={todoItem.title} />
            
           ))}
        </ul>
      );
    };

    export default TodoList;