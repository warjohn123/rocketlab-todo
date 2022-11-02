import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import TodoInputForm from "./components/TodoInputForm";
import TodoItemsList from "./components/TodoItemsList";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { TodoStatus, TodoType } from "./types/Todo";
import { TodoService } from "./services/todo.service";

function App() {
  const [key, setKey] = useState("on-going");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getTodos = (status?: TodoStatus, sortBy?: string) => {
    const todos = new TodoService().getTodos(status ?? TodoStatus.ONGOING);

    if (sortBy) {
      if (sortBy === "priority") {
        todos.sort((a, b) => a.position - b.position);
      } else {
        todos.sort((a, b) => a.taskName.localeCompare(b.taskName));
      }
    }
    console.log("todos", todos);
    setTodos(todos);
  };
  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    const taskName = event.target[0].value;

    if (!taskName) return;
    new TodoService().addTodo(taskName);
    getTodos();
    setKey("on-going");
    event.target.reset();
  };

  const selectTab = (tabKey: string) => {
    if (tabKey === "on-going") {
      getTodos(TodoStatus.ONGOING);
    } else {
      getTodos(TodoStatus.COMPLETED);
    }
    setKey(tabKey);
  };

  useEffect(() => {
    getTodos(TodoStatus.ONGOING);
  }, []);

  return (
    <Container>
      <TodoInputForm onSubmit={handleOnSubmit} />
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
