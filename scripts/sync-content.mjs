import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const workbookPath = path.join(process.cwd(), "content", "content.xlsx");
const outputPath = path.join(process.cwd(), "src", "data", "generatedContent.ts");

if (!fs.existsSync(workbookPath)) {
  throw new Error(`Missing workbook: ${workbookPath}. Run npm run content:export first.`);
}

const workbook = XLSX.readFile(workbookPath);

const questionsRows = readSheet("questions");
const achievementsRows = readSheet("achievements");
const resultRows = readSheet("resultTypes");

const questionsById = new Map();
for (const row of questionsRows) {
  const questionId = clean(row.questionId);
  const optionText = clean(row.optionText);

  if (!questionId || !optionText) continue;

  if (!questionsById.has(questionId)) {
    questionsById.set(questionId, {
      id: questionId,
      title: clean(row.questionTitle),
      options: [],
    });
  }

  questionsById.get(questionId).options.push({
    order: Number(row.optionOrder || questionsById.get(questionId).options.length + 1),
    text: optionText,
    tags: splitList(row.optionTags),
  });
}

const questions = [...questionsById.values()].map((question) => ({
  ...question,
  options: question.options
    .sort((a, b) => a.order - b.order)
    .map(({ text, tags }) => ({ text, tags })),
}));

const achievements = achievementsRows
  .map((row) => ({
    id: clean(row.id),
    title: clean(row.title),
    description: clean(row.description),
    category: clean(row.category),
    rarity: clean(row.rarity),
    tags: splitList(row.tags),
    level: Number(row.level || 1),
  }))
  .filter((achievement) => achievement.id && achievement.title);

const resultTypes = resultRows
  .map((row) => ({
    id: clean(row.id),
    title: clean(row.title),
    description: clean(row.description),
    matchTags: splitList(row.matchTags),
    achievementIds: splitList(row.achievementIds),
  }))
  .filter((resultType) => resultType.id && resultType.title);

const defaultResultId =
  clean(resultRows.find((row) => clean(row.isDefault).toLowerCase() === "yes")?.id) ||
  "stubborn-king";

validateContent({ questions, achievements, resultTypes, defaultResultId });

const generated = `import type { Achievement, Question, ResultType } from "@/types";

export const questions: Question[] = ${JSON.stringify(questions, null, 2)};

export const achievements: Achievement[] = ${JSON.stringify(achievements, null, 2)};

export const totalAchievementCount = achievements.length;

export const defaultResultId = ${JSON.stringify(defaultResultId)};

export const resultTypes: ResultType[] = ${JSON.stringify(resultTypes, null, 2)};
`;

fs.writeFileSync(outputPath, generated, "utf8");
console.log(`Synced ${questions.length} questions, ${achievements.length} achievements, ${resultTypes.length} result types.`);

function readSheet(name) {
  const sheet = workbook.Sheets[name];
  if (!sheet) throw new Error(`Workbook is missing sheet: ${name}`);
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function clean(value) {
  return String(value ?? "").trim();
}

function splitList(value) {
  return clean(value)
    .split(/[,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function validateContent({ questions, achievements, resultTypes, defaultResultId }) {
  if (questions.length < 1) {
    throw new Error(`Expected at least 1 question, got ${questions.length}.`);
  }

  for (const question of questions) {
    if (question.options.length !== 4) {
      throw new Error(`Question ${question.id} must have 4 options, got ${question.options.length}.`);
    }
  }

  if (achievements.length < 1) {
    throw new Error(`Expected at least 1 achievement, got ${achievements.length}.`);
  }

  const achievementIds = new Set(achievements.map((achievement) => achievement.id));
  for (const resultType of resultTypes) {
    for (const id of resultType.achievementIds) {
      if (!achievementIds.has(id)) {
        throw new Error(`Result ${resultType.id} references missing achievement: ${id}`);
      }
    }
  }

  if (!resultTypes.some((resultType) => resultType.id === defaultResultId)) {
    throw new Error(`Default result id is missing from resultTypes: ${defaultResultId}`);
  }
}
