import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const sourcePath = process.argv[2];
const targetPath = path.join(process.cwd(), "content", "content.xlsx");

if (!sourcePath) {
  throw new Error("Usage: node scripts/import-workbook.mjs <xlsx-path>");
}

const workbook = XLSX.readFile(sourcePath);

const questions = pickRows("questions", [
  "questionId",
  "questionTitle",
  "optionOrder",
  "optionText",
  "optionTags",
]).filter((row) => row.questionId && row.optionText);

const achievements = pickRows("achievements", [
  "id",
  "title",
  "description",
  "category",
  "rarity",
  "tags",
  "level",
]).filter((row) => row.id && row.title);

const resultTypes = pickRows("resultTypes", [
  "id",
  "title",
  "description",
  "matchTags",
  "achievementIds",
  "isDefault",
]).filter((row) => row.id && row.title);

const cleaned = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(cleaned, XLSX.utils.json_to_sheet(questions), "questions");
XLSX.utils.book_append_sheet(cleaned, XLSX.utils.json_to_sheet(achievements), "achievements");
XLSX.utils.book_append_sheet(cleaned, XLSX.utils.json_to_sheet(resultTypes), "resultTypes");

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
XLSX.writeFile(cleaned, targetPath);

console.log(
  `Imported workbook: ${questions.length / 4} questions, ${achievements.length} achievements, ${resultTypes.length} result types.`,
);

function pickRows(sheetName, columns) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) throw new Error(`Workbook is missing sheet: ${sheetName}`);

  return XLSX.utils.sheet_to_json(sheet, { defval: "" }).map((row) =>
    Object.fromEntries(columns.map((column) => [column, clean(row[column])])),
  );
}

function clean(value) {
  return String(value ?? "").trim();
}
