import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { TodoPriority } from "../../types/Todo";

interface TodoItemProps {
  onSubmit: (event: any) => void;
}

const TodoAddForm = ({ onSubmit }: TodoItemProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Enter a new task</Form.Label>
        <Form.Control type="text" maxLength={200} placeholder="Enter task" />
      </Form.Group>
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Priority</Form.Label>
        <Form.Select>
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

export default TodoAddForm;
