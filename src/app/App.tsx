import { useMemo, useState } from "react";
import { BookOpen, CircleHelp, Settings2, Sparkles, Target } from "lucide-react";
import AppSidebar from "../shared/components/AppSidebar";
import AppTopbar from "../shared/components/AppTopbar";
import DashboardPage from "../features/dashboard/DashboardPage";
import TaskList from "../features/tasks/TaskList";
import AddTaskModal from "../features/tasks/AddTaskModal";
import SkillCard from "../features/skills/SkillCard";
import { initialTasks } from "../features/tasks/tasks.data";
import { initialSkills } from "../features/skills/skills.data";
import { useLocalStorage } from "../shared/hooks/useLocalStorage";
import type { Skill, Task } from "../types";

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("skilltrack.tasks.v1", initialTasks);
  const [skills, setSkills] = useLocalStorage<Skill[]>("skilltrack.skills.v1", initialSkills);
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return tasks.filter((task) => `${task.title} ${task.course}`.toLowerCase().includes(query));
  }, [tasks, searchQuery]);

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return skills.filter((skill) => `${skill.title} ${skill.category} ${skill.description}`.toLowerCase().includes(query));
  }, [skills, searchQuery]);

  function addTask(task: Task) {
    setTasks((current) => [task, ...current]);
    setIsAddTaskOpen(false);
  }

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, status: task.status === "done" ? "todo" : "done" } : task,
    ));
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function advanceSkill(id: string) {
    setSkills((current) => current.map((skill) =>
      skill.id === id ? { ...skill, progress: Math.min(100, skill.progress + 10) } : skill,
    ));
  }

  const pageTitle: Record<string, string> = {
    dashboard: "Student Dashboard",
    tasks: "Tugas & Deadline",
    skills: "Skill Roadmap",
    resources: "Materi Belajar",
    progress: "Progres Saya",
    settings: "Pengaturan",
    help: "Pusat Bantuan",
  };

  return (
    <div className="app-shell">
      <AppSidebar activeView={activeView} onNavigate={setActiveView} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="main-area">
        <AppTopbar onMenuClick={() => setIsSidebarOpen(true)} onSearch={setSearchQuery} />
        {activeView === "dashboard" ? (
          <DashboardPage
            tasks={tasks}
            skills={skills}
            searchQuery={searchQuery}
            onAddTask={() => setIsAddTaskOpen(true)}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onViewAllTasks={() => setActiveView("tasks")}
            onSkillProgress={advanceSkill}
            onViewAllSkills={() => setActiveView("skills")}
          />
        ) : (
          <section className="subpage">
            <div className="subpage-heading"><div className="eyebrow"><Sparkles size={14} /> KEEP MOVING FORWARD</div><h1>{pageTitle[activeView] ?? "SkillTrack"}</h1><p>Kelola perjalanan belajar dan produktivitasmu dari satu tempat.</p></div>
            {activeView === "tasks" && <TaskList tasks={filteredTasks} showAll onAdd={() => setIsAddTaskOpen(true)} onToggle={toggleTask} onDelete={deleteTask} />}
            {activeView === "skills" && <section className="panel subpage-panel"><div className="panel-heading"><div><h2>Roadmap skill kamu</h2><p>Pilih skill, lanjutkan milestone, dan catat progresnya.</p></div></div><div className="skills-grid">{filteredSkills.map((skill) => <SkillCard key={skill.id} skill={skill} onProgress={advanceSkill} />)}</div>{filteredSkills.length === 0 && <div className="inline-empty">Tidak ada skill yang cocok dengan pencarianmu.</div>}</section>}
            {activeView === "resources" && <section className="resource-grid">{[{title:"Web Development",desc:"Mulai dari HTML, CSS, JavaScript, lalu bangun proyek kecil.",tag:"Frontend",icon:BookOpen,url:"https://developer.mozilla.org/en-US/docs/Learn"},{title:"Java Programming",desc:"Pelajari sintaks, OOP, collection, dan testing.",tag:"Programming",icon:Target,url:"https://dev.java/learn/"},{title:"UI/UX Design",desc:"Pahami dasar desain, wireframe, dan usability.",tag:"Design",icon:Sparkles,url:"https://www.figma.com/resource-library/"}].map(({title,desc,tag,icon:Icon,url}) => <article className="resource-card" key={title}><div className="resource-icon"><Icon size={21} /></div><span className="resource-tag">{tag}</span><h3>{title}</h3><p>{desc}</p><a href={url} target="_blank" rel="noreferrer">Buka materi <span>↗</span></a></article>)}</section>}
            {activeView === "progress" && <section className="panel progress-overview"><div className="panel-heading"><div><h2>Ringkasan perkembangan</h2><p>Progres yang tersimpan di browser ini.</p></div></div><div className="progress-overview-stats"><div><span>Tugas selesai</span><strong>{tasks.filter((task) => task.status === "done").length}/{tasks.length}</strong></div><div><span>Rata-rata skill</span><strong>{skills.length ? Math.round(skills.reduce((sum, skill) => sum + skill.progress, 0) / skills.length) : 0}%</strong></div><div><span>Skill tercapai</span><strong>{skills.filter((skill) => skill.progress === 100).length}</strong></div></div><div className="progress-skill-list">{skills.map((skill) => <div className="progress-skill-row" key={skill.id}><span>{skill.title}</span><strong>{skill.progress}%</strong><div className="full-width-progress"><div style={{width:`${skill.progress}%`}} /></div></div>)}</div></section>}
            {activeView === "settings" && <section className="panel simple-panel"><div className="simple-panel-icon"><Settings2 size={25} /></div><h2>Pengaturan prototype</h2><p>Data tugas dan skill tersimpan di browser menggunakan localStorage. Untuk mengulang data demo, hapus data situs SkillTrack dari pengaturan browser.</p><button className="button button--outline" onClick={() => { if (window.confirm("Reset seluruh tugas dan progres skill ke data demo?")) { setTasks(initialTasks); setSkills(initialSkills); } }}>Reset data demo</button></section>}
            {activeView === "help" && <section className="panel simple-panel"><div className="simple-panel-icon"><CircleHelp size={25} /></div><h2>Mulai menggunakan SkillTrack</h2><p>Tambahkan tugas beserta deadline, tandai tugas saat selesai, lalu buka Skill Roadmap untuk memperbarui progres belajar.</p><button className="button button--primary" onClick={() => setActiveView("dashboard")}>Kembali ke dashboard</button></section>}
          </section>
        )}
      </main>
      {isAddTaskOpen && <AddTaskModal onClose={() => setIsAddTaskOpen(false)} onAdd={addTask} />}
    </div>
  );
}
