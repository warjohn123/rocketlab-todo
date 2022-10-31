import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface TodoItemProps {
  onSubmit: (event: any) => void;
}

const TodoInputForm = ({ onSubmit }: TodoItemProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Enter a new task</Form.Label>
        <Form.Control type="text" maxLength={200} placeholder="Enter task" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default TodoInputForm;
