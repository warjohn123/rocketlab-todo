import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { TodoPriority, TodoType } from "../../types/Todo";
import { useState } from "react";

interface TodoItemProps {
  onSubmit: (event: any) => void;
  todo: TodoType;
}

const TodoEditForm = ({ onSubmit, todo }: TodoItemProps) => {
  const [taskName, setTaskName] = useState<string>(todo.taskName ?? "");
  const [priority, setPriority] = useState<TodoPriority>(todo.priority ?? "");
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Enter a new task</Form.Label>
        <Form.Control
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          type="text"
          maxLength={200}
          placeholder="Enter task"
        />
      </Form.Group>
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TodoPriority)}
        >
          <option value={TodoPriority.HIGH}>{TodoPriority.HIGH}</option>
          <option value={TodoPriority.MEDIUM}>{TodoPriority.MEDIUM}</option>
          <option value={TodoPriority.LOW}>{TodoPriority.LOW}</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default TodoEditForm;
