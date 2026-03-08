import { ZODIAC_SIGNS } from "./zodiac-data";

// Seed-based pseudo-random for deterministic daily results
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getDaySeed(sign: string): number {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  const combined = dateStr + sign;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash + combined.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

const MOODS = ["✨ 閃耀日", "🌿 平靜日", "🔥 能量日", "💫 機遇日", "🌊 內省日", "🎯 專注日", "💞 桃花日", "🧘 修復日"];

const LOVE_TIPS = [
  "今天適合對喜歡的人表達心意，勇敢一點！",
  "感情中多一點包容，會讓關係更加穩固。",
  "單身的你今天桃花運不錯，注意身邊的異性朋友。",
  "與伴侶之間可能有小摩擦，冷靜溝通是關鍵。",
  "今天適合享受獨處時光，重新認識自己的需求。",
  "一場深入的對話可能會拉近你們的距離。",
  "今天的浪漫指數很高，適合約會或製造驚喜。",
  "放下過去的執念，新的緣分正在靠近。",
  "今天適合跟朋友聊聊感情煩惱，會得到有用的建議。",
  "對感情保持耐心，好的事情值得等待。",
];

const CAREER_TIPS = [
  "工作上會有新的機會出現，保持開放的態度。",
  "今天適合處理細節工作，你的專注力特別好。",
  "與同事合作時多傾聽，團隊協作會更順暢。",
  "財運不錯，但避免衝動消費。",
  "今天適合學習新技能，投資自己永遠不虧。",
  "可能會遇到一些挑戰，但這是成長的機會。",
  "創意靈感豐富，適合進行頭腦風暴。",
  "注意時間管理，別讓瑣事佔用太多精力。",
  "今天適合跟上司溝通你的想法，會被認可。",
  "穩紮穩打比急於求成更有效率。",
];

const HEALTH_TIPS = [
  "記得多喝水，身體需要補充能量。",
  "今天適合做一些伸展運動，放鬆緊繃的肌肉。",
  "注意飲食均衡，少吃油膩的食物。",
  "睡眠品質很重要，今晚早點休息。",
  "出去走走吧，大自然會幫你充電。",
  "心情好是最好的保養品，保持微笑。",
  "今天精力充沛，適合安排運動。",
  "注意保暖，別讓身體受涼。",
  "冥想或深呼吸可以幫你釋放壓力。",
  "吃一頓健康的早餐，開啟美好的一天。",
];

const LUCKY_COLORS = ["紫羅蘭色", "珊瑚橘", "薄荷綠", "天空藍", "玫瑰粉", "金色", "銀白色", "深海藍", "薰衣草紫", "暖陽黃", "森林綠", "櫻花粉"];
const LUCKY_NUMBERS = [3, 7, 8, 9, 11, 13, 15, 18, 21, 22, 27, 33];

export interface DailyFortune {
  mood: string;
  overallScore: number;
  loveScore: number;
  careerScore: number;
  healthScore: number;
  loveTip: string;
  careerTip: string;
  healthTip: string;
  luckyColor: string;
  luckyNumber: number;
  summary: string;
}

export function getDailyFortune(sign: string): DailyFortune {
  const seed = getDaySeed(sign);
  const rand = seededRandom(seed);

  const overallScore = Math.floor(rand() * 40) + 60;
  const loveScore = Math.floor(rand() * 40) + 60;
  const careerScore = Math.floor(rand() * 40) + 60;
  const healthScore = Math.floor(rand() * 40) + 60;

  const zodiac = ZODIAC_SIGNS[sign];
  const mood = MOODS[Math.floor(rand() * MOODS.length)];
  const loveTip = LOVE_TIPS[Math.floor(rand() * LOVE_TIPS.length)];
  const careerTip = CAREER_TIPS[Math.floor(rand() * CAREER_TIPS.length)];
  const healthTip = HEALTH_TIPS[Math.floor(rand() * HEALTH_TIPS.length)];
  const luckyColor = LUCKY_COLORS[Math.floor(rand() * LUCKY_COLORS.length)];
  const luckyNumber = LUCKY_NUMBERS[Math.floor(rand() * LUCKY_NUMBERS.length)];

  const avg = Math.round((overallScore + loveScore + careerScore + healthScore) / 4);
  const summary = avg >= 85
    ? `今天是${zodiac.name}的超級好日子！把握每一個機會，好運會持續圍繞你。`
    : avg >= 75
    ? `今天整體運勢不錯，${zodiac.name}的你適合積極行動，會有意想不到的收穫。`
    : avg >= 65
    ? `今天運勢平穩，${zodiac.name}適合按部就班，穩步前進就是最好的策略。`
    : `今天需要多一點耐心，${zodiac.name}不妨放慢腳步，好好照顧自己的身心。`;

  return { mood, overallScore, loveScore, careerScore, healthScore, loveTip, careerTip, healthTip, luckyColor, luckyNumber, summary };
}
