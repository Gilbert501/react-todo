import React from'react';

const todoList = [
  {id: 1, title:'Walk the dog'}, 
  {id:2, title:'Go to the grocery store'}, 
  {id:3, title:'Take out the garbage'}
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(todoItem => (
                <li key ={todoItem.id}>{todoItem.title}</li>

        ))}
       </ul>
      </div>

  );
}

export default App
