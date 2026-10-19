import { ArrowRight, BookOpen, CalendarCheck2, CheckCircle2, Clock3, Flame, Sparkles, Target } from "lucide-react";
import type { Skill, Task } from "../../types";
import StatCard from "../../shared/components/StatCard";
import TaskList from "../tasks/TaskList";
import SkillCard from "../skills/SkillCard";
import ProgressBar from "../../shared/components/ProgressBar";
import { getDueLabel } from "../../shared/lib/date";

interface DashboardPageProps {
  tasks: Task[];
  skills: Skill[];
  searchQuery: string;
  onAddTask: () => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onViewAllTasks: () => void;
  onSkillProgress: (id: string) => void;
  onViewAllSkills: () => void;
}

export default function DashboardPage({
  tasks,
  skills,
  searchQuery,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onViewAllTasks,
  onSkillProgress,
  onViewAllSkills,
}: DashboardPageProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    `${task.title} ${task.course}`.toLowerCase().includes(normalizedQuery),
  );
  const filteredSkills = skills.filter((skill) =>
    `${skill.title} ${skill.category} ${skill.description}`.toLowerCase().includes(normalizedQuery),
  );
  const activeTasks = tasks.filter((task) => task.status === "todo");
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const closestTask = [...activeTasks].sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
  const averageProgress = skills.length
    ? Math.round(skills.reduce((total, skill) => total + skill.progress, 0) / skills.length)
    : 0;

  return (
    <div className="dashboard-page">
      <section className="welcome-row">
        <div><div className="eyebrow"><Sparkles size={14} /> YOUR PERSONAL GROWTH SPACE</div><h1>Selamat pagi, Karina <span className="wave">✦</span></h1><p>Siap jadi versi terbaik dirimu hari ini? Yuk, mulai dari langkah kecil.</p></div>
        <div className="welcome-date"><CalendarCheck2 size={17} /><span>Senin, 19 Oktober 2026</span></div>
      </section>

      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-tag"><Sparkles size={13} /> WEEKLY FOCUS</div>
          <h2>Progress kecil,<br /><span>hasil yang berarti.</span></h2>
          <p>Konsisten belajar sedikit setiap hari lebih baik daripada menunggu waktu yang sempurna.</p>
          <button className="hero-button" onClick={onViewAllSkills}>Lanjutkan perjalanan <ArrowRight size={16} /></button>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit hero-orbit--outer" />
          <div className="hero-orbit hero-orbit--inner" />
          <div className="hero-sun"><Sparkles size={29} /></div>
          <div className="hero-floating hero-floating--top"><Target size={17} /><span>Stay focused</span></div>
          <div className="hero-floating hero-floating--bottom"><CheckCircle2 size={18} /><span>One step at a time</span></div>
          <div className="hero-star hero-star--one">✦</div><div className="hero-star hero-star--two">✧</div><div className="hero-star hero-star--three">✦</div>
        </div>
        <div className="hero-circle hero-circle--one" /><div className="hero-circle hero-circle--two" />
      </section>

      <section className="stats-grid" aria-label="Ringkasan aktivitas">
        <StatCard label="Tugas aktif" value={activeTasks.length} caption="Yang perlu diselesaikan" icon={BookOpen} tone="purple" />
        <StatCard label="Deadline terdekat" value={closestTask ? getDueLabel(closestTask.dueDate) : "Aman"} caption={closestTask ? closestTask.title : "Tidak ada tugas aktif"} icon={Clock3} tone="orange" />
        <StatCard label="Skill dipelajari" value={skills.length} caption="Target pengembangan diri" icon={Target} tone="blue" />
        <StatCard label="Tugas selesai" value={completedTasks} caption="Langkah maju yang berarti" icon={CheckCircle2} tone="green" />
      </section>

      <div className="content-grid">
        <div className="content-main">
          <TaskList tasks={filteredTasks} onAdd={onAddTask} onToggle={onToggleTask} onDelete={onDeleteTask} onViewAll={onViewAllTasks} />
          <section className="panel skills-panel">
            <div className="panel-heading"><div><div className="heading-title-row"><h2>Skill yang sedang dikembangkan</h2></div><p>Terus bergerak, satu langkah setiap hari</p></div><button className="text-link" onClick={onViewAllSkills}>Lihat semua <ArrowRight size={15} /></button></div>
            {filteredSkills.length ? <div className="skills-grid">{filteredSkills.slice(0, 3).map((skill) => <SkillCard key={skill.id} skill={skill} onProgress={onSkillProgress} />)}</div> : <div className="inline-empty">Tidak ada skill yang cocok dengan pencarianmu.</div>}
          </section>
        </div>

        <aside className="content-aside">
          <section className="panel focus-panel">
            <div className="panel-heading"><div><div className="heading-title-row"><h2>Fokus minggu ini</h2><span className="focus-icon"><Flame size={16} /></span></div><p>Pelan-pelan asal konsisten</p></div></div>
            <div className="weekly-progress"><div className="weekly-progress-top"><span>Target belajar</span><strong>{averageProgress}%</strong></div><ProgressBar value={averageProgress} color="purple" /></div>
            <div className="focus-divider" />
            <div className="focus-goal"><div className="goal-check"><CheckCircle2 size={17} /></div><div><strong>Belajar 30 menit per hari</strong><p>Bangun kebiasaan yang berkelanjutan.</p></div></div>
            <div className="focus-goal"><div className="goal-check goal-check--soft"><Target size={17} /></div><div><strong>Selesaikan satu milestone</strong><p>Pilih satu skill untuk jadi prioritas.</p></div></div>
            <button className="focus-action" onClick={onViewAllSkills}>Atur target mingguan <ArrowRight size={15} /></button>
          </section>

          <section className="quote-card">
            <div className="quote-mark">“</div>
            <p>Kesuksesan adalah hasil dari usaha kecil yang dilakukan berulang kali.</p>
            <div className="quote-footer"><span /> CATATAN UNTUK DIRI SENDIRI</div>
            <div className="quote-decoration" />
          </section>

          <section className="mini-summary">
            <div className="mini-summary-icon"><CalendarCheck2 size={18} /></div>
            <div><strong>Jaga ritmemu!</strong><p>Atur tugas lebih awal supaya punya waktu untuk belajar hal baru.</p></div>
          </section>
        </aside>
      </div>
      <footer className="page-footer"><span>Made for your growth <span className="footer-heart">♥</span></span><span>SkillTrack · Student Space</span></footer>
    </div>
  );
}
