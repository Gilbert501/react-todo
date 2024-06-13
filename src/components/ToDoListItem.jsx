import PropTypes from 'prop-types';
import style from './TodoListItem.module.css'

const ToDoListItem = ({id, title, removeTodo}) => {
  
    const onRemoveTodo = () => {
      removeTodo(id);
    }
    
    return (
       <li 
        key={id} 
        className={style.ListItem}
      >
        {title}
        <button 
        type='button'
        className={style.removeBtn}
        onClick={onRemoveTodo}>
          Remove
          </button>
       </ li>
    );
};

ToDoListItem.propTypes = {
  id:PropTypes.string.isRequired,
  title:PropTypes.string.isRequired,
  removeTodo:PropTypes.func.isRequired
}
export default ToDoListItem;