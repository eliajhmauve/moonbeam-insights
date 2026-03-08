import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BirthFormProps {
  onSubmit: (data: { year: number; month: number; day: number; hour?: number; minute?: number }) => void;
}

export default function BirthForm({ onSubmit }: BirthFormProps) {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const [year, month, day] = birthDate.split("-").map(Number);
    let hour: number | undefined;
    let minute: number | undefined;
    if (birthTime) {
      [hour, minute] = birthTime.split(":").map(Number);
    }
    onSubmit({ year, month, day, hour, minute });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto animate-fade-up">
      <div className="space-y-2">
        <Label htmlFor="birthDate" className="text-secondary-foreground text-sm tracking-wide">
          出生日期 *
        </Label>
        <Input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          className="bg-secondary border-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthTime" className="text-secondary-foreground text-sm tracking-wide">
          出生時間（選填，可查上升星座）
        </Label>
        <Input
          id="birthTime"
          type="time"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
          className="bg-secondary border-border text-foreground"
        />
      </div>

      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 text-base py-5 tracking-wider">
        ✨ 查詢我的星座
      </Button>
    </form>
  );
}
