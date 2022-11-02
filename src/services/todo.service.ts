import { TODO_STORAGE_NAME } from "../constants/storage";
import { TodoStatus, TodoType } from "../types/Todo";

export class TodoService {
  getTodos(status?: TodoStatus): TodoType[] {
    if (!localStorage.getItem(TODO_STORAGE_NAME)) return [];
    const items: TodoType[] =
      JSON.parse(localStorage.getItem(TODO_STORAGE_NAME) ?? "[]") ?? [];

    if (status) {
      return items
        .filter((item) => item.status === status)
        .sort((a, b) => a.position - b.position);
    }

    return items.sort((a, b) => a.position - b.position);
  }

  addTodo(taskName: string) {
    const onGoingItems: TodoType[] = this.getTodos(TodoStatus.ONGOING);
    const allItems: TodoType[] = this.getTodos();
    allItems.push({
      id: allItems.length + 1,
      taskName,
      status: TodoStatus.ONGOING,
      position: onGoingItems.length
        ? onGoingItems[onGoingItems.length - 1].position + 1
        : 1,
    });
    localStorage.setItem(TODO_STORAGE_NAME, JSON.stringify(allItems));
  }

  updatePriority(position: number, todo: TodoType) {
    const items: TodoType[] = this.getTodos();
    const selectedTodoPosition = todo.position;
    const selectedTodoIndex = items.findIndex(
      (item) => item.position === position
    );

    const selectedPositionTodoIndex = items.findIndex(
      (item) => item.position === todo.position
    );

    if (selectedPositionTodoIndex !== -1) {
      items[selectedPositionTodoIndex].position = position;
    }

    if (selectedTodoIndex !== -1) {
      items[selectedTodoIndex].position = selectedTodoPosition;
    }

    localStorage.setItem(TODO_STORAGE_NAME, JSON.stringify(items));
  }

  deleteTodo(id: number) {
    const items: TodoType[] = this.getTodos();
    const todoIndex = items.findIndex((item) => item.id === id);

    items.splice(todoIndex, 1);

    localStorage.setItem(TODO_STORAGE_NAME, JSON.stringify(items));
  }

  completeTodo(id: number) {
    const items: TodoType[] = this.getTodos();
    const todoIndex = items.findIndex((item) => item.id === id);

    items[todoIndex].status = TodoStatus.COMPLETED;
    localStorage.setItem(TODO_STORAGE_NAME, JSON.stringify(items));
  }
}
