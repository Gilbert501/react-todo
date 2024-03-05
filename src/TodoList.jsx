import React from 'react';

const todoList = [
  {id:1, title:'Walk the dog'}, 
  {id:2, title:'Go to the grocery store'}, 
  {id:3, title:'Take out the garbage'}
];

const TodoList = () => {
    return (
  <>
      
      <ul>
        {todoList.map(todoItem => (
                <li key ={todoItem.id}>{todoItem.title}</li>

        ))}
       </ul>
      
  </>
    );
}

export default TodoList;