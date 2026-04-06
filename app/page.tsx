'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C41E3A]/20 blur-[120px] rounded-full z-0" />

      {/* ─── NAVBAR ─── */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-[#C41E3A] to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">
            Arteriaz
          </span>
        </div>

        <Link href="/investor/deals">
          <button className="text-xs font-bold uppercase tracking-widest border border-slate-800 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">
            Login
          </button>
        </Link>
      </nav>

      {/* ─── HERO ─── */}
      <main className="relative z-10 max-w-6xl mx-auto pt-24 pb-32 px-6 text-center">

        {/* LIVE BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/70 border border-slate-800 mb-10 backdrop-blur">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform is Live
          </span>
        </div>

        {/* HEADLINE */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
          Invest in the Future of <br />
          <span className="bg-gradient-to-r from-[#C41E3A] to-pink-500 text-transparent bg-clip-text">
            Fintech Innovation
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          Discover exclusive high-growth fintech startups, analyze real-time metrics,
          and invest with institutional-grade precision.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">

          <Link href="/investor/deals">
            <button className="group bg-gradient-to-r from-[#C41E3A] to-pink-600 px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all">
              Enter Terminal
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </button>
          </Link>

          <button className="px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest border border-slate-700 hover:bg-slate-800 transition-all backdrop-blur">
            View Docs
          </button>

        </div>

        {/* TRUST LINE */}
        <div className="mt-16 text-slate-600 text-xs uppercase tracking-[0.3em]">
          Trusted by Early Stage Investors & Analysts
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 py-10 text-center border-t border-slate-900">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em]">
          © 2026 Arteriaz Fintech Terminal
        </p>
      </footer>

    </div>
  );
}