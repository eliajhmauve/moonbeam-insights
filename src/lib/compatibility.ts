import { ZODIAC_SIGNS } from "./zodiac-data";

// Element compatibility matrix
const ELEMENT_MAP: Record<string, string> = {
  aries: "fire", taurus: "earth", gemini: "air", cancer: "water",
  leo: "fire", virgo: "earth", libra: "air", scorpio: "water",
  sagittarius: "fire", capricorn: "earth", aquarius: "air", pisces: "water",
};

const ELEMENT_COMPAT: Record<string, Record<string, number>> = {
  fire:  { fire: 80, earth: 40, air: 90, water: 50 },
  earth: { fire: 40, earth: 85, air: 50, water: 90 },
  air:   { fire: 90, earth: 50, air: 80, water: 45 },
  water: { fire: 50, earth: 90, air: 45, water: 85 },
};

// Modality compatibility
const MODALITY_MAP: Record<string, string> = {
  aries: "cardinal", taurus: "fixed", gemini: "mutable",
  cancer: "cardinal", leo: "fixed", virgo: "mutable",
  libra: "cardinal", scorpio: "fixed", sagittarius: "mutable",
  capricorn: "cardinal", aquarius: "fixed", pisces: "mutable",
};

const MODALITY_COMPAT: Record<string, Record<string, number>> = {
  cardinal: { cardinal: 60, fixed: 75, mutable: 85 },
  fixed:    { cardinal: 75, fixed: 55, mutable: 70 },
  mutable:  { cardinal: 85, fixed: 70, mutable: 65 },
};

export interface CompatibilityResult {
  score: number;
  level: string;
  emoji: string;
  summary: string;
  details: {
    element: string;
    dynamic: string;
    advice: string;
  };
}

export function getCompatibility(sign1: string, sign2: string): CompatibilityResult {
  const el1 = ELEMENT_MAP[sign1];
  const el2 = ELEMENT_MAP[sign2];
  const mod1 = MODALITY_MAP[sign1];
  const mod2 = MODALITY_MAP[sign2];

  const elScore = ELEMENT_COMPAT[el1][el2];
  const modScore = MODALITY_COMPAT[mod1][mod2];

  // Same sign bonus
  const sameBonus = sign1 === sign2 ? 10 : 0;
  // Opposite sign attraction (6 signs apart)
  const ZODIAC_LIST = Object.keys(ELEMENT_MAP);
  const idx1 = ZODIAC_LIST.indexOf(sign1);
  const idx2 = ZODIAC_LIST.indexOf(sign2);
  const dist = Math.abs(idx1 - idx2);
  const oppositeBonus = (dist === 6) ? 8 : 0;

  const raw = Math.round(elScore * 0.6 + modScore * 0.4 + sameBonus + oppositeBonus);
  const score = Math.min(99, Math.max(20, raw));

  const { level, emoji } = getLevel(score);
  const name1 = ZODIAC_SIGNS[sign1].name;
  const name2 = ZODIAC_SIGNS[sign2].name;

  const summary = getSummary(sign1, sign2, score, name1, name2);
  const details = getDetails(el1, el2, mod1, mod2, name1, name2);

  return { score, level, emoji, summary, details };
}

function getLevel(score: number) {
  if (score >= 85) return { level: "天作之合", emoji: "💖" };
  if (score >= 70) return { level: "相當契合", emoji: "💕" };
  if (score >= 55) return { level: "需要磨合", emoji: "💛" };
  return { level: "挑戰組合", emoji: "🔥" };
}

function getSummary(s1: string, s2: string, score: number, n1: string, n2: string): string {
  if (score >= 85) {
    return `${n1}和${n2}是令人羨慕的組合！你們在情感和價值觀上天然契合，彼此的能量相互滋養，在一起時感覺毫不費力。`;
  }
  if (score >= 70) {
    return `${n1}和${n2}之間有著良好的化學反應。你們有足夠的共同點讓彼此理解，也有足夠的差異保持新鮮感。`;
  }
  if (score >= 55) {
    return `${n1}和${n2}的組合需要雙方的努力和理解。你們的差異可以成為互補的力量，但也可能引發摩擦。`;
  }
  return `${n1}和${n2}是充滿挑戰但也最具成長性的組合。你們的碰撞可能激烈，但也能激發出彼此最深層的蛻變。`;
}

function getDetails(el1: string, el2: string, mod1: string, mod2: string, n1: string, n2: string) {
  const elNames: Record<string, string> = { fire: "火", earth: "土", air: "風", water: "水" };

  const element = el1 === el2
    ? `同為${elNames[el1]}象星座，你們有著相似的能量頻率和生活態度，默契度極高。`
    : `${elNames[el1]}象遇上${elNames[el2]}象，${
        (el1 === "fire" && el2 === "air") || (el1 === "air" && el2 === "fire")
          ? "風助火勢，你們在一起會激發出無限的創造力和熱情。"
          : (el1 === "earth" && el2 === "water") || (el1 === "water" && el2 === "earth")
            ? "水潤大地，你們的結合溫柔而堅實，彼此滋養。"
            : (el1 === "fire" && el2 === "water") || (el1 === "water" && el2 === "fire")
              ? "水火交融，你們之間的張力強烈，需要學會尊重彼此的節奏。"
              : "不同的元素帶來不同的視角，學會欣賞差異是你們的課題。"
      }`;

  const dynamic = mod1 === mod2
    ? "你們的行事節奏相似，容易達成共識，但也要小心陷入舒適區。"
    : "你們的節奏不同，一個可能更主動，另一個更靈活，互補的空間很大。";

  const advice = el1 === el2
    ? `享受你們的默契，但記得給彼此獨立的空間，避免過度依賴。`
    : `多一些耐心和包容，試著用對方的角度看世界，你們會發現意想不到的美好。`;

  return { element, dynamic, advice };
}
