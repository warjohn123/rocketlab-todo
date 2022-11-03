import Form from "react-bootstrap/Form";

interface TodoItemProps {
  onSelect: (event: any) => void;
}

const TodoSorting = ({ onSelect }: TodoItemProps) => {
  return (
    <Form.Group className="mb-3 mt-3">
      <Form.Label>Sort by</Form.Label>
      <Form.Select onChange={onSelect}>
        <option value="Priority">Priority</option>
        <option value="Name">Name</option>
      </Form.Select>
    </Form.Group>
  );
};

export default TodoSorting;
