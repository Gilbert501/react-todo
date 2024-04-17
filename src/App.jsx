import React, {useState, useEffect} from 'react';
 import TodoList from './TodoList';
 import AddTodoForm from './AddTodoForm';
 
 function App() {
  const [todoList, setTodoList] = useState(([]));
  const[isLoading, setIsLoading] = useState(true); 
  
  useEffect (() => {
    const fetchData = new Promise ((resolve, reject) => {
      setTimeout (() => {
        resolve({data: {
          todoList: JSON.parse(localStorage.getItem(
          'savedTodoList'))  || []
         
        }  
      });
    }, 2000);
  
   }); 
   fetchData.then((result) => {
    setTodoList(result.data.todoList);
    setIsLoading(false);
   }).catch((error) => {
      console.log("Error fetching data", error);
      setIsLoading(false);
 });
  }, []);

  useEffect (() => {
    if(!isLoading) {
      localStorage.setItem('savedTodoList', 
      JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);


  
     
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
       {isLoading ? <p>Loading...</p> : 
       <TodoList todoList={todoList}/>
       }
     </>
 
   );
   }
 
  export default App;
 