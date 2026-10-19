const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function getTodayISO(): string {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

export function formatShortDate(dateString: string): string {
  if (!dateString) return "Belum ditentukan";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${dateString}T12:00:00`));
}

export function getDueLabel(dateString: string): string {
  if (!dateString) return "Tanpa deadline";

  const today = new Date(`${getTodayISO()}T00:00:00`);
  const due = new Date(`${dateString}T00:00:00`);
  const days = Math.round((due.getTime() - today.getTime()) / DAY_IN_MS);

  if (days < 0) return `Terlambat ${Math.abs(days)} hari`;
  if (days === 0) return "Hari ini";
  if (days === 1) return "Besok";
  return `${days} hari lagi`;
}
