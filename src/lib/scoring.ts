import { achievements, totalAchievementCount } from "@/data/achievements";
import { defaultResultId, resultTypes } from "@/data/resultTypes";
import type { Achievement, QuestionOption, Tag, TestResult } from "@/types";

const allTags: Tag[] = [
  "hardcore",
  "social",
  "gear",
  "beginner",
  "park",
  "powder",
  "budget",
  "apres",
  "teacher",
  "brave",
  "planner",
  "poser",
  "snowboard",
  "ski",
  "dual",
];

export function calculateResult(selectedOptions: QuestionOption[]): TestResult {
  const tagScores = allTags.reduce(
    (scores, tag) => ({ ...scores, [tag]: 0 }),
    {} as Record<Tag, number>,
  );

  selectedOptions.forEach((option) => {
    option.tags.forEach((tag) => {
      tagScores[tag] += 1;
    });
  });

  const sortedTags = [...allTags].sort((a, b) => tagScores[b] - tagScores[a]);
  const strongestTags = sortedTags.filter((tag) => tagScores[tag] > 0).slice(0, 4);

  const rankedResults = resultTypes
    .map((resultType) => ({
      resultType,
      score: resultType.matchTags.reduce((sum, tag) => sum + tagScores[tag], 0),
    }))
    .sort((a, b) => b.score - a.score);

  const topResult =
    rankedResults[0]?.score > 1
      ? rankedResults[0].resultType
      : resultTypes.find((resultType) => resultType.id === defaultResultId)!;

  const pinnedAchievements = topResult.achievementIds
    .map((id) => achievements.find((achievement) => achievement.id === id))
    .filter((achievement): achievement is Achievement => Boolean(achievement));

  const tagMatchedAchievements = achievements
    .filter((achievement) =>
      achievement.tags.some((tag) => strongestTags.includes(tag)),
    )
    .sort((a, b) => {
      const rarityRank = rarityWeight(b.rarity) - rarityWeight(a.rarity);
      return rarityRank || b.level - a.level;
    });

  const selectedAchievements = [...pinnedAchievements, ...tagMatchedAchievements].filter(
    (achievement, index, list) =>
      list.findIndex((item) => item.id === achievement.id) === index,
  );

  return {
    resultType: topResult,
    achievements: selectedAchievements,
    tagScores,
    unlockedCount: Math.min(totalAchievementCount, selectedAchievements.length),
  };
}

function rarityWeight(rarity: string) {
  return {
    普通: 1,
    稀有: 2,
    史诗: 3,
    传说: 4,
  }[rarity] ?? 0;
}
