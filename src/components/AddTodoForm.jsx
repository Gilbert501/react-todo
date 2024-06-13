import {useState} from 'react';
import InputWithLabel from './InputWithLabel';
import style from './App.module.css';
import addIconUrl from '../addIcon.svg?asset';
import PropTypes from 'prop-types';

const AddTodoForm = ({onAddTodo, postTodo}) => {
  const[todoTitle, setTodoTitle] = useState('');
  
  const handleTitleChange = (event) => {
   const newTodoTitle = event.target.value;
   setTodoTitle(newTodoTitle);
  }
   
  const handleAddTodo = async (event) => {
    event.preventDefault();
    if (!todoTitle.trim()) return; 
    
    const newTodo = {
      title: todoTitle,
      id: Date.now()
}
    onAddTodo(newTodo);
    await postTodo(newTodo)
    setTodoTitle('');
  }

  return (
        <form className={style.form}> 
        <InputWithLabel 
          id="title"  
          value={todoTitle} 
          onChange={handleTitleChange}
        >
          <strong>Title</strong>
        </InputWithLabel>
    
          <button 
            type="button" 
            onClick={handleAddTodo}
            className={style.button}
          >
               <img 
                 src ={addIconUrl} 
                 className={style.iconImg}
                 alt='Add Icon'
                 /> 
          </button>
      
        </form>

    );
}

 AddTodoForm.propTypes = {
  
  onAddTodo:PropTypes.func.isRequired,
  postTodo:PropTypes.func.isRequired

 
}

export default AddTodoForm;
