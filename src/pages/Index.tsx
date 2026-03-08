import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import BirthForm from "@/components/BirthForm";
import TriangleDisplay from "@/components/TriangleDisplay";
import ResultCard from "@/components/ResultCard";
import ShareCard from "@/components/ShareCard";
import { getSunSign, getMoonSign, getRisingSign } from "@/lib/astro-calc";

interface Result {
  sun: string;
  moon: string;
  rising?: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (data: { year: number; month: number; day: number; hour?: number; minute?: number }) => {
    const sun = getSunSign(data.month, data.day);
    const moon = getMoonSign(data.year, data.month, data.day);
    const rising = data.hour !== undefined && data.minute !== undefined
      ? getRisingSign(data.month, data.day, data.hour, data.minute)
      : undefined;
    setResult({ sun, moon, rising });
  };

  const handleReset = () => setResult(null);

  return (
    <div className="min-h-screen celestial-gradient relative overflow-hidden">
      <StarField />

      <div className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold glow-text mb-3 text-foreground">
            🌙 月亮星座查詢器
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            探索你的太陽、月亮與上升星座<br />
            揭開你性格中隱藏的另一面
          </p>
        </div>

        {!result ? (
          <BirthForm onSubmit={handleSubmit} />
        ) : (
          <div className="w-full max-w-md space-y-8">
            <TriangleDisplay sun={result.sun} moon={result.moon} rising={result.rising} />
            <ResultCard sun={result.sun} moon={result.moon} rising={result.rising} />
            <ShareCard sun={result.sun} moon={result.moon} rising={result.rising} />

            <div className="text-center pt-4">
              <button
                onClick={handleReset}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                重新查詢
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
