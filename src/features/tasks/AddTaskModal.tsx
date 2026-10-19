import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Task, TaskPriority } from "../../types";
import { createId } from "../../shared/lib/id";
import { getTodayISO } from "../../shared/lib/date";

interface AddTaskModalProps {
  onClose: () => void;
  onAdd: (task: Task) => void;
}

export default function AddTaskModal({ onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState(getTodayISO());
  const [priority, setPriority] = useState<TaskPriority>("Sedang");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !course.trim() || !dueDate) {
      setError("Lengkapi nama tugas, mata kuliah, dan deadline.");
      return;
    }

    onAdd({
      id: createId(),
      title: title.trim(),
      course: course.trim(),
      dueDate,
      priority,
      status: "todo",
    });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="add-task-title">
        <div className="modal-header"><div><h2 id="add-task-title">Tambah tugas baru</h2><p>Catat deadline agar kamu bisa merencanakan waktu.</p></div><button className="icon-button" onClick={onClose} aria-label="Tutup modal"><X size={20} /></button></div>
        <form onSubmit={handleSubmit} className="task-form">
          <label>Nama tugas<input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Contoh: Praktikum Java" maxLength={100} /></label>
          <label>Mata kuliah<input value={course} onChange={(event) => setCourse(event.target.value)} placeholder="Contoh: Pemrograman Berorientasi Objek" maxLength={100} /></label>
          <div className="form-row">
            <label>Deadline<input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></label>
            <label>Prioritas<select value={priority} onChange={(event) => setPriority(event.target.value as TaskPriority)}><option>Tinggi</option><option>Sedang</option><option>Rendah</option></select></label>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions"><button type="button" className="button button--outline" onClick={onClose}>Batal</button><button type="submit" className="button button--primary">Simpan tugas</button></div>
        </form>
      </section>
    </div>
  );
}
