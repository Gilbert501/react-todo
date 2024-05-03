
import ToDoListItem from './ToDoListItem';

const TodoList = ({todoList}) => {

  return (
        <ul>
           {todoList.map(({id, title}) => (
           <ToDoListItem key={id} id={id} title={title} />
          ))}
        </ul>
      );
    };

    export default TodoList;