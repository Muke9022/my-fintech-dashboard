import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant: string;
}

export const Badge = ({ children, variant }: BadgeProps) => {
  const styles: Record<string, string> = {
    Low: "text-emerald-600 border-emerald-600/20 bg-emerald-500/10",
    Medium: "text-amber-600 border-amber-600/20 bg-amber-500/10",
    High: "text-rose-600 border-rose-600/20 bg-rose-500/10"
  };

  return (
    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-wider ${styles[variant] || 'bg-slate-100 text-slate-600'}`}>
      {children}
    </span>
  );
};