import { TODO_STORAGE_NAME } from "../constants/storage";
import { TodoStatus, TodoType } from "../types/Todo";

export class TodoService {
  getTodos(status?: TodoStatus): TodoType[] {
    if (!localStorage.getItem(TODO_STORAGE_NAME)) return [];
    const items: TodoType[] =
      JSON.parse(localStorage.getItem(TODO_STORAGE_NAME) ?? "[]") ?? [];

    if (status) {
      return items.filter((item) => item.status === status);
    }

    return items;
  }

  addTodo(taskName: string) {
    const items: TodoType[] = this.getTodos();
    items.push({
      id: items.length + 1,
      taskName,
      status: TodoStatus.ONGOING,
    });
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
