import React, {useState} from 'react';
 import TodoList from './TodoList';
 import AddTodoForm from './AddTodoForm';

 const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState( () => {
    const savedTodoList = localStorage.getItem('savedTodoList');
    return JSON.parse(savedTodoList) });
    
  React.useEffect (() => {
     localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]) ;
  return [todoList, setTodoList];
  
 }
 
 function App() {
  const [todoList, setTodoList] = useSemiPersistentState();
   
   const addTodo = (newTodoItem) => {
     const newTodo = {
      title: newTodoItem.title,
      id: Date.now()
 }
 
 setTodoList([...todoList, newTodo]);
 }
 
 return (
     <>
       <h1>Todo List</h1>
       <AddTodoForm onAddTodo={addTodo}/>
       <TodoList todoList={todoList}/>
     </>
 
   );
   }
 
 export default App;
 
 