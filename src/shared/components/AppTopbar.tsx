import { Bell, ChevronDown, Menu, Search } from "lucide-react";

interface AppTopbarProps {
  onMenuClick: () => void;
  onSearch: (value: string) => void;
}

export default function AppTopbar({ onMenuClick, onSearch }: AppTopbarProps) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenuClick} aria-label="Buka menu"><Menu size={21} /></button>
      <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>Student Dashboard</strong></div>
      <div className="topbar-actions">
        <label className="search-box">
          <Search size={17} />
          <input type="search" placeholder="Cari tugas atau skill..." onChange={(event) => onSearch(event.target.value)} aria-label="Cari tugas atau skill" />
          <kbd>⌘ K</kbd>
        </label>
        <button className="notification-button" aria-label="Notifikasi" title="Pengingat ditampilkan pada dashboard">
          <Bell size={19} /><span />
        </button>
        <div className="topbar-profile">
          <div className="profile-avatar">KP</div>
          <div className="profile-copy"><strong>Karina Putri</strong><span>Mahasiswa</span></div>
          <ChevronDown size={15} className="profile-chevron" />
        </div>
      </div>
    </header>
  );
}
