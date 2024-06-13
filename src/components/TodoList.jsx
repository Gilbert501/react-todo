import ToDoListItem from './ToDoListItem';
import PropTypes from 'prop-types';

const TodoList = ({todoList, removeTodo}) => {

  return (
        <ul>
           {todoList.map(({id, title}) => (
           <ToDoListItem 
             key={id} 
             id={id} 
             title={title}
             removeTodo={removeTodo} />
          ))}
        </ul>
      );
    };

TodoList.propTypes = {
  todoList:PropTypes.array.isRequired,
  removeTodo:PropTypes.func.isRequired
}
    export default TodoList;