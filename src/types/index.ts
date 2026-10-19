export type TaskPriority = "Tinggi" | "Sedang" | "Rendah";
export type TaskStatus = "todo" | "done";

export interface Task {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  progress: number;
  accent: "purple" | "blue" | "orange";
  nextStep: string;
}
