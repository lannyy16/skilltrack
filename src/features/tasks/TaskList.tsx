import { CalendarClock, Check, Circle, Clock3, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import type { Task } from "../../types";
import { formatShortDate, getDueLabel } from "../../shared/lib/date";

interface TaskListProps {
  tasks: Task[];
  onAdd: () => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  showAll?: boolean;
  onViewAll?: () => void;
}

export default function TaskList({ tasks, onAdd, onToggle, onDelete, showAll = false, onViewAll }: TaskListProps) {
  const visibleTasks = showAll ? tasks : tasks.filter((task) => task.status === "todo").slice(0, 4);

  return (
    <section className="panel task-panel">
      <div className="panel-heading">
        <div><div className="heading-title-row"><h2>{showAll ? "Semua Tugas" : "Tugas Mendatang"}</h2><span className="heading-count">{tasks.filter((task) => task.status === "todo").length}</span></div><p>Jangan sampai ada yang terlewat</p></div>
        <button className="button button--outline button--small" onClick={onAdd}><Plus size={15} /> Tambah tugas</button>
      </div>
      {visibleTasks.length === 0 ? (
        <div className="empty-state"><div className="empty-icon"><Check size={22} /></div><strong>Semua beres!</strong><p>Tidak ada tugas di daftar ini. Tambahkan tugas baru jika ada.</p><button className="button button--primary button--small" onClick={onAdd}><Plus size={15} /> Tambah tugas</button></div>
      ) : (
        <div className="task-list">
          {visibleTasks.map((task) => {
            const isDone = task.status === "done";
            const dueLabel = getDueLabel(task.dueDate);
            const isOverdue = dueLabel.startsWith("Terlambat");
            return (
              <article className={`task-row ${isDone ? "task-row--done" : ""}`} key={task.id}>
                <button className={`task-check ${isDone ? "task-check--done" : ""}`} onClick={() => onToggle(task.id)} aria-label={isDone ? `Tandai ${task.title} belum selesai` : `Tandai ${task.title} selesai`}>
                  {isDone ? <Check size={14} /> : <Circle size={19} />}
                </button>
                <div className="task-main">
                  <strong>{task.title}</strong>
                  <span>{task.course}</span>
                </div>
                <div className="task-due"><CalendarClock size={14} /><span>{formatShortDate(task.dueDate)}</span><small className={isOverdue ? "due-overdue" : ""}>{dueLabel}</small></div>
                <span className={`priority priority--${task.priority.toLowerCase()}`}>{task.priority}</span>
                <button className="task-more" onClick={() => onDelete(task.id)} aria-label={`Hapus ${task.title}`} title="Hapus tugas"><Trash2 size={16} /></button>
              </article>
            );
          })}
        </div>
      )}
      {!showAll && tasks.filter((task) => task.status === "todo").length > 4 && <button className="text-link task-view-all" onClick={onViewAll ?? onAdd}>Kelola semua tugas <span>→</span></button>}
      <div className="task-panel-foot"><span><Clock3 size={14} /> Prioritaskan tugas dengan deadline terdekat.</span><button className="icon-button subtle-icon" aria-label="Opsi tugas" title="Gunakan tombol tempat sampah untuk menghapus tugas"><MoreHorizontal size={18} /></button></div>
    </section>
  );
}
