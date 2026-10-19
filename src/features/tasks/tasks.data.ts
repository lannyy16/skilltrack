import type { Task } from "../../types";

export const initialTasks: Task[] = [
  {
    id: "task-java",
    title: "Menyelesaikan praktikum Java",
    course: "Pemrograman Berorientasi Objek",
    dueDate: "2026-10-20",
    priority: "Tinggi",
    status: "todo",
  },
  {
    id: "task-ai",
    title: "Laporan praktikum pencarian A*",
    course: "Kecerdasan Buatan",
    dueDate: "2026-10-22",
    priority: "Sedang",
    status: "todo",
  },
  {
    id: "task-web",
    title: "Menyelesaikan halaman dashboard",
    course: "Pengembangan Aplikasi Berbasis Web",
    dueDate: "2026-10-25",
    priority: "Rendah",
    status: "todo",
  },
  {
    id: "task-mpti",
    title: "Membaca materi manajemen proyek",
    course: "Manajemen Proyek TI",
    dueDate: "2026-10-18",
    priority: "Sedang",
    status: "done",
  },
];
