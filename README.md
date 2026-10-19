# SkillTrack

SkillTrack adalah dashboard mahasiswa untuk mengelola deadline tugas sekaligus membangun skill secara terarah.

## Fitur yang tersedia

- Dashboard ringkasan tugas, deadline terdekat, skill aktif, dan progres belajar.
- Tambah tugas dengan mata kuliah, tanggal deadline, dan prioritas.
- Tandai tugas selesai dan hapus tugas.
- Filter tugas berdasarkan status.
- Roadmap skill dengan progres yang dapat diperbarui.
- Simpan data di `localStorage`, sehingga data demo tetap ada setelah browser dimuat ulang.
- Responsive layout untuk desktop, tablet, dan ponsel.
- Struktur feature-based agar fitur mudah dikembangkan tanpa menumpuk semua kode di satu file.

## Teknologi

- React 19 + TypeScript
- Vite
- Lucide React
- CSS custom (tanpa framework CSS tambahan)

## Menjalankan project

Pastikan Node.js atau Bun sudah terpasang.

```bash
bun install
bun run dev
```

Alternatif menggunakan npm:

```bash
npm install
npm run dev
```

Buka URL lokal yang ditampilkan oleh Vite.

## Memeriksa project

```bash
bun run typecheck
bun run build
```

## Struktur folder

```text
src/
├── app/
│   └── App.tsx
├── features/
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   ├── skills/
│   │   ├── SkillCard.tsx
│   │   └── skills.data.ts
│   └── tasks/
│       ├── AddTaskModal.tsx
│       ├── TaskList.tsx
│       └── tasks.data.ts
├── shared/
│   ├── components/
│   │   ├── AppSidebar.tsx
│   │   ├── AppTopbar.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StatCard.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   └── lib/
│       ├── date.ts
│       └── id.ts
├── types/
│   └── index.ts
├── main.tsx
└── styles.css
```

## Catatan arsitektur

- **Feature-based:** komponen dan data khusus tugas berada di `features/tasks`, skill di `features/skills`, dan dashboard di `features/dashboard`.
- **Single responsibility:** komponen UI dipisah dari tipe data, helper tanggal, dan persistence.
- **Type safety:** tipe `Task` dan `Skill` digunakan untuk mengurangi kesalahan data.
- **Reusable components:** kartu statistik, progress bar, sidebar, dan topbar digunakan ulang.
- **Persistence:** custom hook `useLocalStorage` mengelola baca/tulis data browser.
- **Mudah dikembangkan:** autentikasi, backend API, email/browser notifications, dan unit test dapat ditambahkan sebagai tahap selanjutnya.

## Batasan versi awal

Versi ini adalah prototype frontend. Data disimpan di browser pengguna, belum tersinkron ke akun atau perangkat lain. Pengingat ditampilkan di dashboard; notifikasi push/email belum diimplementasikan.
