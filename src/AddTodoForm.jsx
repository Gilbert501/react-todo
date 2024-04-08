import React,{useState} from 'react';
import InputWithLabel from './InputWithLabel';

const AddTodoForm = ({onAddTodo}) =>{
  const[todoTitle, setTodoTitle] = useState('');
  
  const handleTitleChange = (event) => {
   const newTodoTitle = event.target.value;
   setTodoTitle(newTodoTitle);
  }
   
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (!todoTitle.trim()) return; 
    
    const newTodo = {
      title: todoTitle,
      id: Date.now()
}
    onAddTodo(newTodo);
    setTodoTitle('');
  }
    return (
        <form> 
        <InputWithLabel 
          id="title"  
          value={todoTitle} 
          onChange={handleTitleChange}
          >
          <strong>Title:</strong>
        </InputWithLabel>
    
          <button type="submit" onClick={handleAddTodo}>Add</button>
        </form>

    );
}

export default AddTodoForm;