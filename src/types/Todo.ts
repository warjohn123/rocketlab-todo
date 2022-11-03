export enum TodoStatus {
  ONGOING = "ongoing",
  COMPLETED = "completed",
}

export enum TodoPriority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

export interface TodoType {
  id: number;
  taskName: string;
  status: TodoStatus;
  priority: TodoPriority;
}
