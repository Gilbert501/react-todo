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

export default ToDoListItem;