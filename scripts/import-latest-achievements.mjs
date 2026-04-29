import path from "node:path";
import XLSX from "xlsx";

const workbookPath = path.join(process.cwd(), "content", "content.xlsx");
const workbook = XLSX.readFile(workbookPath);

const raw = `ach-001,首缆猎人,天还没亮就到闸口等第一班缆车,刷道硬核类,稀有,hardcore,4
ach-002,刃角侦探,蹲在雪边摸雪质怀疑今天蜡没打对,装备玄学类,普通,gear,2
ach-003,雪道早八,别人还在换鞋你已刷完第一趟,刷道硬核类,稀有,hardcore,4
ach-004,缆车复读,同一条道连刷十遍还说再找找感觉,刷道硬核类,普通,hardcore,3
ach-005,雪温玄学,雪一变黏立刻开始分析板底和蜡,装备玄学类,普通,gear,2
ach-006,绿道护法,陪新手慢慢下山还要保持微笑,新手保护类,普通,teacher,2
ach-007,队尾领队,朋友全滑散你还在群里发集合点,雪圈社交类,普通,social,2
ach-008,回本机器,每滑一趟都在心里摊薄雪票成本,省钱规划类,普通,budget,2
ach-009,压弯上头,第一次刃咬住雪感觉自己突然开窍,刷道硬核类,普通,hardcore,3
ach-010,雪道巡航,一整天不怎么休息只想多跑几趟,刷道硬核类,普通,hardcore,3
ach-011,最后亿趟,说完最后一趟又默默排回缆车队,雪圈社交类,普通,hardcore,social,2
ach-012,山顶回血,在山顶喝口热水就觉得还能再战,雪圈社交类,普通,apres,2
ach-013,机压收集,听见板刃切过机压雪就开始满足,刷道硬核类,稀有,hardcore,4
ach-014,雪场导航,第一次来却很快摸清缆车和雪道,省钱规划类,普通,planner,2
ach-015,坡底集合,别人还在找路你已在坡底等全队,雪圈社交类,普通,social,2
ach-016,早鸟开刃,雪道刚开你已经留下第一道弯,刷道硬核类,稀有,hardcore,4
ach-017,装备点名,出发前把护具雪镜手套逐个清点,装备玄学类,普通,gear,2
ach-018,体面倒下,教朋友第一件事是怎么安全摔倒,新手保护类,普通,teacher,2
ach-019,雪况播报,一上山就给群里更新排队和雪质,省钱规划类,普通,planner,social,2
ach-020,车位猎人,凌晨拼车群里抢到最后一个座位,省钱规划类,普通,budget,social,2
ach-021,板包远征,拖着板包进车站像要去雪山出征,中国式行程类,普通,planner,2
ach-022,角度炼金,固定器只调一格也觉得人生改变,装备玄学类,稀有,gear,4
ach-023,黑道试胆,在黑道口站了三分钟才决定下去,新手保护类,普通,brave,beginner,2
ach-024,锅底召唤,滑完最后一趟立刻提议去吃火锅,雪圈社交类,普通,apres,social,2
ach-025,弯线洁癖,滑完第一件事是回头检查弯够不够圆,刷道硬核类,稀有,hardcore,4
ach-026,护具装甲,护臀护膝全穿上终于敢大胆摔,装备玄学类,普通,gear,beginner,2
ach-027,雪镜变身,戴上雪镜像高手摘下满脸疲惫,装备玄学类,普通,gear,poser,2
ach-028,缆车熟人,一趟缆车上去就能聊出新雪友,雪圈社交类,普通,social,2
ach-029,魔毯修行,滑一分钟坐五分钟照样认真练习,新手保护类,普通,beginner,2
ach-030,信心搬运,把速度降下来陪朋友找回胆量,新手保护类,普通,teacher,social,2
ach-031,雪票审计,买票前把早鸟季卡夜场全算一遍,省钱规划类,普通,budget,planner,2
ach-032,淡季预言,雪季还没来已经开始研究住宿价格,省钱规划类,普通,planner,budget,2
ach-033,雪服出片,技术可以慢慢来但照片必须先到位,雪圈社交类,普通,poser,2
ach-034,镜面留影,在雪镜反光里完成今日第一张自拍,雪圈社交类,普通,poser,social,2
ach-035,坡口嘴硬,心里有点慌嘴上还说这坡还行,新手保护类,普通,poser,brave,2
ach-036,夜场续命,白天滑完不够晚上还想继续排队,中国式行程类,稀有,hardcore,4
ach-037,立刃执念,为了压出一条干净弧线反复重来,刷道硬核类,稀有,hardcore,4
ach-038,粉雪开机,看到没压过的白雪立刻忘记疲惫,粉雪道外类,稀有,powder,4
ach-039,树林试探,第一次进树林每棵树都像在盯你,粉雪道外类,稀有,powder,brave,4
ach-040,约滑发令,一句明天谁去把群聊重新点燃,雪圈社交类,普通,social,2
ach-041,视频判官,朋友发来十秒视频你能看出三处问题,新手保护类,稀有,teacher,4
ach-042,收藏满格,教程收藏夹满了身体还在加载中,新手保护类,普通,beginner,planner,2
ach-043,公园路过,今天没做动作但至少从park里经过,公园动作类,普通,park,2
ach-044,盒子开光,第一次上box身体僵得像被托管,公园动作类,稀有,park,4
ach-045,推坡毕业,终于从推雪滑向真正连续转弯,新手保护类,普通,beginner,hardcore,3
ach-046,反脚重启,一换switch四肢像刚恢复出厂,公园动作类,稀有,park,hardcore,4
ach-047,小包离地,第一次飞起高度虽小但心跳很大,公园动作类,普通,park,brave,3
ach-048,餐厅情报,哪里便宜能坐久你比导航还清楚,省钱规划类,普通,budget,apres,2
ach-049,首轮探图,别人还在换鞋你已摸完开放路线,省钱规划类,稀有,planner,hardcore,4
ach-050,说明书魂,新装备到手先研究半天再敢上雪,装备玄学类,普通,gear,planner,2
ach-051,板面信仰,买板先看图案参数可以之后再懂,装备玄学类,普通,gear,poser,2
ach-052,缆车队友,陌生人一趟缆车后变成临时雪搭子,雪圈社交类,普通,social,2
ach-053,照片回本,雪票很贵但朋友圈九宫格让你释怀,雪圈社交类,普通,poser,budget,2
ach-054,安全雷达,你总能提前看见冲来的新手鱼雷,新手保护类,普通,planner,teacher,2
ach-055,粉雪洗脸,一头扎进粉雪爬出后还说很快乐,粉雪道外类,稀有,powder,brave,4
ach-056,寻板任务,粉雪里找板让你短暂相信玄学,粉雪道外类,稀有,powder,4
ach-057,同道十刷,同一条道滑十遍每趟理由都不同,刷道硬核类,普通,hardcore,3
ach-058,天气赌徒,每天刷天气预报像在等彩票开奖,中国式行程类,普通,planner,powder,2
ach-059,红眼开滑,一夜没睡到雪场还说自己状态不错,中国式行程类,稀有,hardcore,budget,4
ach-060,山顶咖啡,在山顶端杯热饮假装生活很松弛,雪圈社交类,普通,apres,poser,2
ach-061,大弯幻觉,每个大弯都像比赛至少你很投入,刷道硬核类,普通,hardcore,poser,3
ach-062,雪场春运,节假日排队让你重新认识人口密度,中国式行程类,普通,social,budget,2
ach-063,冰箱修行,室外三十度你在室内雪场冻到清醒,中国式行程类,普通,beginner,hardcore,2
ach-064,坡长焦虑,刚找到感觉坡已经到底只好再排队,新手保护类,普通,beginner,budget,2
ach-065,集合召唤,你一声出发把半个群从床上叫醒,雪圈社交类,普通,social,planner,2
ach-066,刃感觉醒,第一次感到刃咬雪你差点笑出声,刷道硬核类,普通,hardcore,3
ach-067,教练笔记,课后把练习点记得比上班还认真,新手保护类,普通,teacher,planner,2
ach-068,袖标空转,袖标挂了一天课却停在想象里,教练生存类,稀有,teacher,budget,4
ach-069,问价消失,报价刚发过去对话框立刻进入雪夜,教练生存类,普通,teacher,budget,3
ach-070,地图刻脑,雪场地图记得比商场楼层还清楚,省钱规划类,普通,planner,2
ach-071,动作截图,为了证明进步把视频逐帧暂停,公园动作类,普通,park,poser,3
ach-072,空中转身,第一次完成一八零落地后心跳没停,公园动作类,稀有,park,brave,4
ach-073,雪后复盘,雪鞋没脱复盘会已经开到第三轮,雪圈社交类,普通,social,hardcore,2
ach-074,猫跳绕行,嘴上说看看线路身体已经选了旁边,公园动作类,普通,brave,poser,2
ach-075,广播熟客,广播一喊集合你比工作人员还紧张,雪圈社交类,普通,social,planner,2
ach-076,被迫摄影,朋友一句帮我拍让你少滑三趟,雪圈社交类,普通,social,poser,2
ach-077,道外初犯,离开压雪道后才知道自由需要体能,粉雪道外类,稀有,powder,brave,4
ach-078,单双外交,单板双板都能聊几句谁也不得罪,雪圈社交类,普通,social,2
ach-079,机票续命,本地没雪就用一张机票延长雪季,中国式行程类,稀有,powder,budget,4
ach-080,封板失败,刚说本季结束三天后又开始看票,中国式行程类,普通,hardcore,budget,3
ach-081,装备越级,技术还在路上装备已经提前毕业,装备玄学类,普通,gear,poser,3
ach-082,贴纸封印,板上贴满态度动作暂时还没跟上,装备玄学类,普通,gear,poser,2
ach-083,缆车课代表,上缆车三分钟开始给朋友讲动作,新手保护类,普通,teacher,social,2
ach-084,人形刹车,新手停不住时你负责温柔接住场面,新手保护类,稀有,teacher,brave,4
ach-085,公开检录,第一次别上号码布瞬间觉得自己专业,公园动作类,稀有,park,poser,4
ach-086,分母荣耀,没进决赛但让冠军看起来更有含金量,公园动作类,稀有,park,brave,4
ach-087,百日雪友,累计百天后钱包膝盖都留下痕迹,刷道硬核类,传说,hardcore,budget,5
ach-088,全场收藏,你不是来测试的是来解锁整座雪场,雪圈社交类,传说,hardcore,social,5`;

const rows = raw.split("\n").map((line) => {
  const parts = line.split(",");
  return {
    id: parts[0],
    title: parts[1],
    description: parts[2],
    category: parts[3],
    rarity: parts[4],
    tags: parts.slice(5, -1).join(","),
    level: Number(parts.at(-1)),
  };
});

workbook.Sheets.achievements = XLSX.utils.json_to_sheet(rows);
if (!workbook.SheetNames.includes("achievements")) {
  workbook.SheetNames.push("achievements");
}

XLSX.writeFile(workbook, workbookPath);
console.log(`Imported ${rows.length} achievements into ${workbookPath}`);
