import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface TodoItemProps {
  onSelect: (event: any) => void;
}

const TodoSorting = ({ onSelect }: TodoItemProps) => {
  return (
    <Form.Group className="mb-3 mt-3">
      <Form.Label>Sort by</Form.Label>
      <Form.Select onChange={onSelect}>
        <option value="priority">Priority number</option>
        <option value="name">Name</option>
      </Form.Select>
    </Form.Group>
  );
};

export default TodoSorting;
