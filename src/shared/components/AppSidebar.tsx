import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CircleHelp,
  GraduationCap,
  LayoutDashboard,
  Settings2,
  Sparkles,
  Target,
  X,
} from "lucide-react";

interface AppSidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const primaryNav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Tugas & Deadline", icon: CalendarDays, count: "3" },
  { id: "skills", label: "Skill Roadmap", icon: Target },
  { id: "resources", label: "Materi Belajar", icon: BookOpen },
];

export default function AppSidebar({
  activeView,
  onNavigate,
  isOpen,
  onClose,
}: AppSidebarProps) {
  const navigate = (view: string) => {
    onNavigate(view);
    onClose();
  };

  return (
    <>
      {isOpen && <button className="sidebar-backdrop" onClick={onClose} aria-label="Tutup menu" />}
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><GraduationCap size={23} /></div>
          <div className="brand-name">skilltrack<span>.</span><small>STUDENT SPACE</small></div>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Tutup sidebar"><X size={19} /></button>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">K</div>
          <div className="workspace-copy"><strong>Karina's space</strong><span>Student account</span></div>
          <span className="switcher-dots">•••</span>
        </div>

        <p className="nav-section-label">MENU UTAMA</p>
        <nav className="side-nav" aria-label="Menu utama">
          {primaryNav.map(({ id, label, icon: Icon, count }) => (
            <button
              className={`nav-item ${activeView === id ? "nav-item--active" : ""}`}
              key={id}
              onClick={() => navigate(id)}
            >
              <Icon size={19} />
              <span>{label}</span>
              {count && <span className="nav-count">{count}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-promo">
          <div className="promo-spark"><Sparkles size={17} /></div>
          <strong>Small steps, big growth.</strong>
          <p>Konsisten 30 menit sehari bisa membawa perubahan besar.</p>
          <button onClick={() => navigate("skills")}>Lihat target skill <span>→</span></button>
          <div className="promo-decoration promo-decoration--one" />
          <div className="promo-decoration promo-decoration--two" />
        </div>

        <div className="sidebar-bottom">
          <p className="nav-section-label">LAINNYA</p>
          <button className={`nav-item ${activeView === "progress" ? "nav-item--active" : ""}`} onClick={() => navigate("progress")}><BarChart3 size={19} /><span>Progres Saya</span></button>
          <button className={`nav-item ${activeView === "settings" ? "nav-item--active" : ""}`} onClick={() => navigate("settings")}><Settings2 size={19} /><span>Pengaturan</span></button>
          <button className="nav-item" onClick={() => navigate("help")}><CircleHelp size={19} /><span>Pusat Bantuan</span></button>
          <div className="sidebar-footer"><span className="footer-dot" /> Semangat belajar hari ini!</div>
        </div>
      </aside>
    </>
  );
}
