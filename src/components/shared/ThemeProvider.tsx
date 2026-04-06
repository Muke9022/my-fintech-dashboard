'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration error se bachne ke liye (Zaroori hai!)
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-3 p-2 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-xl transition-all ${
          theme === 'light' 
            ? 'bg-white text-orange-500 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Sun size={18} strokeWidth={2.5} />
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-xl transition-all ${
          theme === 'dark' 
            ? 'bg-slate-700 text-blue-400 shadow-lg' 
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Moon size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}