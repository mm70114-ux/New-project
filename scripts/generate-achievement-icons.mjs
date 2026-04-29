import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const workbookPath = path.join(process.cwd(), "content", "content.xlsx");
const outputDir = path.join(process.cwd(), "public", "achievements");
const workbook = XLSX.readFile(workbookPath);
const sheet = workbook.Sheets.achievements;

if (!sheet) {
  throw new Error(`Workbook is missing sheet: achievements`);
}

const achievements = XLSX.utils
  .sheet_to_json(sheet, { defval: "" })
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

fs.mkdirSync(outputDir, { recursive: true });

for (const achievement of achievements) {
  fs.writeFileSync(
    path.join(outputDir, `${achievement.id}.svg`),
    renderIcon(achievement),
    "utf8",
  );
}

console.log(`Generated ${achievements.length} achievement icons in ${outputDir}`);

function renderIcon(achievement) {
  const seed = Number(achievement.id.replace(/\D/g, "")) || 1;
  const accent = rarityColor(achievement.rarity);
  const motif = pickMotif(achievement, seed, accent);
  const title = escapeXml(achievement.title.slice(0, 5));
  const mark = escapeXml(categoryMark(achievement.category));

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="${escapeXml(achievement.title)}">
  <rect width="512" height="512" fill="#0f0e0b"/>
  <rect x="28" y="28" width="456" height="456" rx="8" fill="#181612" stroke="#3a3129" stroke-width="7"/>
  <rect x="55" y="55" width="402" height="402" rx="4" fill="#11100d" stroke="${accent}" stroke-width="8"/>
  <path d="M82 360 H424" fill="none" stroke="#4b4036" stroke-width="5" opacity=".55"/>
  <path d="M92 336 C150 302 202 372 270 328 C328 290 382 306 430 276" fill="none" stroke="#4b4036" stroke-width="5" opacity=".5"/>
  <g fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="14">
    ${motif}
  </g>
  <g fill="${accent}">
    <circle cx="398" cy="112" r="13"/>
    <path d="M398 72 L407 98 L434 98 L412 113 L421 139 L398 123 L376 139 L384 113 L362 98 L390 98 Z"/>
  </g>
  <rect x="83" y="393" width="346" height="46" rx="5" fill="#0f0e0b" stroke="${accent}" stroke-width="4"/>
  <text x="256" y="426" text-anchor="middle" font-size="27" font-weight="900" fill="#f4efe7" font-family="Consolas, 'Microsoft YaHei', monospace">${title}</text>
  <circle cx="103" cy="98" r="24" fill="#0f0e0b" stroke="${accent}" stroke-width="7"/>
  <text x="103" y="108" text-anchor="middle" font-size="25" font-weight="900" fill="${accent}" font-family="Arial, 'Microsoft YaHei', sans-serif">${mark}</text>
</svg>`;
}

function pickMotif(achievement, seed, color) {
  const text = `${achievement.title}${achievement.description}`;
  if (/嘴|状态|随便|雪况|坡度|没录|让着|早起|背锅/.test(text)) return excuseMotif(seed, color);
  if (/火锅|饭|咖啡|餐厅|热饮|续命/.test(text)) return apresMotif(seed, color);
  if (/摄影|合照|自拍|朋友圈|素材|社牛|团建|约滑/.test(text)) return socialMotif(seed, color);
  if (/票|预算|拼车|机票|季卡|算盘|审计|房|车位/.test(text)) return budgetMotif(seed, color);
  if (/板|鞋|刃角|蜡|护具|固定器|雪具|贴纸|装备|热塑/.test(text)) return gearMotif(seed, color);
  if (/公园|跳|Box|道具|落地|再来/.test(text)) return parkMotif(seed, color);
  if (/教|新手|陪练|安全|复盘|课代表|讲师/.test(text)) return teacherMotif(seed, color);
  if (/粉雪|野雪|林间|追雪|雪报|远山/.test(text)) return powderMotif(seed, color);
  if (/地图|路线|行李|凌晨|淡季|山顶/.test(text)) return travelMotif(seed, color);
  return skierMotif(seed, color);
}

function head(x, y, r, color) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="none"/>`;
}

function sparkles(color) {
  return `
    <circle cx="384" cy="124" r="8" fill="${color}" stroke="none"/>
    <path d="M421 139 L421 108 M405 123 L437 123"/>
    <path d="M106 126 L106 98 M92 112 L121 112"/>`;
}

function skierMotif(seed, color) {
  const offset = (seed % 5) * 4;
  return `
    ${head(190 + offset, 148, 34, color)}
    <path d="M183 ${190 + offset} L146 268 L206 294 L266 354"/>
    <path d="M209 209 L275 238 L338 207"/>
    <path d="M118 354 C197 382 293 384 394 352"/>
    <path d="M126 324 L382 394"/>
    <path d="M336 116 L400 116 L372 148 L404 180 L336 180"/>
    ${sparkles(color)}`;
}

function gearMotif(seed, color) {
  const teeth = seed % 2 ? "M316 118 L331 151 L366 142 L359 178 L390 197 L358 216 L366 253 L331 244 L316 277 L300 244 L265 253 L273 216 L241 197 L273 178 L265 142 L300 151 Z" : "M316 112 L344 161 L400 172 L362 214 L369 270 L316 246 L263 270 L270 214 L232 172 L288 161 Z";
  return `
    <path d="${teeth}" fill="${color}" stroke="none"/>
    <circle cx="316" cy="198" r="35" fill="#0f0e0b"/>
    <path d="M116 151 H211 V305 H116 Z"/>
    <path d="M139 184 H188 M139 222 H188 M139 260 H174"/>
    <path d="M104 340 H408"/>
    <path d="M162 332 C216 288 285 288 356 332"/>
    <path d="M238 319 L362 319"/>`;
}

function parkMotif(seed, color) {
  const railY = 330 + (seed % 4) * 5;
  return `
    ${head(220, 142, 30, color)}
    <path d="M212 181 L176 236 L229 267 L303 224"/>
    <path d="M237 268 L318 319"/>
    <path d="M117 ${railY} L409 ${railY - 48}"/>
    <path d="M142 ${railY + 34} L424 ${railY - 14}"/>
    <path d="M91 302 C123 275 147 275 176 302"/>
    <path d="M344 130 L380 105 L421 122"/>`;
}

function socialMotif(seed, color) {
  const x = seed % 2 ? 0 : 18;
  return `
    ${head(176 + x, 177, 29, color)}
    ${head(294 - x, 177, 29, color)}
    <path d="M135 303 C150 241 210 238 229 303"/>
    <path d="M276 303 C291 241 351 238 370 303"/>
    <path d="M162 342 C210 379 302 379 350 342"/>
    <rect x="330" y="103" width="72" height="52" rx="9"/>
    <circle cx="366" cy="129" r="9"/>
    <path d="M118 119 C145 90 188 91 212 119"/>`;
}

function teacherMotif(seed, color) {
  const pin = seed % 3;
  return `
    ${head(165, 169, 29, color)}
    <path d="M142 218 L108 308"/>
    <path d="M184 218 L227 298"/>
    <path d="M232 122 H367 V293 H232 Z"/>
    <path d="M260 168 H342 M260 213 H321"/>
    <path d="M257 251 C293 224 324 226 355 252"/>
    <path d="M104 362 C178 326 251 387 330 338"/>
    <path d="M${300 + pin * 12} 338 L325 371 L356 309"/>`;
}

function powderMotif(seed, color) {
  const wave = 285 + (seed % 5) * 6;
  return `
    <path d="M92 330 C136 ${wave} 177 ${wave} 222 330 S314 374 370 316 S426 285 446 316"/>
    <path d="M121 263 C174 216 231 218 283 268"/>
    <path d="M227 199 C268 157 322 157 363 199"/>
    ${head(158, 121, 20, color)}
    <path d="M156 76 V54 M156 188 V166 M111 121 H89 M223 121 H201"/>
    <path d="M322 102 L362 82 L399 111"/>`;
}

function budgetMotif(seed, color) {
  const count = seed % 4;
  return `
    <rect x="111" y="125" width="159" height="198" rx="16"/>
    <path d="M139 176 H238 M139 218 H238 M139 260 H204"/>
    <circle cx="215" cy="279" r="27"/>
    <rect x="304" y="137" width="93" height="162" rx="10"/>
    <path d="M324 177 H377 M324 214 H377 M324 251 H377"/>
    <path d="M144 356 H393"/>
    <path d="M${178 + count * 12} 98 V82 H333 V106"/>`;
}

function excuseMotif(seed, color) {
  const tilt = seed % 2 ? 16 : -16;
  return `
    ${head(179, 161, 31, color)}
    <path d="M166 205 L139 284 L205 302 L260 357"/>
    <path d="M205 218 L278 190 L327 216"/>
    <path d="M300 103 H407 V170 H300 Z"/>
    <path d="M326 137 H381"/>
    <path d="M112 357 C196 389 292 389 396 357"/>
    <path d="M98 257 C126 234 154 236 180 263"/>
    <path d="M118 212 C96 184 97 151 123 129"/>
    <path d="M342 223 L376 251 L339 279"/>
    <path d="M${318 + tilt / 2} 316 L384 316"/>`;
}

function apresMotif(seed, color) {
  return `
    ${head(161, 171, 27, color)}
    ${head(244, 171, 27, color)}
    <path d="M125 284 C139 230 187 230 202 284"/>
    <path d="M208 284 C222 230 270 230 285 284"/>
    <path d="M303 223 H410"/>
    <path d="M318 223 L338 309 H384 L404 223"/>
    <path d="M332 257 H390"/>
    <path d="M154 331 H380"/>
    <path d="M184 104 C204 80 241 80 260 104"/>`;
}

function travelMotif(seed, color) {
  return `
    <path d="M101 315 L166 263 L237 314 L319 250 L415 315"/>
    <path d="M137 331 H388"/>
    <rect x="122" y="151" width="95" height="125" rx="13"/>
    <path d="M146 151 V128 H193 V151"/>
    <path d="M251 139 L390 109 L369 245 L230 276 Z"/>
    <path d="M279 162 L332 193 L364 143"/>
    <circle cx="331" cy="193" r="14" fill="${color}" stroke="none"/>
    ${sparkles(color)}`;
}

function rarityColor(rarity) {
  return {
    普通: "#a8a29e",
    稀有: "#5b9a91",
    史诗: "#9b8bc7",
    传说: "#d97757",
  }[rarity] ?? "#d97757";
}

function categoryMark(category) {
  return {
    雪场日常: "雪",
    装备玄学: "装",
    技术流派: "技",
    社交名场面: "社",
    旅行远征: "旅",
    嘴硬专区: "嘴",
    刷道硬核类: "刷",
    装备玄学类: "装",
    新手保护类: "护",
    雪圈社交类: "社",
    省钱规划类: "省",
    中国式行程类: "行",
    粉雪道外类: "粉",
    公园动作类: "园",
    教练生存类: "教",
  }[category] ?? "成";
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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
