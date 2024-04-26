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
      console.log("Fetching data from:", url);
      try{
        const response = await fetch(url, options);            
       if(!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);

     setTodoList(data.records);
        setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }finally{
      setIsLoading(false);
    }
  }
   
  useEffect (() => {
    fetchData ();
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
 