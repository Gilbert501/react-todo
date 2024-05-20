import PropTypes from 'prop-types';
import style from './TodoListItem.module.css'

const ToDoListItem = ({id, title}) => {
  return (
    
      <li 
        key={id} 
        className={style.ListItem}
      >
        {title}
       </ li>
    );
};

ToDoListItem.propTypes = {
  id:PropTypes.string,
  title:PropTypes.string
}
export default ToDoListItem;