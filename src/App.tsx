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

  const getTodos = (status?: TodoStatus) => {
    const todos = new TodoService().getTodos(status ?? TodoStatus.ONGOING);

    setTodos(todos);
  };
  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    const taskName = event.target[0].value;
    new TodoService().addTodo(taskName);
    getTodos();
    setKey("on-going");
    event.target.reset();
  };

  const selectTab = (tabKey: string) => {
    if (tabKey === "on-going") {
      getTodos();
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
            <TodoItemsList todos={todos} refetch={getTodos} />
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <TodoItemsList
              todos={todos}
              refetch={() => getTodos(TodoStatus.COMPLETED)}
            />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export default App;
