export type Tag =
  | "hardcore"
  | "social"
  | "gear"
  | "beginner"
  | "park"
  | "powder"
  | "budget"
  | "apres"
  | "teacher"
  | "brave"
  | "planner"
  | "poser"
  | "snowboard"
  | "ski"
  | "dual";

export type Rarity = "普通" | "稀有" | "史诗" | "传说";

export type AchievementCategory =
  | "雪场日常"
  | "装备玄学"
  | "技术流派"
  | "社交名场面"
  | "旅行远征"
  | "嘴硬专区"
  | "刷道硬核类"
  | "装备玄学类"
  | "新手保护类"
  | "雪圈社交类"
  | "省钱规划类"
  | "中国式行程类"
  | "粉雪道外类"
  | "公园动作类"
  | "教练生存类";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  rarity: Rarity;
  tags: Tag[];
  level: number;
};

export type QuestionOption = {
  text: string;
  tags: Tag[];
};

export type Question = {
  id: string;
  title: string;
  options: QuestionOption[];
};

export type ResultType = {
  id: string;
  title: string;
  description: string;
  matchTags: Tag[];
  achievementIds: string[];
};

export type TestResult = {
  resultType: ResultType;
  achievements: Achievement[];
  tagScores: Record<Tag, number>;
  unlockedCount: number;
};
