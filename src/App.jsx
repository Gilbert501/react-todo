import {useState, useEffect} from 'react';
 import TodoList from './TodoList';
 import AddTodoForm from './AddTodoForm';
 
  const  App = () => {
    const [todoList, setTodoList] = useState(([]));
    const[isLoading, setIsLoading] = useState(true); 
  
    const fetchData = async () => {

        const options = {
          method: 'GET',
       headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
          }
      };

      const url =`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
      
      try{
         const response = await fetch(url, options);            
         
         if(!response.ok) {
           const message = `Failed to fetch data: ${response.status}`;
          throw new Error(message);
      }
      
      const data = await response.json();
      const todos = data.records.map((todo) =>({
          id:todo.id,
          title:todo.fields.title,
         }));

        setTodoList(todos);
    } catch (error) {
      console.log(error.message);
    }finally{
      setIsLoading(false);
    }
  }
   
  useEffect (() => {
    fetchData ();
    }, []);

    const postTodo = async newTodoItem => {
      const options = {
        method: 'POST',
     headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      
      },
        body: JSON.stringify({
          fields: {
              title: newTodoItem.title
          }
        })
    };

    const url =`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    
    try{
      const response = await fetch(url, options);            
      const responseData = await response.json;
      if(!response.ok) {
         const message = `Failed to add todo: ${response.status}`;
         throw new Error(message);
    }
    
    const addedTodo = responseData;
        setTodoList([...todoList, {
          id: addedTodo.id,
          title: addedTodo.fields.title}]);
       } catch(error) {
        console.log(error.message);
       }
      }
 
  const addTodo = (newTodoItem) => {
     const newTodo = {
      title: newTodoItem.title,
    id: Date.now()
 }
 
setTodoList([...todoList, newTodo]);
 
}

useEffect (() => {
  if(!isLoading) {
    localStorage.setItem('savedTodoList', 
    JSON.stringify(todoList));
  }
}, [todoList, isLoading]);
 
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
 