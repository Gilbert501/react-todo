import React, {useState} from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const todoList = [
  {id: 1, title:'Walk the dog'}, 
  {id:2, title:'Go to the grocery store'}, 
  {id:3, title:'Take out the garbage'}
];

function App() {
  const [newTodo, setNewTodo] = React.useState('');
  const handleAddTodo = (todoTitle) => {
    setNewTodo(todoTitle);
  }
  
  return (
    <div>
      <h1>Todo List</h1>
      <TodoList/>
      <AddTodoForm onAddTodo={handleAddTodo}/>
      <p>{newTodo}</p>
      
    </div>

  );
}

export default App
