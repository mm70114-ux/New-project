import type { Achievement } from "@/types";

const rarityStyles = {
  普通: "border-stone-700 text-stone-200",
  稀有: "border-teal-500 text-teal-200",
  史诗: "border-indigo-400 text-indigo-200",
  传说: "border-achievementYellow text-achievementYellow",
};

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <article className="rounded-xl border border-stone-800 bg-cardBlack p-4 shadow-glow">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-achievementYellow">ACHIEVEMENT</p>
          <h3 className="mt-1 text-lg font-black leading-tight text-white">
            {achievement.title}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-1 text-xs font-bold ${rarityStyles[achievement.rarity]}`}
        >
          {achievement.rarity}
        </span>
      </div>
      <p className="text-sm leading-6 text-stone-300">{achievement.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
        <span>{achievement.category}</span>
        <span>LV.{achievement.level}</span>
      </div>
    </article>
  );
}
