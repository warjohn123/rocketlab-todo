import { TODO_STORAGE_NAME } from "../constants/storage";
import { TodoPriority, TodoStatus, TodoType } from "../types/Todo";

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

  addTodo(todoObj: { taskName: string; priority: TodoPriority }) {
    const allItems: TodoType[] = this.getTodos();
    allItems.push({
      id: allItems.length + 1,
      taskName: todoObj.taskName,
      status: TodoStatus.ONGOING,
      priority: todoObj.priority,
    });
    localStorage.setItem(TODO_STORAGE_NAME, JSON.stringify(allItems));
  }

  updateTodo(todoObj: TodoType) {
    const items: TodoType[] = this.getTodos();
    const todoIndex = items.findIndex((item) => item.id === todoObj.id);

    if (todoIndex === -1) {
      return;
    }
    items[todoIndex] = todoObj;
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

    if (todoIndex === -1) {
      return;
    }

    items[todoIndex].status = TodoStatus.COMPLETED;
    localStorage.setItem(TODO_STORAGE_NAME, JSON.stringify(items));
  }
}
