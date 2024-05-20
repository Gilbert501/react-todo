import ToDoListItem from './ToDoListItem';
import PropTypes from 'prop-types';

const TodoList = ({todoList}) => {

  return (
        <ul>
           {todoList.map(({id, title}) => (
           <ToDoListItem key={id} id={id} title={title} />
          ))}
        </ul>
      );
    };

TodoList.propTypes = {
  todoList:PropTypes.array
}
    export default TodoList;