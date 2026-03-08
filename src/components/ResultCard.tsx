import { ZODIAC_SIGNS, getCombinedReading } from "@/lib/zodiac-data";

interface ResultCardProps {
  sun: string;
  moon: string;
  rising?: string;
}

export default function ResultCard({ sun, moon, rising }: ResultCardProps) {
  const sunSign = ZODIAC_SIGNS[sun];
  const moonSign = ZODIAC_SIGNS[moon];
  const risingSign = rising ? ZODIAC_SIGNS[rising] : null;

  return (
    <div className="space-y-5 w-full max-w-md mx-auto">
      {/* Sun */}
      <div className="bg-secondary/50 rounded-lg p-4 glow-card animate-fade-up-delay-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">☀️</span>
          <h3 className="font-serif text-accent text-lg">太陽星座：{sunSign.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{sunSign.sunDescription}</p>
      </div>

      {/* Moon */}
      <div className="bg-secondary/50 rounded-lg p-4 glow-card animate-fade-up-delay-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🌙</span>
          <h3 className="font-serif text-celestial-moon text-lg">月亮星座：{moonSign.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{moonSign.moonDescription}</p>
      </div>

      {/* Rising */}
      <div className="bg-secondary/50 rounded-lg p-4 glow-card animate-fade-up-delay-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">⬆️</span>
          <h3 className="font-serif text-celestial-rose text-lg">
            上升星座：{risingSign ? risingSign.name : "未提供出生時間"}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {risingSign ? risingSign.risingDescription : "提供出生時間即可查詢你的上升星座，了解別人對你的第一印象。"}
        </p>
      </div>

      {/* Combined */}
      <div className="bg-card border border-border rounded-lg p-5 glow-card animate-fade-up-delay-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📊</span>
          <h3 className="font-serif text-primary text-lg">三合一解讀</h3>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed italic">
          「{getCombinedReading(sun, moon, rising)}」
        </p>
      </div>
    </div>
  );
}
