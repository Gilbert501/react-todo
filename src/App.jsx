import {useState, useEffect, useCallback} from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import style from './components/App.module.css';
 
 const  App = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortByField, setSortByField] = useState('title')
    
    const sortTodos = useCallback((todos) => {
      return todos.slice().sort((a, b) => {
        if (sortByField === 'title') {
          return sortOrder === 'asc' 
            ? a.title.localeCompare(b.title)
            :b.title.localeCompare(a.title);
        } else if (sortByField === 'createdTime') {
          const dateA = new Date(a.createdTime);
          const dateB = new Date(b.createdTime);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return 0;
        });
    }, [sortOrder, sortByField]);
    
  const fetchData = useCallback (async () => {
      if (!import.meta.env.VITE_AIRTABLE_API_TOKEN || !import.meta.env.VITE_AIRTABLE_BASE_ID) {
        console.error('Environment variables not set');
        return;
      }

  const url =`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

    const options = {
       method: 'GET',
       headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
        }
      }

       try{
         const response = await fetch(url, options);            
         
         if(!response.ok) {
           const message = `Failed to fetch data: ${response.status}`;
          throw new Error(message);
      }


      const responseData = await response.json();
      const todos = responseData.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
        createdTime:todo.fields.createdTime
    }));

    setTodoList(sortTodos(todos));
  } catch (error) {
    console.log(error.message);
  }finally{
    setIsLoading(false);
  }
}, [sortTodos]);

   useEffect (() => {
     fetchData ();
    }, [fetchData]);
      
  const postTodo = async (newTodoItem) => {
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
      }
    

    const url =`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    
    try{
      const response = await fetch(url, options);            
     
      if(!response.ok) {
         const message = `Failed to add todo: ${response.status}`;
         throw new Error (message);
    }
    
    fetchData();
  } catch(error) {
    console.log('Error adding todo', error);
  }
  
};  

const toggleSortOrder = () => {
        setSortOrder((prevSortOrder) => prevSortOrder === 'asc' ? 'desc' : 'asc');  
    }

    const toggleSortByField = () => {
       setSortByField((prevSortByField) => prevSortByField === 'title' ? 'createdTime' : 'title');
}
 const addTodo = (newTodoItem) => {
    const newTodo = {
      title: newTodoItem.title,
      id: Date.now(),
      createdTime: new Date().toISOString()
 }
 setTodoList((prevTodoList) => sortTodos([...prevTodoList, newTodo]));
 postTodo(newTodoItem);
}

useEffect (() => {
  if(!isLoading) {
    localStorage.setItem('savedTodoList', 
    JSON.stringify(todoList));
  }
}, [todoList, isLoading]);

useEffect(() => {
  setTodoList((prevTodoList) => sortTodos([...prevTodoList]));
}, [sortOrder, sortByField, sortTodos]);

const removeTodo = (idToRemove) => {
  setTodoList((prevTodoList) => prevTodoList.filter(todo => todo.id !== idToRemove));
  }

return (
  <div className={style.container}>
  <BrowserRouter>
  <Routes>
      <Route path ='/'
        exact
        element = {
        <>
         <h1 className={style.headlinePrimary}>To Do List</h1>
         <button className={style.toggleBtn} onClick={toggleSortOrder}>Asc/Desc</button>
         <button className={style.toggleBtn} onClick={toggleSortByField}>Sort By Field</button>
      
         <AddTodoForm 
           onAddTodo={addTodo} 
           postTodo={postTodo}
          
         />
          {isLoading ? <p>Work in progress...</p> : 
           <TodoList 
             todoList={todoList}
             removeTodo={removeTodo}
           />
         }
      </>}
      />
    <Route path='/new' element={<h1>New Todo List</h1>} />
    </Routes>
  </BrowserRouter>
  </div>
);

 }
 
  export default App;
 