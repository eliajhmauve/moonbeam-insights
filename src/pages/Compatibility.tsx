import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSunSign, getMoonSign } from "@/lib/astro-calc";
import { ZODIAC_SIGNS } from "@/lib/zodiac-data";
import { getCompatibility, type CompatibilityResult } from "@/lib/compatibility";

const Compatibility = () => {
  const navigate = useNavigate();
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [result, setResult] = useState<{
    sunA: string; sunB: string;
    moonA: string; moonB: string;
    sunCompat: CompatibilityResult;
    moonCompat: CompatibilityResult;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateA || !dateB) return;
    const [yA, mA, dA] = dateA.split("-").map(Number);
    const [yB, mB, dB] = dateB.split("-").map(Number);

    const sunA = getSunSign(mA, dA);
    const sunB = getSunSign(mB, dB);
    const moonA = getMoonSign(yA, mA, dA);
    const moonB = getMoonSign(yB, mB, dB);

    setResult({
      sunA, sunB, moonA, moonB,
      sunCompat: getCompatibility(sunA, sunB),
      moonCompat: getCompatibility(moonA, moonB),
    });
  };

  const handleReset = () => setResult(null);

  return (
    <div className="min-h-screen celestial-gradient relative overflow-hidden">
      <StarField />
      <div className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold glow-text mb-3 text-foreground">
            💞 星座配對分析
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            輸入兩個人的生日，看看你們的太陽與月亮星座有多契合
          </p>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto animate-fade-up">
            <div className="space-y-2">
              <Label className="text-celestial-rose text-sm tracking-wide">
                👤 第一個人的生日 *
              </Label>
              <Input type="date" value={dateA} onChange={(e) => setDateA(e.target.value)} required
                className="bg-secondary border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-celestial-moon text-sm tracking-wide">
                👤 第二個人的生日 *
              </Label>
              <Input type="date" value={dateB} onChange={(e) => setDateB(e.target.value)} required
                className="bg-secondary border-border text-foreground" />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 text-base py-5 tracking-wider">
              💞 分析配對
            </Button>
          </form>
        ) : (
          <div className="w-full max-w-md space-y-6">
            {/* Versus header */}
            <div className="flex items-center justify-center gap-4 animate-fade-up">
              <div className="text-center">
                <div className="text-4xl mb-1">{ZODIAC_SIGNS[result.sunA].symbol}</div>
                <div className="text-sm text-celestial-rose font-medium">{ZODIAC_SIGNS[result.sunA].name}</div>
              </div>
              <div className="text-2xl text-accent animate-float">💞</div>
              <div className="text-center">
                <div className="text-4xl mb-1">{ZODIAC_SIGNS[result.sunB].symbol}</div>
                <div className="text-sm text-celestial-moon font-medium">{ZODIAC_SIGNS[result.sunB].name}</div>
              </div>
            </div>

            {/* Sun compatibility */}
            <CompatCard
              title="☀️ 太陽星座配對"
              subtitle={`${ZODIAC_SIGNS[result.sunA].name} × ${ZODIAC_SIGNS[result.sunB].name}`}
              result={result.sunCompat}
              delay={1}
            />

            {/* Moon compatibility */}
            <CompatCard
              title="🌙 月亮星座配對"
              subtitle={`${ZODIAC_SIGNS[result.moonA].name} × ${ZODIAC_SIGNS[result.moonB].name}`}
              result={result.moonCompat}
              delay={2}
            />

            {/* Overall */}
            <div className="bg-card border border-border rounded-lg p-5 glow-card animate-fade-up-delay-3 text-center">
              <h3 className="font-serif text-primary text-lg mb-2">✨ 綜合評語</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                太陽星座代表你們的外在互動與社交模式，月亮星座則揭示情感深層的連結。
                {result.sunCompat.score >= 70 && result.moonCompat.score >= 70
                  ? "你們在外在和內在都有很高的契合度，是讓人羨慕的組合！"
                  : result.sunCompat.score >= 70
                    ? "你們在社交上很合拍，但情感上需要多一些理解和耐心。"
                    : result.moonCompat.score >= 70
                      ? "你們的情感連結很深，即使表面上看起來不太一樣，心靈卻很靠近。"
                      : "你們的組合充滿挑戰，但也最具成長潛力。接受差異，反而能激發最好的彼此。"
                }
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={handleReset}
                className="flex-1 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                重新配對
              </button>
              <button onClick={() => navigate("/")}
                className="flex-1 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                查詢個人星座
              </button>
            </div>
          </div>
        )}

        {/* Nav back */}
        {!result && (
          <button onClick={() => navigate("/")}
            className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
            ← 返回個人星座查詢
          </button>
        )}
      </div>
    </div>
  );
};

function CompatCard({ title, subtitle, result, delay }: {
  title: string; subtitle: string; result: CompatibilityResult; delay: number;
}) {
  const delayClass = delay === 1 ? "animate-fade-up-delay-1" : "animate-fade-up-delay-2";

  return (
    <div className={`bg-secondary/50 rounded-lg p-5 glow-card ${delayClass}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-serif text-accent text-lg">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-foreground">{result.score}</div>
          <div className="text-xs text-muted-foreground">/ 100</div>
        </div>
      </div>

      {/* Score bar */}
      <div className="w-full h-2 bg-muted rounded-full mb-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${result.score}%` }}
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{result.emoji}</span>
        <span className="text-sm font-medium text-foreground">{result.level}</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{result.summary}</p>

      <div className="space-y-2 text-xs text-foreground/70">
        <p>🔮 {result.details.element}</p>
        <p>⚡ {result.details.dynamic}</p>
        <p>💡 {result.details.advice}</p>
      </div>
    </div>
  );
}

export default Compatibility;
