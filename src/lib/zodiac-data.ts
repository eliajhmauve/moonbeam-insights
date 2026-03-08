export interface ZodiacSign {
  name: string;
  symbol: string;
  element: string;
  sunDescription: string;
  moonDescription: string;
  risingDescription: string;
}

export const ZODIAC_SIGNS: Record<string, ZodiacSign> = {
  aries: {
    name: "牡羊座",
    symbol: "♈",
    element: "火",
    sunDescription: "你是天生的領導者，充滿熱情與行動力。勇於開創新局，不畏挑戰，永遠衝在最前面。",
    moonDescription: "你的內心像一團火焰，情緒來得快去得也快。需要即時的情感回應，討厭被忽略或等待。",
    risingDescription: "你給人精力充沛、直來直往的第一印象。別人覺得你很有幹勁，是個行動派。",
  },
  taurus: {
    name: "金牛座",
    symbol: "♉",
    element: "土",
    sunDescription: "你務實穩重，追求生活品質與安全感。對美好事物有極高的鑑賞力，是可靠的存在。",
    moonDescription: "你需要穩定和安全感才能感到安心。對親密的人非常忠誠，但改變讓你焦慮不安。",
    risingDescription: "你給人沉穩、溫和且值得信賴的感覺。別人會覺得你很有品味，散發一種從容的氣質。",
  },
  gemini: {
    name: "雙子座",
    symbol: "♊",
    element: "風",
    sunDescription: "你聰明伶俐，好奇心旺盛，善於溝通表達。喜歡多元的生活方式，是社交場合的靈魂人物。",
    moonDescription: "你的情緒多變且需要大量的心智刺激。透過說話和交流來處理感受，獨處太久會感到焦躁。",
    risingDescription: "你給人機靈、健談、有趣的第一印象。別人覺得你很容易親近，總是有聊不完的話題。",
  },
  cancer: {
    name: "巨蟹座",
    symbol: "♋",
    element: "水",
    sunDescription: "你溫柔體貼，重視家庭與情感連結。有強烈的保護本能，是朋友圈中最溫暖的存在。",
    moonDescription: "你的情感極為豐富且敏銳，能察覺他人最細微的情緒變化。需要一個安全的「殼」來保護內心。",
    risingDescription: "你給人溫暖、親切、有母性光輝的感覺。別人會本能地想跟你傾訴心事。",
  },
  leo: {
    name: "獅子座",
    symbol: "♌",
    element: "火",
    sunDescription: "你大方自信，天生具有舞台魅力。喜歡被關注和讚賞，用你的光芒照亮身邊每一個人。",
    moonDescription: "你內心渴望被認可和讚美，需要感覺自己是特別的。在情感上非常慷慨，但也需要等量的回饋。",
    risingDescription: "你給人自信、耀眼、有領導氣質的第一印象。就算安靜站著，也自然散發著存在感。",
  },
  virgo: {
    name: "處女座",
    symbol: "♍",
    element: "土",
    sunDescription: "你細心嚴謹，追求完美與效率。有極強的分析能力，總是能發現別人忽略的細節。",
    moonDescription: "你用分析和整理來處理情緒，焦慮時會開始打掃或列清單。對自己要求很高，容易自我批評。",
    risingDescription: "你給人整潔、聰明、有條理的第一印象。別人覺得你很靠譜，是值得託付的人。",
  },
  libra: {
    name: "天秤座",
    symbol: "♎",
    element: "風",
    sunDescription: "你優雅和善，追求平衡與和諧。有天生的審美品味，是人際關係中的調和者。",
    moonDescription: "你需要關係中的和諧與平衡才能感到安心。討厭衝突，有時會為了維持和平而壓抑真實感受。",
    risingDescription: "你給人優雅、迷人、好相處的第一印象。別人會被你的親和力和美感所吸引。",
  },
  scorpio: {
    name: "天蠍座",
    symbol: "♏",
    element: "水",
    sunDescription: "你深沉而有洞察力，對事物有著強烈的熱情。不做則已，一做就全力以赴，令人印象深刻。",
    moonDescription: "你的情感極度強烈且深沉，愛恨分明。信任對你來說極為珍貴，一旦被背叛很難再原諒。",
    risingDescription: "你給人神秘、深沉、有穿透力的第一印象。你的眼神彷彿能看穿一切，讓人既好奇又敬畏。",
  },
  sagittarius: {
    name: "射手座",
    symbol: "♐",
    element: "火",
    sunDescription: "你樂觀開朗，熱愛自由與冒險。有著寬廣的世界觀，永遠在追尋生命的意義。",
    moonDescription: "你需要自由和空間來感到快樂。不喜歡被情緒綁架，傾向用幽默和哲學來化解沉重的感受。",
    risingDescription: "你給人開朗、幽默、充滿活力的第一印象。別人覺得跟你在一起總是很開心。",
  },
  capricorn: {
    name: "摩羯座",
    symbol: "♑",
    element: "土",
    sunDescription: "你堅韌務實，有著強大的責任感和企圖心。低調前行，終將攀上巔峰。",
    moonDescription: "你習慣壓抑情緒，覺得示弱是不成熟的表現。需要時間才能敞開心扉，但一旦信任就極為深沉。",
    risingDescription: "你給人成熟、可靠、有企圖心的第一印象。別人覺得你超齡穩重，是值得尊敬的人。",
  },
  aquarius: {
    name: "水瓶座",
    symbol: "♒",
    element: "風",
    sunDescription: "你獨立前衛，有著與眾不同的思維方式。追求人道主義理想，是天生的革新者。",
    moonDescription: "你用理性和距離來處理情緒，不太習慣過度的親密。需要獨立的空間，但內心其實渴望被理解。",
    risingDescription: "你給人獨特、聰穎、有點怪的第一印象。別人覺得你很酷，不隨波逐流。",
  },
  pisces: {
    name: "雙魚座",
    symbol: "♓",
    element: "水",
    sunDescription: "你富有同理心和創造力，像海綿一樣吸收周圍的情感能量。是夢想家也是藝術家。",
    moonDescription: "你的情感如海洋般深邃無邊，容易受環境和他人情緒影響。需要定期獨處來清理吸收的能量。",
    risingDescription: "你給人溫柔、夢幻、有靈性的第一印象。別人覺得你有一種超脫世俗的氣質。",
  },
};

export const ZODIAC_ORDER = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

// Combined reading templates
export function getCombinedReading(sun: string, moon: string, rising?: string): string {
  const sunSign = ZODIAC_SIGNS[sun];
  const moonSign = ZODIAC_SIGNS[moon];

  let reading = `你表面是${sunSign.element}象星座${sunSign.name}的個性，${
    sun === "leo" ? "霸氣自信" :
    sun === "aries" ? "勇敢衝動" :
    sun === "sagittarius" ? "樂觀奔放" :
    sun === "taurus" ? "穩重踏實" :
    sun === "virgo" ? "細心嚴謹" :
    sun === "capricorn" ? "堅毅沉穩" :
    sun === "gemini" ? "機智善變" :
    sun === "libra" ? "優雅圓融" :
    sun === "aquarius" ? "獨特前衛" :
    sun === "cancer" ? "溫柔體貼" :
    sun === "scorpio" ? "深沉執著" :
    "感性浪漫"
  }；但內心住著一個${
    moon === "pisces" ? "敏感的雙魚" :
    moon === "cancer" ? "柔軟的巨蟹" :
    moon === "scorpio" ? "深沉的天蠍" :
    moon === "aries" ? "衝動的牡羊" :
    moon === "leo" ? "驕傲的獅子" :
    moon === "sagittarius" ? "自由的射手" :
    moon === "taurus" ? "固執的金牛" :
    moon === "virgo" ? "完美主義的處女" :
    moon === "capricorn" ? "壓抑的摩羯" :
    moon === "gemini" ? "多變的雙子" :
    moon === "libra" ? "猶豫的天秤" :
    "疏離的水瓶"
  }，你的情感世界比別人看到的更加豐富。`;

  if (rising && ZODIAC_SIGNS[rising]) {
    const risingSign = ZODIAC_SIGNS[rising];
    reading += `配上${risingSign.name}的上升，你給人${
      rising === "libra" ? "優雅和善" :
      rising === "leo" ? "耀眼自信" :
      rising === "scorpio" ? "神秘深沉" :
      rising === "sagittarius" ? "開朗有趣" :
      rising === "aries" ? "精力充沛" :
      rising === "taurus" ? "沉穩可靠" :
      rising === "gemini" ? "機靈健談" :
      rising === "cancer" ? "溫暖親切" :
      rising === "virgo" ? "理性整潔" :
      rising === "capricorn" ? "成熟穩重" :
      rising === "aquarius" ? "獨特超然" :
      "溫柔夢幻"
    }的第一印象。這三者的組合讓你既有深度又有魅力，是個讓人想深入了解的人。`;
  }

  return reading;
}
