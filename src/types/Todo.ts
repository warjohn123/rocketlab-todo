export enum TodoStatus {
  ONGOING = "ongoing",
  COMPLETED = "completed",
}

export interface TodoType {
  id: number;
  taskName: string;
  status: TodoStatus;
}
