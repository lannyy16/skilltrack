import { ArrowRight, BookOpen, CheckCircle2, Code2, Palette, Sparkles } from "lucide-react";
import type { Skill } from "../../types";
import ProgressBar from "../../shared/components/ProgressBar";

interface SkillCardProps {
  skill: Skill;
  onProgress: (id: string) => void;
}

const iconByAccent = {
  purple: Code2,
  blue: BookOpen,
  orange: Palette,
};

export default function SkillCard({ skill, onProgress }: SkillCardProps) {
  const Icon = iconByAccent[skill.accent];

  return (
    <article className="skill-card">
      <div className="skill-card-top">
        <div className={`skill-icon skill-icon--${skill.accent}`}><Icon size={21} /></div>
        <span className={`skill-category skill-category--${skill.accent}`}>{skill.category}</span>
      </div>
      <h3>{skill.title}</h3>
      <p className="skill-description">{skill.description}</p>
      <div className="skill-progress-label"><span>Progres belajar</span><strong>{skill.progress}%</strong></div>
      <ProgressBar value={skill.progress} color={skill.accent} size="small" />
      <div className="skill-next-step"><Sparkles size={14} /><span><strong>Langkah berikutnya</strong>{skill.nextStep}</span></div>
      <button className="skill-continue" onClick={() => onProgress(skill.id)} disabled={skill.progress >= 100}>
        {skill.progress >= 100 ? <><CheckCircle2 size={15} /> Skill tercapai</> : <>Lanjut belajar <ArrowRight size={15} /></>}
      </button>
    </article>
  );
}
