interface TodoItemProps {
  taskName: string;
}

const TodoItem = ({ taskName }: TodoItemProps) => {
  return <div>{taskName}</div>;
};

export default TodoItem;
