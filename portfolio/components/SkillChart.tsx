"use client";

import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "next-themes";
import { radarChartData } from "@/lib/data";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      subject: string;
      level: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="glass-panel px-3.5 py-2 rounded-xl text-xs shadow-xl border border-brand-500/30">
        <p className="font-semibold text-slate-900 dark:text-white">
          {data.payload.subject}
        </p>
        <p className="text-brand-600 dark:text-accent-400 font-mono font-bold">
          Proficiency: {data.value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function SkillChart() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[360px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
      </div>
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";
  const strokeColor = isDark ? "#475569" : "#cbd5e1";
  const textColor = isDark ? "#cbd5e1" : "#475569";

  return (
    <div className="w-full h-[360px] sm:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarChartData}>
          <PolarGrid stroke={strokeColor} strokeDasharray="3 3" opacity={0.6} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            stroke={strokeColor}
            tick={{ fill: textColor, fontSize: 10 }}
            opacity={0.5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Skill Proficiency"
            dataKey="level"
            stroke="#6366f1"
            fill="url(#radarGradient)"
            fillOpacity={0.6}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
