import { ZODIAC_SIGNS, getCombinedReading } from "@/lib/zodiac-data";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { toast } from "sonner";

interface ShareCardProps {
  sun: string;
  moon: string;
  rising?: string;
}

export default function ShareCard({ sun, moon, rising }: ShareCardProps) {
  const sunSign = ZODIAC_SIGNS[sun];
  const moonSign = ZODIAC_SIGNS[moon];
  const risingSign = rising ? ZODIAC_SIGNS[rising] : null;
  const cardRef = useRef<HTMLDivElement>(null);

  const shareText = `☀️ ${sunSign.name} | 🌙 ${moonSign.name}${risingSign ? ` | ⬆️ ${risingSign.name}` : ""}\n\n「${getCombinedReading(sun, moon, rising).slice(0, 80)}...」\n\n我的月亮在${moonSign.name} 🌙 你的呢？`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("已複製到剪貼簿！");
    } catch {
      toast.error("複製失敗，請手動複製");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "我的月亮星座", text: shareText });
      } catch { /* cancelled */ }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-fade-up-delay-3">
      {/* Preview card */}
      <div ref={cardRef} className="celestial-gradient rounded-xl p-6 border border-primary/20 glow-card text-center space-y-3">
        <div className="text-3xl space-x-4">
          <span>{sunSign.symbol}</span>
          <span>{moonSign.symbol}</span>
          {risingSign && <span>{risingSign.symbol}</span>}
        </div>
        <div className="text-sm text-foreground/70 space-x-2">
          <span>☀️ {sunSign.name}</span>
          <span>·</span>
          <span>🌙 {moonSign.name}</span>
          {risingSign && <><span>·</span><span>⬆️ {risingSign.name}</span></>}
        </div>
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          我的月亮在{moonSign.name} 🌙 你的呢？
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleCopy} variant="outline" className="flex-1 border-border text-foreground hover:bg-secondary">
          📋 複製文字
        </Button>
        <Button onClick={handleShare} className="flex-1 bg-primary text-primary-foreground hover:opacity-90">
          🔗 分享結果
        </Button>
      </div>
    </div>
  );
}
