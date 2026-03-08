import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getSunSign, getMoonSign } from "@/lib/astro-calc";
import { ZODIAC_SIGNS } from "@/lib/zodiac-data";
import { getDailyFortune, type DailyFortune } from "@/lib/daily-horoscope";

interface FortuneResult {
  sunSign: string;
  moonSign: string;
  sunFortune: DailyFortune;
  moonFortune: DailyFortune;
}

function ScoreBar({ label, icon, score }: { label: string; icon: string; score: number }) {
  const color = score >= 85 ? "bg-accent" : score >= 70 ? "bg-primary" : "bg-celestial-moon";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{icon} {label}</span>
        <span className="text-foreground font-medium">{score}分</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function FortuneCard({ title, icon, fortune, signName }: { title: string; icon: string; fortune: DailyFortune; signName: string }) {
  return (
    <div className="bg-secondary/50 rounded-lg p-5 glow-card space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-foreground flex items-center gap-2">
          <span className="text-xl">{icon}</span> {title}：{signName}
        </h3>
        <span className="text-sm bg-primary/20 text-primary px-2 py-0.5 rounded-full">{fortune.mood}</span>
      </div>

      <div className="space-y-3">
        <ScoreBar label="綜合運勢" icon="⭐" score={fortune.overallScore} />
        <ScoreBar label="愛情運勢" icon="💕" score={fortune.loveScore} />
        <ScoreBar label="事業運勢" icon="💼" score={fortune.careerScore} />
        <ScoreBar label="健康運勢" icon="🌿" score={fortune.healthScore} />
      </div>

      <div className="space-y-2 pt-2 border-t border-border">
        <p className="text-sm text-muted-foreground"><span className="text-celestial-rose">💞</span> {fortune.loveTip}</p>
        <p className="text-sm text-muted-foreground"><span className="text-accent">💼</span> {fortune.careerTip}</p>
        <p className="text-sm text-muted-foreground"><span className="text-celestial-moon">🌿</span> {fortune.healthTip}</p>
      </div>

      <div className="flex gap-4 text-xs text-muted-foreground pt-1">
        <span>🎨 幸運色：{fortune.luckyColor}</span>
        <span>🔢 幸運數字：{fortune.luckyNumber}</span>
      </div>
    </div>
  );
}

export default function DailyHoroscope() {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<FortuneResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const [year, month, day] = birthDate.split("-").map(Number);
    const sunSign = getSunSign(month, day);
    const moonSign = getMoonSign(year, month, day);
    setResult({
      sunSign,
      moonSign,
      sunFortune: getDailyFortune(sunSign),
      moonFortune: getDailyFortune(moonSign),
    });
  };

  const today = new Date();
  const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

  return (
    <div className="min-h-screen celestial-gradient relative overflow-hidden">
      <StarField />
      <div className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-20">
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold glow-text mb-3 text-foreground">
            🔮 每日星座運勢
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            {dateStr} — 看看今天的星星為你帶來什麼訊息
          </p>
        </div>

        {!result ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto animate-fade-up">
              <div className="space-y-2">
                <Label htmlFor="dailyBirthDate" className="text-secondary-foreground text-sm tracking-wide">
                  出生日期
                </Label>
                <Input
                  id="dailyBirthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                  className="bg-secondary border-border text-foreground"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 text-base py-5 tracking-wider">
                🔮 查看今日運勢
              </Button>
            </form>
            <button onClick={() => navigate("/")}
              className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
              🌙 返回星座查詢
            </button>
          </>
        ) : (
          <div className="w-full max-w-md space-y-6">
            {/* Summary */}
            <div className="bg-card border border-border rounded-lg p-5 glow-card animate-fade-up text-center">
              <p className="text-sm text-foreground/80 leading-relaxed italic font-serif">
                「{result.sunFortune.summary}」
              </p>
            </div>

            <FortuneCard
              title="太陽星座"
              icon="☀️"
              fortune={result.sunFortune}
              signName={ZODIAC_SIGNS[result.sunSign].name}
            />

            {result.sunSign !== result.moonSign && (
              <FortuneCard
                title="月亮星座"
                icon="🌙"
                fortune={result.moonFortune}
                signName={ZODIAC_SIGNS[result.moonSign].name}
              />
            )}

            <div className="text-center pt-4 space-y-3">
              <button onClick={() => setResult(null)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                重新查詢
              </button>
              <br />
              <button onClick={() => navigate("/")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                🌙 返回星座查詢
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
