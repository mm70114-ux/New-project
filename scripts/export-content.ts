import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";
import { achievements } from "../src/data/achievements";
import { questions } from "../src/data/questions";
import { defaultResultId, resultTypes } from "../src/data/resultTypes";

const workbook = XLSX.utils.book_new();
const outputDir = path.join(process.cwd(), "content");
const outputFile = path.join(outputDir, "content.xlsx");

fs.mkdirSync(outputDir, { recursive: true });

XLSX.utils.book_append_sheet(
  workbook,
  XLSX.utils.json_to_sheet(
    questions.flatMap((question) =>
      question.options.map((option, optionIndex) => ({
        questionId: question.id,
        questionTitle: question.title,
        optionOrder: optionIndex + 1,
        optionText: option.text,
        optionTags: option.tags.join(","),
      })),
    ),
  ),
  "questions",
);

XLSX.utils.book_append_sheet(
  workbook,
  XLSX.utils.json_to_sheet(
    achievements.map((achievement) => ({
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      category: achievement.category,
      rarity: achievement.rarity,
      tags: achievement.tags.join(","),
      level: achievement.level,
    })),
  ),
  "achievements",
);

XLSX.utils.book_append_sheet(
  workbook,
  XLSX.utils.json_to_sheet(
    resultTypes.map((resultType) => ({
      id: resultType.id,
      title: resultType.title,
      description: resultType.description,
      matchTags: resultType.matchTags.join(","),
      achievementIds: resultType.achievementIds.join(","),
      isDefault: resultType.id === defaultResultId ? "yes" : "",
    })),
  ),
  "resultTypes",
);

XLSX.writeFile(workbook, outputFile);
console.log(`Exported content workbook: ${outputFile}`);
