import type { Skill } from "../../types";

export const initialSkills: Skill[] = [
  {
    id: "skill-web",
    title: "Web Development",
    category: "Teknologi",
    description: "Bangun website yang responsif dan mudah digunakan.",
    progress: 40,
    accent: "purple",
    nextStep: "Pelajari dasar JavaScript",
  },
  {
    id: "skill-java",
    title: "Java Programming",
    category: "Pemrograman",
    description: "Perkuat OOP, collection, dan pengujian unit.",
    progress: 65,
    accent: "blue",
    nextStep: "Latihan interface dan unit testing",
  },
  {
    id: "skill-uiux",
    title: "UI/UX Design",
    category: "Desain",
    description: "Rancang pengalaman pengguna yang jelas dan konsisten.",
    progress: 25,
    accent: "orange",
    nextStep: "Buat wireframe halaman utama",
  },
];
