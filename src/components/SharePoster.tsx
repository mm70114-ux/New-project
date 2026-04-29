import { totalAchievementCount } from "@/data/achievements";
import type { Achievement, TestResult } from "@/types";

const rarityColors = {
  普通: "#a8a29e",
  稀有: "#5b9a91",
  史诗: "#9b8bc7",
  传说: "#d97757",
};

const categoryMarks: Record<string, string> = {
  雪场日常: "雪",
  装备玄学: "装",
  技术流派: "技",
  社交名场面: "社",
  旅行远征: "旅",
  嘴硬专区: "嘴",
};

const tagMarks: Record<string, string> = {
  hardcore: "刷",
  social: "社",
  gear: "装",
  beginner: "新",
  park: "园",
  powder: "粉",
  budget: "省",
  apres: "饭",
  teacher: "教",
  brave: "勇",
  planner: "策",
  poser: "嘴",
  snowboard: "单",
  ski: "双",
  dual: "双",
};

export function SharePoster({ result }: { result: TestResult }) {
  const achievements = result.achievements.slice(0, 6);

  return (
    <div
      style={{
        width: 320,
        height: 568,
        overflow: "hidden",
        borderRadius: 18,
        border: "1px solid rgba(217,119,87,0.72)",
        background: "#0f0e0b",
        color: "#f4efe7",
        padding: 14,
        fontFamily:
          'Arial, "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <div
        style={{
          height: 540,
          display: "grid",
          gridTemplateRows: "164px 268px 78px",
          gap: 15,
        }}
      >
        <section
          style={{
            border: "1px solid rgba(217,119,87,0.38)",
            borderRadius: 14,
            background: "#181612",
            padding: "12px 14px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              color: "#d97757",
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 3,
              lineHeight: "14px",
              whiteSpace: "nowrap",
            }}
          >
            中国雪友成就测试
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 30,
              fontWeight: 900,
              lineHeight: "35px",
              height: 38,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {result.resultType.title}
          </div>
          <div
            style={{
              marginTop: 7,
              color: "#d6d3d1",
              fontSize: 12,
              fontWeight: 700,
              lineHeight: "18px",
              height: 36,
              overflow: "hidden",
            }}
          >
            {shorten(result.resultType.description, 48)}
          </div>
          <div
            style={{
              marginTop: 9,
              color: "#d97757",
              fontSize: 21,
              fontWeight: 900,
              lineHeight: "25px",
            }}
          >
            已解锁 {result.unlockedCount} / {totalAchievementCount}
          </div>
        </section>

        <section style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 900 }}>代表成就</div>
            <div style={{ color: "#78716c", fontSize: 11, fontWeight: 900 }}>
              TOP 6
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {achievements.map((achievement) => (
              <PosterAchievementBadge
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </div>
        </section>

        <section
          style={{
            borderTop: "1px solid rgba(217,119,87,0.32)",
            paddingTop: 12,
            display: "grid",
            gridTemplateColumns: "1fr 58px",
            gap: 12,
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                color: "#a8a29e",
                fontSize: 11,
                fontWeight: 700,
                lineHeight: "16px",
              }}
            >
              扫码来测你的雪友人格
            </div>
            <div
              style={{
                marginTop: 3,
                color: "#d97757",
                fontSize: 14,
                fontWeight: 900,
                lineHeight: "18px",
              }}
            >
              中国雪友成就测试
            </div>
          </div>
          <div
            style={{
              width: 56,
              height: 56,
              display: "grid",
              placeItems: "center",
              borderRadius: 10,
              border: "2px dashed rgba(217,119,87,0.75)",
              color: "#d97757",
              textAlign: "center",
              fontSize: 9,
              fontWeight: 900,
              lineHeight: "14px",
            }}
          >
            二维码
            <br />
            占位
          </div>
        </section>
      </div>
    </div>
  );
}

function PosterAchievementBadge({ achievement }: { achievement: Achievement }) {
  const color = rarityColors[achievement.rarity];
  const mark =
    tagMarks[achievement.tags[0]] ?? categoryMarks[achievement.category] ?? "成";

  return (
    <div style={{ minWidth: 0, textAlign: "center" }}>
      <div
        style={{
          width: 82,
          height: 82,
          display: "grid",
          placeItems: "center",
          margin: "0 auto",
          borderRadius: 12,
          border: `2px solid ${color}`,
          background: "#181612",
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            display: "grid",
            placeItems: "center",
            borderRadius: 8,
            border: `1px solid ${color}`,
            color,
            fontSize: 28,
            fontWeight: 900,
            lineHeight: "34px",
          }}
        >
          {mark}
        </div>
      </div>
      <div
        style={{
          marginTop: 4,
          height: 14,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          color: "#e7e5e4",
          fontSize: 9,
          fontWeight: 900,
          lineHeight: "14px",
        }}
      >
        {achievement.title}
      </div>
    </div>
  );
}

function shorten(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
