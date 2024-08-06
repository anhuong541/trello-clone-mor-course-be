export type TaskStatusType = "Open" | "In-progress" | "Resolved" | "Closed";
export type PriorityType = "Low" | "Medium" | "High";

export interface TaskType {
  projectId: string;
  title: string;
  description: string;
  taskStatus: TaskStatusType;
  storyPoint: 1 | 2 | 3 | 5 | 8 | 13 | 21;
  startDate: number;
  dueDate: number;
  priority: PriorityType;
}

export interface ProjectType {
  projectName: string;
  description: string;
  createAt: number;
}
