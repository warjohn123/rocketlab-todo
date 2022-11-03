import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import TodoAddForm from "./components/TodoAddForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TodoItemsList from "./components/TodoItemsList";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { TodoStatus, TodoType } from "./types/Todo";
import { TodoService } from "./services/todo.service";

function App() {
  const [key, setKey] = useState("on-going");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);

  const getTodos = (status?: TodoStatus, sortBy?: string) => {
    const todos = new TodoService().getTodos(status ?? TodoStatus.ONGOING);
    if (sortBy) {
      if (sortBy === "Priority") {
        const order = ["High", "Medium", "Low"];
        todos.sort(
          (x, y) => order.indexOf(x.priority) - order.indexOf(y.priority)
        );
      } else {
        todos.sort((a, b) => a.taskName.localeCompare(b.taskName));
      }
    }
    setTodos(todos);
  };
  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    const taskName = event.target[0].value;
    const priority = event.target[1].value;

    const todoObj = {
      taskName,
      priority,
    };

    console.log("priority", priority);

    if (!taskName) return;
    new TodoService().addTodo(todoObj);
    getTodos();
    setKey("on-going");
    setIsAddTaskOpen(false);
    event.target.reset();
  };

  const selectTab = (tabKey: string) => {
    if (tabKey === "on-going") {
      getTodos(TodoStatus.ONGOING, "Priority");
    } else {
      getTodos(TodoStatus.COMPLETED, "Priority");
    }
    setKey(tabKey);
  };

  useEffect(() => {
    getTodos(TodoStatus.ONGOING, "Priority");
  }, []);

  return (
    <Container>
      <Button
        variant="primary"
        className="mt-3"
        onClick={() => setIsAddTaskOpen(true)}
      >
        Click to Add Task
      </Button>
      <Modal show={isAddTaskOpen} onHide={() => setIsAddTaskOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TodoAddForm onSubmit={handleOnSubmit} />
        </Modal.Body>
      </Modal>
      <div className="mt-4">
        <Tabs
          id="todo-tab"
          activeKey={key}
          onSelect={(k: any) => selectTab(k)}
          className="mb-3"
        >
          <Tab eventKey="on-going" title="On-going">
            <TodoItemsList
              todos={todos}
              refetch={(sortBy?: string) =>
                getTodos(TodoStatus.ONGOING, sortBy)
              }
              status={TodoStatus.ONGOING}
            />
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <TodoItemsList
              todos={todos}
              refetch={(sortBy?: string) =>
                getTodos(TodoStatus.COMPLETED, sortBy)
              }
              status={TodoStatus.COMPLETED}
            />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export default App;
