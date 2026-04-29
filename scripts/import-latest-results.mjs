import path from "node:path";
import XLSX from "xlsx";

const workbookPath = path.join(process.cwd(), "content", "content.xlsx");
const workbook = XLSX.readFile(workbookPath);

const csv = `id,title,description,matchTags,achievementIds,isDefault
"slope-beast","雪道刷子","你到雪场不是为了拍照打卡，而是为了把每一趟都滑到值回票价。别人还在换鞋，你已经开始研究今天哪条道雪最好；朋友说休息一下，你嘴上答应，身体已经排回缆车队。你对雪况、路线和体能都有自己的执念，最常说的话不是累了，而是这趟再找一下感觉。","hardcore,brave,powder","ach-001,ach-003,ach-010,ach-013,ach-087",""
"gear-alchemist","装备玄师","你相信技术很重要，但装备绝对不能随便。板刃、固定器角度、雪镜镜片、护具厚度，每一样都能影响你今天的心情。别人买装备是消费，你买装备更像做一场雪季实验。你不一定每次都滑得最狠，但你一定知道自己为什么又点开了新款页面。","gear,planner,poser","ach-002,ach-005,ach-022,ach-050,ach-081",""
"park-trickster","公园试胆","你经过 park 时总会慢下来，嘴上说只是看看，脚却已经往跳台口挪。你不怕摔，只怕朋友没拍到；不怕动作小，只怕今天什么都没尝试。你喜欢那种起跳前短暂安静、落地后心跳很响的感觉。哪怕只是过一次 box 或飞起一点点，也足够你回放一整晚。","park,brave,social","ach-043,ach-044,ach-047,ach-072,ach-085",""
"snow-socialite","雪场组局王","你滑雪不只是滑雪，而是把一整天安排成完整回忆。集合、拍照、约饭、缆车聊天、坡底等人，每个环节都有你的存在感。你可能不是队伍里技术最强的，但一定是让大家愿意再约一次的人。只要你在，雪搭子不会散得太彻底，火锅局也不会没人提。","social,apres,poser","ach-011,ach-024,ach-028,ach-052,ach-076",""
"patient-coach","新手护法","你很清楚，新手第一次上雪最需要的不是大道理，而是有人在旁边稳住场面。你会放慢速度，反复解释，甚至把一趟原本属于自己的滑行改成雪场陪护任务。你可能也会无奈，但还是会等朋友扣好鞋、站稳、摔完再重新出发。你是雪道上少数能把耐心滑成技术的人。","teacher,beginner,planner","ach-006,ach-018,ach-030,ach-083,ach-084",""
"budget-pilgrim","雪季算盘","你对滑雪的热爱很真，对钱包的保护也很认真。雪票、交通、住宿、夜场、早鸟票，你都能算出一套自己的最优解。别人临时起意，你先看价格曲线；别人说随便订，你已经开始比较套餐。你不是舍不得花钱，你只是希望每一块钱都能多换几趟雪道。","budget,planner,hardcore","ach-008,ach-031,ach-032,ach-048,ach-080",""
"stubborn-king","雪场嘴硬王","你最擅长在各种状况里保持表面淡定。摔了说是在试雪，累了说鞋有点紧，站在坡口犹豫也能解释成看线路。你不一定永远准备好了，但你总能把自己说服再来一次。朋友觉得你好笑，你自己也知道有点嘴硬，可雪季很多进步，本来就是靠这种不服气滑出来的。","poser,beginner,social","ach-023,ach-035,ach-042,ach-064,ach-074","yes"
"beginner-reborn","新手重启员","你还在和雪板、雪鞋、重心、刹车重新建立关系。别人说放轻松，你已经在脑子里开了十个安全预案；每一次能稳稳停住，都像完成一场小型通关。你不急着证明自己多厉害，更在意今天有没有比上次少摔一点。你的雪季不是从帅开始的，是从敢再来一趟开始的。","beginner,planner,teacher","ach-018,ach-029,ach-042,ach-045,ach-064",""
"indoor-fridge","南方冰箱侠","你的雪季不一定等冬天，可能藏在商场里的室内雪场。外面三十度，里面零下几度，滑一分钟排一会儿队，但你依然能在短坡里练出执念。别人去雪山追粉，你在冰箱里续命；坡不长、雪不野、风景不大，但你知道真正上头的人，在哪都能找到雪感。","beginner,budget,hardcore","ach-029,ach-063,ach-064,ach-036,ach-080",""
"snowboard-soul","单板嘴硬魂","你习惯一只脚被绑住，也习惯在摔完后假装一切正常。你对 switch、平花、小包、box 总有一点兴趣，哪怕今天只是路过也会多看两眼。单板对你来说不只是滑行方式，更像一种姿态：可以慢，可以摔，可以嘴硬，但最好每个动作都带点自己的风格。","snowboard,park,poser","ach-046,ach-047,ach-071,ach-072,ach-082",""
"ski-linehunter","双板巡线官","你更在意路线、速度和身体姿态的连续感。别人看热闹，你看弯型；别人说滑得挺快，你已经在想下一趟能不能更干净。你享受雪道展开时那种稳定推进的感觉，也愿意为了一个更顺的弯反复重来。你的快乐不一定夸张，但通常写在雪面留下的两条线里。","ski,hardcore,planner","ach-013,ach-016,ach-025,ach-037,ach-061",""
"carve-believer","刻滑信徒","你对滑雪的执念，很大一部分来自那一瞬间的咬雪感。只要刃立住、弯走圆、线条干净，你就能把同一条雪道滑出好几种讲究。你会回头看自己的弯，也会在视频里暂停找问题。你不是单纯想快，而是想让每一次转弯都像认真写下的签名。","hardcore,planner,gear","ach-009,ach-025,ach-037,ach-061,ach-066",""
"flatground-lord","平花上头怪","你对大山大坡有兴趣，但更容易被雪道边的小起伏和一块平地吸走注意力。别人直直滑下去，你已经开始想能不能压一下、转一下、弹一下。动作可以不大，但一定要有点巧思；成功了要回放，失败了也要再试。你的快乐经常发生在别人没注意的那几秒里。","snowboard,park,poser","ach-046,ach-047,ach-071,ach-072,ach-043",""
"powder-addict","粉雪失心者","只要听说山上下了新雪，你的理智就会自动降低。压雪道当然也能滑，但你真正惦记的是那片没人碰过的白。你知道道外费体力、容易找板、路线也麻烦，可只要吃过一次好雪，就很难再把普通雪道当成全部。你的雪季常常被天气预报和机票价格牵着走。","powder,brave,hardcore","ach-038,ach-039,ach-055,ach-056,ach-077",""
"coach-survivor","教练生存家","你不只关心怎么滑，也关心今天有没有课、学员会不会回消息、场地规则有没有变化。你能讲动作，也能稳情绪；能带新手，也能在没课时继续站在雪场观察人生。别人看到的是教练服和技术，你更熟悉背后的等待、沟通、报价、复盘和那点不肯下班的责任感。","teacher,budget,planner","ach-041,ach-067,ach-068,ach-069,ach-083",""
"travel-warrior","追雪特种兵","你的滑雪不是出门玩一趟，更像一次精密转场。红眼航班、板包托运、拼车上山、临时改票，全都可以被你纳入计划。别人周末休息，你周末跨城续命；别人嫌麻烦，你已经在算哪天雪况最好。只要雪值得，疲惫、转机和预算都能被你暂时说服。","planner,budget,powder","ach-020,ach-021,ach-058,ach-059,ach-079",""`;

const rows = XLSX.utils.sheet_to_json(XLSX.read(csv, { type: "string" }).Sheets.Sheet1, {
  defval: "",
});

workbook.Sheets.resultTypes = XLSX.utils.json_to_sheet(rows);
if (!workbook.SheetNames.includes("resultTypes")) {
  workbook.SheetNames.push("resultTypes");
}

XLSX.writeFile(workbook, workbookPath);
console.log(`Imported ${rows.length} result types into ${workbookPath}`);
