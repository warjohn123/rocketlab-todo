import { Dropdown } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { TodoService } from "../../services/todo.service";
import { TodoStatus, TodoType } from "../../types/Todo";
import EmptyPlaceholder from "../EmptyPlaceholder";

interface TodoItemsListProps {
  todos: TodoType[];
  refetch: () => void;
}

const TodoItemsList = ({ todos, refetch }: TodoItemsListProps) => {
  const completeTodo = (index: number) => {
    new TodoService().completeTodo(index);
    refetch();
  };

  const deleteTodo = (index: number) => {
    new TodoService().deleteTodo(index);
    refetch();
  };

  if (!todos.length) {
    return <EmptyPlaceholder />;
  }

  return (
    <>
      <h4>Total: {todos.length}</h4>
      <ListGroup as="ol" numbered>
        {todos.map((todo) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold" style={{ wordBreak: "break-word" }}>
                {todo.taskName}
              </div>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Action
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {todo.status !== TodoStatus.COMPLETED && (
                  <Dropdown.Item onClick={() => completeTodo(todo.id)}>
                    Complete Task
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => deleteTodo(todo.id)}>
                  Delete Task
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TodoItemsList;
