"use client";

import html2canvas from "html2canvas";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { SharePoster } from "@/components/SharePoster";
import { achievements, totalAchievementCount } from "@/data/achievements";
import { questions } from "@/data/questions";
import { calculateResult } from "@/lib/scoring";
import type { Achievement, QuestionOption, TestResult } from "@/types";

type Stage = "home" | "quiz" | "result" | "catalog";

const rarityRingStyles = {
  普通: "border-stone-500 text-stone-200",
  稀有: "border-teal-500 text-teal-200",
  史诗: "border-indigo-400 text-indigo-200",
  传说: "border-achievementYellow text-achievementYellow shadow-glow",
};

const rarityTextStyles = {
  普通: "text-stone-300",
  稀有: "text-teal-200",
  史诗: "text-indigo-200",
  传说: "text-achievementYellow",
};

export default function Home() {
  const [stage, setStage] = useState<Stage>("home");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState(questions);
  const [answers, setAnswers] = useState<QuestionOption[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [shareImage, setShareImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  const currentQuestion = activeQuestions[questionIndex];
  const progress = ((questionIndex + 1) / activeQuestions.length) * 100;

  const groupedAchievements = useMemo(() => {
    return achievements.reduce<Record<string, Achievement[]>>((groups, achievement) => {
      groups[achievement.category] ??= [];
      groups[achievement.category].push(achievement);
      return groups;
    }, {});
  }, []);

  function startQuiz() {
    setActiveQuestions(getBaseQuestions());
    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setShareImage(null);
    setSelectedAchievement(null);
    setStage("quiz");
  }

  function selectOption(option: QuestionOption) {
    const nextAnswers = [...answers.slice(0, questionIndex), option];

    const nextActiveQuestions = maybeAppendBranchQuestions(
      activeQuestions,
      questionIndex,
      nextAnswers,
    );

    if (nextActiveQuestions !== activeQuestions) {
      setActiveQuestions(nextActiveQuestions);
    }

    if (questionIndex >= nextActiveQuestions.length - 1) {
      setAnswers(nextAnswers);
      setResult(calculateResult(nextAnswers));
      setStage("result");
      return;
    }

    setAnswers(nextAnswers);
    setQuestionIndex((index) => index + 1);
  }

  function goPreviousQuestion() {
    if (questionIndex === 0) return;
    setAnswers((currentAnswers) => currentAnswers.slice(0, questionIndex - 1));
    setQuestionIndex((index) => index - 1);
  }

  async function generateShareImage() {
    if (!posterRef.current) return;
    setIsGenerating(true);
    setShareImage(null);

    const canvas = await html2canvas(posterRef.current, {
      backgroundColor: "#050505",
      scale: 3,
      useCORS: true,
    });

    setShareImage(canvas.toDataURL("image/png"));
    setIsGenerating(false);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-6">
      {stage !== "home" && (
        <nav className="mb-6 flex items-center justify-between">
          <button
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-200"
            onClick={() => {
              setSelectedAchievement(null);
              setStage("home");
            }}
          >
            首页
          </button>
          <button
            className="rounded-full border border-achievementYellow px-4 py-2 text-sm font-bold text-achievementYellow"
            onClick={() => {
              setSelectedAchievement(null);
              setStage("catalog");
            }}
          >
            成就图鉴
          </button>
        </nav>
      )}

      {stage === "home" && (
        <section className="flex min-h-[calc(100vh-48px)] flex-col justify-between">
          <div className="pt-20">
            <p className="text-sm font-black tracking-[0.3em] text-achievementYellow">
              中国雪友成就测试
            </p>
            <h1 className="mt-5 text-5xl font-black leading-tight text-white">
              中国雪友
              <br />
              成就测试
            </h1>
            <p className="mt-5 text-lg font-bold leading-8 text-zinc-300">
              看看你是雪场狠人，还是嘴硬型选手
            </p>
          </div>

          <div className="pb-8">
            <button
              className="w-full rounded-xl border border-achievementYellow/70 bg-achievementYellow px-6 py-5 text-lg font-black text-snowBlack shadow-glow active:scale-[0.99]"
              onClick={startQuiz}
            >
              开始测试
            </button>
          </div>
        </section>
      )}

      {stage === "quiz" && currentQuestion && (
        <section>
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-sm font-bold text-zinc-400">
              <span>
                QUESTION {questionIndex + 1} / {activeQuestions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-zinc-900">
              <div
                className="h-full rounded-full bg-achievementYellow transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h2 className="text-3xl font-black leading-tight">{currentQuestion.title}</h2>
          <div className="mt-8 space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.text}
                className="w-full rounded-xl border border-stone-800 bg-cardBlack p-5 text-left text-lg font-bold leading-7 text-stone-100 transition active:border-achievementYellow active:bg-stone-900"
                onClick={() => selectOption(option)}
              >
                {option.text}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              className="rounded-xl border border-stone-700 px-5 py-4 text-base font-bold text-stone-200 disabled:cursor-not-allowed disabled:opacity-35"
              onClick={goPreviousQuestion}
              disabled={questionIndex === 0}
            >
              上一题
            </button>
            <button
              className="rounded-xl border border-stone-800 px-5 py-4 text-base font-bold text-stone-500"
              onClick={() => setStage("home")}
            >
              退出测试
            </button>
          </div>
        </section>
      )}

      {stage === "result" && result && (
        <section className="pb-10">
          <div className="rounded-xl border border-achievementYellow/35 bg-cardBlack px-5 py-4 shadow-glow">
            <h2 className="text-3xl font-black leading-tight">
              {result.resultType.title}
            </h2>
            <p className="mt-3 text-sm font-bold leading-6 text-zinc-300">
              {result.resultType.description}
            </p>
            <p className="mt-4 text-lg font-black text-achievementYellow">
              已解锁 {result.unlockedCount} / {totalAchievementCount} 项成就
            </p>
          </div>

          <div className="mt-8 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-black">已解锁成就</h3>
              <p className="mt-1 text-sm font-bold text-zinc-500">
                点击图标查看详情
              </p>
            </div>
            <span className="text-sm font-black text-achievementYellow">
              {result.achievements.length} 项
            </span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {result.achievements.map((achievement) => (
              <AchievementIconButton
                key={achievement.id}
                achievement={achievement}
                onClick={() => setSelectedAchievement(achievement)}
              />
            ))}
          </div>

          <div className="mt-8 grid gap-3">
            <button
              className="rounded-xl border border-achievementYellow/70 bg-achievementYellow px-6 py-4 text-base font-black text-snowBlack disabled:opacity-60"
              onClick={generateShareImage}
              disabled={isGenerating}
            >
              {isGenerating ? "生成中..." : "生成分享图"}
            </button>
            <button
              className="rounded-xl border border-stone-700 px-6 py-4 text-base font-bold text-stone-100"
              onClick={startQuiz}
            >
              重新测试
            </button>
          </div>

          <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden>
            <div ref={posterRef}>
              <SharePoster result={result} />
            </div>
          </div>

          {shareImage && (
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-black">分享图预览</h3>
              {/* html2canvas returns a client-side data URL, so Next Image optimization is not useful here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full rounded-xl border border-stone-800"
                src={shareImage}
                alt="中国雪友成就测试分享图"
              />
            </div>
          )}

          {selectedAchievement && (
            <AchievementDetailModal
              achievement={selectedAchievement}
              onClose={() => setSelectedAchievement(null)}
            />
          )}
        </section>
      )}

      {stage === "catalog" && (
        <section className="pb-28">
          <div className="mb-6">
            <p className="text-sm font-black tracking-[0.28em] text-achievementYellow">
              COLLECTION
            </p>
            <h2 className="mt-3 text-4xl font-black">成就图鉴</h2>
            <p className="mt-3 text-sm font-bold leading-6 text-zinc-400">
              共 {totalAchievementCount} 项，按分类收纳成徽章墙。点击任意图标查看详情。
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedAchievements).map(([category, items]) => (
              <section key={category}>
                <div className="mb-4 flex items-end justify-between">
                  <h3 className="text-2xl font-black text-achievementYellow">
                    {category}
                  </h3>
                  <span className="text-xs font-bold text-zinc-500">
                    {items.length} 项
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {items.map((achievement) => (
                    <AchievementIconButton
                      key={achievement.id}
                      achievement={achievement}
                      onClick={() => setSelectedAchievement(achievement)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="sticky bottom-5 mt-8">
            <div className="grid gap-3">
              {result && (
                <button
                  className="w-full rounded-xl border border-achievementYellow/70 bg-achievementYellow px-6 py-4 text-base font-black text-snowBlack shadow-glow"
                  onClick={() => {
                    setSelectedAchievement(null);
                    setStage("result");
                  }}
                >
                  返回测试结果
                </button>
              )}
              <button
                className="w-full rounded-xl border border-stone-700 bg-snowBlack px-6 py-4 text-base font-black text-stone-100 shadow-glow"
                onClick={startQuiz}
              >
                开始测试
              </button>
            </div>
          </div>

          {selectedAchievement && (
            <AchievementDetailModal
              achievement={selectedAchievement}
              onClose={() => setSelectedAchievement(null)}
            />
          )}
        </section>
      )}

      <footer className="pb-4 pt-8 text-center text-xs text-zinc-600">
        <Link href="/" className="font-bold text-zinc-500">
          中国雪友成就测试
        </Link>
      </footer>
    </main>
  );
}

function getBaseQuestions() {
  return questions.filter((question) => !question.id.startsWith("hq-"));
}

function maybeAppendBranchQuestions(
  currentQuestions: typeof questions,
  questionIndex: number,
  selectedOptions: QuestionOption[],
) {
  const baseQuestions = getBaseQuestions();
  const isLastBaseQuestion = questionIndex === baseQuestions.length - 1;
  const alreadyHasBranches = currentQuestions.some((question) =>
    question.id.startsWith("hq-"),
  );

  if (!isLastBaseQuestion || alreadyHasBranches) {
    return currentQuestions;
  }

  const branchQuestions = pickBranchQuestions(selectedOptions);
  return branchQuestions.length > 0
    ? [...baseQuestions, ...branchQuestions]
    : currentQuestions;
}

function pickBranchQuestions(selectedOptions: QuestionOption[]) {
  const scores = selectedOptions.reduce<Record<string, number>>((tagScores, option) => {
    option.tags.forEach((tag) => {
      tagScores[tag] = (tagScores[tag] ?? 0) + 1;
    });
    return tagScores;
  }, {});

  const rankedTags = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  const branchMap: Record<string, string[]> = {
    teacher: ["hq-coach-1", "hq-coach-2"],
    park: ["hq-park-1", "hq-park-2"],
    powder: ["hq-powder-1", "hq-powder-2"],
    hardcore: ["hq-carve-1"],
    ski: ["hq-carve-1"],
    snowboard: ["hq-park-1", "hq-park-2"],
    beginner: ["hq-fridge-1"],
    budget: ["hq-fridge-1"],
  };

  const pickedIds: string[] = [];
  for (const tag of rankedTags) {
    for (const id of branchMap[tag] ?? []) {
      if (!pickedIds.includes(id)) {
        pickedIds.push(id);
      }
      if (pickedIds.length >= 2) break;
    }
    if (pickedIds.length >= 2) break;
  }

  return pickedIds
    .map((id) => questions.find((question) => question.id === id))
    .filter((question): question is (typeof questions)[number] => Boolean(question));
}

function AchievementIconButton({
  achievement,
  onClick,
}: {
  achievement: Achievement;
  onClick: () => void;
}) {
  return (
    <button
      className="group min-h-[112px] rounded-xl border border-stone-800 bg-cardBlack p-2 text-center transition active:scale-[0.98] active:border-achievementYellow"
      onClick={onClick}
    >
      <span
        className={`mx-auto block aspect-square w-full overflow-hidden rounded-lg border-2 bg-snowBlack ${rarityRingStyles[achievement.rarity]}`}
      >
        {/* SVG achievement assets are static public files; Next Image optimization is unnecessary here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-full w-full object-contain"
          src={`/achievements/${achievement.id}.svg`}
          alt=""
          aria-hidden="true"
        />
      </span>
      <span className="mt-2 line-clamp-2 block text-[11px] font-black leading-4 text-zinc-200">
        {achievement.title}
      </span>
    </button>
  );
}

function AchievementDetailModal({
  achievement,
  onClose,
}: {
  achievement: Achievement;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-20 grid place-items-center bg-snowBlack/80 px-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-achievementYellow/60 bg-snowBlack p-4 shadow-glow"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid grid-cols-[2fr_3fr] gap-4">
          {/* SVG achievement assets are static public files; Next Image optimization is unnecessary here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="aspect-square w-full rounded-lg border border-achievementYellow/70 bg-cardBlack object-contain"
            src={`/achievements/${achievement.id}.svg`}
            alt={achievement.title}
          />
          <div className="min-w-0">
            <p className="text-xs font-black tracking-[0.22em] text-achievementYellow">
              ACHIEVEMENT
            </p>
            <h3 className="mt-2 text-2xl font-black leading-tight text-white">
              {achievement.title}
            </h3>
            <p
              className={`mt-2 text-sm font-black ${rarityTextStyles[achievement.rarity]}`}
            >
              {achievement.rarity} · {achievement.category} · LV.{achievement.level}
            </p>
          </div>
        </div>
        <p className="mt-4 text-base font-bold leading-7 text-zinc-300">
          {achievement.description}
        </p>
      </div>
    </div>
  );
}
