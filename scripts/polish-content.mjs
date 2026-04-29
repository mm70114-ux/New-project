import path from "node:path";
import XLSX from "xlsx";

const workbookPath = path.join(process.cwd(), "content", "content.xlsx");

const questionRows = [
  q("q1", "到雪场门口，你第一反应是？", [
    ["先看雪道开放和缆车排队", "planner,hardcore"],
    ["找角度拍一张开板照", "social,poser"],
    ["检查板刃、鞋扣和护具", "gear,planner"],
    ["先问朋友今天从哪条绿道开始", "beginner,social"],
  ]),
  q("q2", "什么情况最能让你立刻清醒？", [
    ["清晨第一趟机压雪没人滑过", "hardcore,planner"],
    ["昨晚下新雪，山上开始飘粉", "powder,brave"],
    ["公园区有人开始排队整活", "park,social"],
    ["朋友说收板后有火锅局", "apres,social"],
  ]),
  q("q3", "你对雪具的态度更接近？", [
    ["硬度、半径、刃角都得研究", "gear,planner"],
    ["够用就行，预算留给雪票", "budget,hardcore"],
    ["颜色必须顺眼，出片不能输", "poser,social"],
    ["先租一套，能站住再说", "beginner,budget"],
  ]),
  q("q4", "朋友第一次滑雪，你通常会？", [
    ["先讲摔法、刹车和安全距离", "teacher,planner"],
    ["帮 TA 拍第一张雪场人生照", "social,poser"],
    ["陪 TA 在绿道慢慢找感觉", "teacher,beginner"],
    ["嘴上说很简单，实际全程护航", "poser,teacher"],
  ]),
  q("q5", "看到一条没滑过的高级道，你会？", [
    ["先观察坡度、雪况和退路", "planner,hardcore"],
    ["来都来了，先下去再复盘", "brave,hardcore"],
    ["让朋友先试，我负责点评", "poser,social"],
    ["我在下面拍你们的英姿", "beginner,social"],
  ]),
  q("q6", "你最常在雪场说哪句话？", [
    ["最后一趟，真的最后一趟", "hardcore,brave"],
    ["这个雪质今天有点复杂", "gear,poser"],
    ["我今天状态一般，不代表水平", "poser,beginner"],
    ["晚上吃什么，先定一下", "apres,social"],
  ]),
  q("q7", "你的雪季预算主要花在哪？", [
    ["季卡、交通、住宿，先滑够本", "budget,planner"],
    ["板、鞋、雪服，每年都有理由换", "gear,poser"],
    ["教练课、训练营和视频复盘", "teacher,hardcore"],
    ["吃饭、泡汤、朋友一起开心", "apres,social"],
  ]),
  q("q8", "你最理想的一天是？", [
    ["人少雪好，连续刷到腿软", "hardcore,powder"],
    ["朋友到齐，滑完还有局", "social,apres"],
    ["公园道具开全，动作练顺", "park,brave"],
    ["交通顺、票价低、排队短", "budget,planner"],
  ]),
  q("q9", "摔了一跤以后，你会？", [
    ["马上复盘是哪条刃没站住", "hardcore,teacher"],
    ["先确认附近有没有镜头", "poser,social"],
    ["笑一下，继续试同一个动作", "brave,park"],
    ["坐一会儿，顺便看看风景", "beginner,apres"],
  ]),
  q("q10", "你最想解锁哪种能力？", [
    ["各种雪况都能稳稳滑下来", "hardcore,powder"],
    ["公园动作越来越像回事", "park,brave"],
    ["一眼看懂装备适不适合自己", "gear,planner"],
    ["带新手也能玩得开心安全", "teacher,social"],
  ]),
  q("q11", "你会发什么雪场动态？", [
    ["轨迹、趟数、海拔和速度", "hardcore,planner"],
    ["雪服大片和成就截图", "poser,social"],
    ["朋友摔跤合集，但会打码", "social,apres"],
    ["装备细节和真实使用感", "gear,teacher"],
  ]),
  q("q12", "雪季结束后，你最可能？", [
    ["开始规划下个雪季去哪追雪", "planner,powder"],
    ["把装备洗好，继续研究新款", "gear,poser"],
    ["总结技术问题，准备继续练", "hardcore,teacher"],
    ["说下次一定早起，看天气再说", "poser,beginner"],
  ]),
].flat();

const achievements = [
  a("ach-001", "首缆猎手", "闹钟赢过被窝，雪道第一道刃归你。", "雪场日常", "普通", "hardcore,planner", 1),
  a("ach-002", "刃角侦探", "别人看雪景，你在研究刃角和雪温。", "装备玄学", "普通", "gear,planner", 1),
  a("ach-003", "嘴硬落地", "摔得很响，但解释比动作更丝滑。", "嘴硬专区", "普通", "poser,beginner", 1),
  a("ach-004", "饭局领航", "收板前已经把晚饭路线排明白。", "社交名场面", "普通", "social,apres", 1),
  a("ach-005", "小跳试胆", "跳台不大，心跳先完成一次腾空。", "技术流派", "普通", "park,brave", 1),
  a("ach-006", "绿道护法", "陪新手慢慢滑，耐心比坡度还稳。", "雪场日常", "普通", "teacher,beginner", 1),
  a("ach-007", "粉雪雷达", "天气图一变，你的心已经在山上。", "旅行远征", "稀有", "powder,hardcore", 2),
  a("ach-008", "雪票算盘", "每一趟都在替票价回本。", "旅行远征", "普通", "budget,planner", 1),
  a("ach-009", "开板摄影", "没拍开板照，今天像没正式开始。", "社交名场面", "普通", "social,poser", 1),
  a("ach-010", "蜡温玄学", "雪没变，蜡换了三种说法。", "装备玄学", "稀有", "gear,planner", 2),
  a("ach-011", "最后一趟", "最后一趟之后，还有真正的最后一趟。", "嘴硬专区", "普通", "hardcore,brave", 1),
  a("ach-012", "山顶续命", "一杯热饮，让大腿短暂原谅你。", "雪场日常", "普通", "apres,social", 1),
  a("ach-013", "压雪收藏", "你能听出机压雪被刃切开的声音。", "技术流派", "稀有", "hardcore,planner", 2),
  a("ach-014", "新板开光", "第一趟不求快，只求别给板底留疤。", "装备玄学", "稀有", "gear,poser", 2),
  a("ach-015", "随便滑滑", "嘴上轻松局，实际装备全带齐。", "嘴硬专区", "普通", "poser,beginner", 1),
  a("ach-016", "合照导演", "所有人都冷了，你还在调队形。", "社交名场面", "普通", "social,poser", 1),
  a("ach-017", "道具上头", "围观三分钟，突然觉得自己也行。", "技术流派", "稀有", "park,brave", 2),
  a("ach-018", "摔法讲师", "你教的第一课，是如何体面倒下。", "雪场日常", "普通", "teacher,beginner", 1),
  a("ach-019", "林间候鸟", "一听林间线开，整个人开始迁徙。", "旅行远征", "史诗", "powder,hardcore", 4),
  a("ach-020", "拼车潜伏", "群里不说话，但车位你永远抢得到。", "旅行远征", "普通", "budget,planner", 1),
  a("ach-021", "配色委员", "雪服可以不保暖，但必须有态度。", "装备玄学", "普通", "poser,gear", 1),
  a("ach-022", "扭矩信徒", "固定器每一格，都有它的命运。", "装备玄学", "稀有", "gear,planner", 2),
  a("ach-023", "黑道沉思", "站在入口不动，是在和人生对齐。", "嘴硬专区", "稀有", "brave,poser", 2),
  a("ach-024", "火锅提案", "雪还没停，你已经开始点锅底。", "社交名场面", "普通", "apres,social", 1),
  a("ach-025", "换刃洁癖", "一条弯没干净，能惦记半天。", "技术流派", "稀有", "hardcore,teacher", 2),
  a("ach-026", "护具满编", "安全感不是口号，是膝盖肘臀全到位。", "装备玄学", "普通", "gear,beginner", 1),
  a("ach-027", "雪况背锅", "动作没问题，主要是今天雪有想法。", "嘴硬专区", "普通", "poser,beginner", 1),
  a("ach-028", "缆车社牛", "一趟缆车，能多认识半个雪场。", "社交名场面", "稀有", "social,apres", 2),
  a("ach-029", "落地研究", "摔了不叫摔，是落地数据采样。", "技术流派", "稀有", "park,brave", 2),
  a("ach-030", "慢滑陪练", "你把速度降下来，把朋友信心带上去。", "雪场日常", "稀有", "teacher,beginner", 2),
  a("ach-031", "晨雾开荒", "雾还没散，你已经切开第一条线。", "雪场日常", "稀有", "hardcore,powder", 2),
  a("ach-032", "淡季先知", "别人等雪，你已经订好床位。", "旅行远征", "稀有", "budget,planner", 2),
  a("ach-033", "刷道引擎", "腿在报警，脑子还在排下一趟。", "技术流派", "史诗", "hardcore,brave", 4),
  a("ach-034", "反光自拍", "护目镜里不止有雪，还有你的胜负欲。", "社交名场面", "普通", "poser,social", 1),
  a("ach-035", "坡度嘴强", "坡还没下，评价已经很专业。", "嘴硬专区", "普通", "poser,beginner", 1),
  a("ach-036", "夜场续航", "白天滑不够，晚上继续给腿加班。", "雪场日常", "稀有", "hardcore,apres", 2),
  a("ach-037", "立刃执念", "你追求的不是速度，是那条干净弧线。", "技术流派", "史诗", "hardcore,teacher", 4),
  a("ach-038", "热塑仪式", "雪鞋不合脚，人生都不完整。", "装备玄学", "稀有", "gear,planner", 2),
  a("ach-039", "状态一般", "状态一般的时候，照片倒是特别能打。", "嘴硬专区", "普通", "poser,social", 1),
  a("ach-040", "约滑发起", "你一句去不去，群里开始重新排班。", "社交名场面", "稀有", "social,planner", 2),
  a("ach-041", "公园围观", "本来只看一眼，最后排进队伍。", "技术流派", "普通", "park,social", 1),
  a("ach-042", "视频收藏", "收藏夹里全是教程，身体还在加载。", "技术流派", "普通", "teacher,beginner", 1),
  a("ach-043", "野雪幻听", "风一吹，你就听见远山在召唤。", "旅行远征", "史诗", "powder,planner", 4),
  a("ach-044", "行李压缩", "雪具包里没有空间，只有取舍。", "旅行远征", "稀有", "budget,gear", 2),
  a("ach-045", "搓雪终结", "你终于从推雪，滑向了真正转弯。", "技术流派", "稀有", "teacher,hardcore", 2),
  a("ach-046", "板底鉴定", "一道划痕，能讲出三段事故现场。", "装备玄学", "稀有", "gear,poser", 2),
  a("ach-047", "摔跤素材", "朋友没扶你，因为正在记录经典。", "社交名场面", "普通", "social,poser", 1),
  a("ach-048", "餐厅情报", "哪家不用排队，你比雪场广播更准。", "社交名场面", "普通", "apres,social", 1),
  a("ach-049", "开道先锋", "雪道刚开，你已经完成第一轮探索。", "雪场日常", "稀有", "hardcore,planner", 2),
  a("ach-050", "说明书党", "新装备到手，先读参数再上脚。", "装备玄学", "普通", "gear,planner", 1),
  a("ach-051", "嘴硬王者", "每次失误都有理由，而且听起来很合理。", "嘴硬专区", "传说", "poser,beginner", 5),
  a("ach-052", "团建不冷", "陌生人滑一趟，也能被你聊成队友。", "社交名场面", "稀有", "social,apres", 2),
  a("ach-053", "再来一次", "失败不可怕，没录到才可怕。", "技术流派", "稀有", "park,brave", 2),
  a("ach-054", "安全距离", "你一句慢点，救了半条雪道的心率。", "雪场日常", "稀有", "teacher,planner", 2),
  a("ach-055", "雪报赌徒", "预报说三厘米，你已经请假两天。", "旅行远征", "史诗", "powder,planner", 4),
  a("ach-056", "机票猎人", "价格一跳水，你的雪季版图就扩大。", "旅行远征", "稀有", "budget,planner", 2),
  a("ach-057", "连续刷道", "同一条道滑十遍，每遍都有新理由。", "技术流派", "史诗", "hardcore,planner", 4),
  a("ach-058", "贴纸艺术", "雪板性能未知，个性已经拉满。", "装备玄学", "普通", "gear,poser", 1),
  a("ach-059", "没录不算", "动作成功了，但相册没有证据。", "嘴硬专区", "普通", "park,poser", 1),
  a("ach-060", "山顶咖啡", "你不是休息，是在做高海拔补给。", "社交名场面", "普通", "apres,social", 1),
  a("ach-061", "大回转梦", "每个弯都像世界杯，至少你这么觉得。", "技术流派", "史诗", "hardcore,poser", 4),
  a("ach-062", "卡宾梦游", "梦里全是立刃，醒来还在搓雪。", "嘴硬专区", "稀有", "hardcore,poser", 2),
  a("ach-063", "雪具熟脸", "店员还没开口，已经知道你要问什么。", "装备玄学", "史诗", "gear,planner", 4),
  a("ach-064", "摔完继续", "雪进衣服里，勇气还在外面。", "雪场日常", "稀有", "brave,hardcore", 2),
  a("ach-065", "集合召唤", "山下集合四个字，比广播还有效。", "社交名场面", "普通", "social,planner", 1),
  a("ach-066", "刃火观察", "换刃那一下，你觉得自己看见了光。", "技术流派", "史诗", "hardcore,teacher", 4),
  a("ach-067", "教练笔记", "课上点头，课后逐字复盘。", "技术流派", "稀有", "teacher,planner", 2),
  a("ach-068", "追雪路线", "你的地图不是导航，是雪季作战图。", "旅行远征", "史诗", "powder,planner", 4),
  a("ach-069", "预算破戒", "说好省钱，看到雪票还是下单。", "旅行远征", "普通", "budget,poser", 1),
  a("ach-070", "地图背诵", "第一次来，也像半个本地向导。", "旅行远征", "稀有", "planner,teacher", 2),
  a("ach-071", "同色强迫", "板鞋雪服不成套，今天心里不踏实。", "装备玄学", "普通", "gear,poser", 1),
  a("ach-072", "我让着它", "不是没滑好，是给雪道留点面子。", "嘴硬专区", "普通", "poser,beginner", 1),
  a("ach-073", "复盘会议", "收板不结束，技术分析才开始。", "社交名场面", "稀有", "teacher,social", 2),
  a("ach-074", "猫跳路过", "你说只是路过，眼神已经开始学习。", "技术流派", "稀有", "brave,teacher", 2),
  a("ach-075", "广播熟客", "雪场广播一响，你比工作人员还懂。", "雪场日常", "普通", "planner,social", 1),
  a("ach-076", "朋友摄影", "你滑得一般，但朋友都很出片。", "社交名场面", "普通", "social,poser", 1),
  a("ach-077", "季卡审计", "每滑一趟，心里自动扣一次成本。", "旅行远征", "稀有", "budget,hardcore", 2),
  a("ach-078", "单双外交", "单板双板都能聊，雪场关系很圆滑。", "社交名场面", "稀有", "social,teacher", 2),
  a("ach-079", "崩溃微笑", "腿已经没电，表情管理还在线。", "嘴硬专区", "普通", "poser,hardcore", 1),
  a("ach-080", "不认淡季", "雪季结束只是地理位置不对。", "旅行远征", "史诗", "powder,hardcore", 4),
  a("ach-081", "凌晨勇士", "天没亮就出发，精神比车灯还亮。", "旅行远征", "稀有", "hardcore,planner", 2),
  a("ach-082", "雪包术士", "一个包塞下半个雪季的安全感。", "装备玄学", "稀有", "gear,budget", 2),
  a("ach-083", "缆车课代表", "上缆车不闲聊，开始讲动作逻辑。", "技术流派", "稀有", "teacher,hardcore", 2),
  a("ach-084", "粉雪见证", "那一天的雪，你能讲到下个雪季。", "旅行远征", "传说", "powder,hardcore", 5),
  a("ach-085", "一趟不够", "身体说停，灵魂还在排队。", "雪场日常", "史诗", "hardcore,brave", 4),
  a("ach-086", "防晒勋章", "护目镜印，是雪季最诚实的纹身。", "雪场日常", "普通", "poser,apres", 1),
  a("ach-087", "下次早起", "每次都说下次，闹钟每次都输。", "嘴硬专区", "稀有", "poser,beginner", 2),
  a("ach-088", "全图鉴控", "你不是来测试的，是来收集整座雪场。", "雪场日常", "传说", "hardcore,social,planner", 5),
];

const resultRows = [
  r("slope-beast", "雪场狠人", "你不是来打卡的，是来把雪道刷到记住你。体能、胆量和复盘都在线，唯一的问题是你总觉得还能再来一趟。", "hardcore,brave,powder", "ach-001,ach-007,ach-019,ach-033,ach-061", ""),
  r("gear-alchemist", "装备炼金师", "你相信技术重要，但板、鞋、刃角和雪温同样重要。别人买装备，你是在做一项雪季研究。", "gear,planner,poser", "ach-002,ach-014,ach-026,ach-050,ach-063", ""),
  r("park-trickster", "公园整活王", "你对直滑兴趣一般，对跳台、box 和朋友的欢呼声非常敏感。摔倒不算失败，没录到才算。", "park,brave,social", "ach-005,ach-017,ach-029,ach-041,ach-053", ""),
  r("snow-socialite", "雪圈气氛组", "你能把一次普通滑雪变成完整雪季记忆。约人、拍照、吃饭、复盘，都有你的位置。", "social,apres,poser", "ach-004,ach-016,ach-028,ach-052,ach-076", ""),
  r("patient-coach", "新手保护官", "你知道新手真正需要的不是嘲笑，而是安全感。你能把复杂动作拆成听得懂的话，也愿意陪朋友慢慢滑。", "teacher,beginner,planner", "ach-006,ach-018,ach-030,ach-054,ach-083", ""),
  r("budget-pilgrim", "雪季精算师", "你对雪票、交通、住宿和排队时间有自己的算法。目标很明确：少花冤枉钱，多滑有效趟。", "budget,planner,hardcore", "ach-008,ach-020,ach-032,ach-056,ach-077", ""),
  r("stubborn-king", "嘴硬型选手", "你嘴上说随便滑滑，身体却很诚实。摔了说雪不好，累了说鞋不合，照片发出来又像刚赢。", "poser,beginner,social", "ach-003,ach-015,ach-027,ach-051,ach-087", "yes"),
];

const workbook = XLSX.readFile(workbookPath);
workbook.Sheets.questions = XLSX.utils.json_to_sheet(questionRows);
workbook.Sheets.achievements = XLSX.utils.json_to_sheet(achievements);
workbook.Sheets.resultTypes = XLSX.utils.json_to_sheet(resultRows);
workbook.SheetNames = ["questions", "achievements", "resultTypes"];
XLSX.writeFile(workbook, workbookPath);

console.log(`Polished content workbook: ${workbookPath}`);

function q(questionId, questionTitle, options) {
  return options.map(([optionText, optionTags], index) => ({
    questionId,
    questionTitle,
    optionOrder: index + 1,
    optionText,
    optionTags,
  }));
}

function a(id, title, description, category, rarity, tags, level) {
  return { id, title, description, category, rarity, tags, level };
}

function r(id, title, description, matchTags, achievementIds, isDefault) {
  return { id, title, description, matchTags, achievementIds, isDefault };
}
