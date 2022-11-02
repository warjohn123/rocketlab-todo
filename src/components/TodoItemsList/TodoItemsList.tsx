import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { TodoService } from "../../services/todo.service";
import { TodoStatus, TodoType } from "../../types/Todo";
import EmptyPlaceholder from "../EmptyPlaceholder";
import Form from "react-bootstrap/Form";
import TodoSorting from "../TodoSorting";

interface TodoItemsListProps {
  todos: TodoType[];
  refetch: (sortBy?: string) => void;
  status: TodoStatus;
}

const TodoItemsList = ({ todos, refetch, status }: TodoItemsListProps) => {
  const completeTodo = (index: number) => {
    new TodoService().completeTodo(index);
    refetch();
  };

  const [editingPriority, setEditingPriority] = useState<number>(-1);
  const [priorityValue, setPriorityValue] = useState<number>(-1);

  const deleteTodo = (index: number) => {
    new TodoService().deleteTodo(index);
    refetch();
  };

  const updatePriority = (e: any, todo: TodoType) => {
    e.preventDefault();
    const value = parseInt(e.target[0].value);
    setEditingPriority(-1);
    new TodoService().updatePriority(value, todo);
    refetch();
  };

  const editTaskPriority = (todo: TodoType) => {
    setEditingPriority(todo.position);
    setPriorityValue(todo.position);
  };

  const onFilterSelect = (e: any) => {
    console.log("e", e.target.value);
    const filter = e.target.value as "priority" | "name";

    refetch(filter);
  };

  if (!todos.length) {
    return <EmptyPlaceholder />;
  }

  return (
    <>
      <h4>Total: {todos.length}</h4>
      <TodoSorting onSelect={onFilterSelect} />
      <ListGroup>
        {todos.map((todo, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="ms-2 me-auto">
              {status === TodoStatus.COMPLETED && (
                <div className="fw-bold d-flex align-items-center">
                  <span>{todo.position}.</span>
                  &nbsp;
                  <span>{todo.taskName}</span>
                </div>
              )}
              {status === TodoStatus.ONGOING && (
                <div
                  className="fw-bold d-flex align-items-center"
                  style={{ wordBreak: "break-word" }}
                >
                  {editingPriority !== todo.position && (
                    <span
                      onClick={() => editTaskPriority(todo)}
                      style={{ cursor: "pointer" }}
                    >
                      {todo.position}.
                    </span>
                  )}
                  {editingPriority === todo.position && (
                    <Form
                      onSubmit={(e) => updatePriority(e, todo)}
                      style={{ width: 80 }}
                      className="mr-3"
                    >
                      <Form.Group className="mb-3 mt-3">
                        <Form.Control
                          type="number"
                          onChange={(e: any) =>
                            setPriorityValue(e.target.value)
                          }
                          value={priorityValue}
                          maxLength={200}
                        />
                      </Form.Group>
                    </Form>
                  )}
                  &nbsp;
                  <span>{todo.taskName}</span>
                </div>
              )}
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
