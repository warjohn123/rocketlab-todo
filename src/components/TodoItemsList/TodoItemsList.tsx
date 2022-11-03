import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { TodoService } from "../../services/todo.service";
import { TodoStatus, TodoType } from "../../types/Todo";
import EmptyPlaceholder from "../EmptyPlaceholder";
import TodoSorting from "../TodoSorting";
import Modal from "react-bootstrap/Modal";
import TodoEditForm from "../TodoEditForm";

interface TodoItemsListProps {
  todos: TodoType[];
  refetch: (sortBy?: string) => void;
  status: TodoStatus;
}

const TodoItemsList = ({ todos, refetch, status }: TodoItemsListProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Priority");

  const [selectedTaskToUpdate, setSelectedTaskToUpdate] =
    useState<TodoType | null>(null);
  const completeTodo = (index: number) => {
    new TodoService().completeTodo(index);
    refetch();
  };

  const deleteTodo = (index: number) => {
    new TodoService().deleteTodo(index);
    refetch();
  };

  const onFilterSelect = (e: any) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
  };

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    const taskName = event.target[0].value;
    const priority = event.target[1].value;

    if (!taskName) return;

    new TodoService().updateTodo({
      ...selectedTaskToUpdate,
      taskName,
      priority,
    } as TodoType);

    setSelectedTaskToUpdate(null);
    refetch();
  };

  const updateTask = (todo: TodoType) => {
    setSelectedTaskToUpdate(todo);
  };

  useEffect(() => {
    refetch(selectedFilter);
  }, [selectedFilter]);

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
            className="d-flex justify-content-between align-items-top"
          >
            <div className="ms-2 me-auto">
              <div>
                <div className="fw-bold">{todo.taskName}</div>
                <small>{todo.priority}</small>
              </div>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Action
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {todo.status !== TodoStatus.COMPLETED && (
                  <>
                    <Dropdown.Item onClick={() => updateTask(todo)}>
                      Update Task
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => completeTodo(todo.id)}>
                      Complete Task
                    </Dropdown.Item>
                    {selectedTaskToUpdate && selectedTaskToUpdate.id && (
                      <Modal
                        show={Boolean(
                          selectedTaskToUpdate && selectedTaskToUpdate.id
                        )}
                        onHide={() => setSelectedTaskToUpdate(null)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <TodoEditForm
                            todo={selectedTaskToUpdate}
                            onSubmit={handleOnSubmit}
                          />
                        </Modal.Body>
                      </Modal>
                    )}
                  </>
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
