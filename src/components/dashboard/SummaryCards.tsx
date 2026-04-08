'use client';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchDeals, loadSavedDeals } from '../../store/slices/dealSlice';
import { getRecommendedDeals } from '../../utils/scoring';
import { TrendingUp, Wallet, Briefcase, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';

export default function SummaryCards() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, userInterests, savedDeals } = useSelector((state: RootState) => state.deals);

  useEffect(() => {
    dispatch(fetchDeals());
    dispatch(loadSavedDeals());
  }, [dispatch]);

  //  Real data from Redux
  const totalInvestment = useMemo(() => {
    const total = items.reduce((sum, d) => sum + (d.fundingGoal || 0), 0);
    return `$${(total / 1000000).toFixed(1)}M`;
  }, [items]);

  const activeDeals = items.length;

  const avgROI = useMemo(() => {
    if (!items.length) return '0%';
    const avg = items.reduce((sum, d) => sum + (d.roi || 0), 0) / items.length;
    return `${avg.toFixed(1)}%`;
  }, [items]);

  const riskDistribution = useMemo(() => {
    const low = items.filter(d => d.riskLevel === 'Low').length;
    const pct = items.length ? Math.round((low / items.length) * 100) : 0;
    return { label: pct >= 50 ? 'Low' : 'Medium', pct };
  }, [items]);

  // FIXED: Removed 3rd argument and used .slice(0, 3) for top 3
  const top3 = useMemo(
    () => getRecommendedDeals(items, userInterests).slice(0, 3),
    [items, userInterests]
  );

  const cards = [
    {
      label: 'Total Investments',
      value: totalInvestment,
      change: '+12%',
      changeColor: '#22c55e',
      color: '#3b82f6',
      icon: <Wallet className="text-blue-400" size={24} />,
      bgGradient: 'from-blue-500/10 to-transparent',
      barWidth: '65%',
    },
    {
      label: 'Active Deals',
      value: String(activeDeals),
      change: 'Steady',
      changeColor: '#3b82f6',
      color: '#10b981',
      icon: <Briefcase className="text-emerald-400" size={24} />,
      bgGradient: 'from-emerald-500/10 to-transparent',
      barWidth: '80%',
    },
    {
      label: 'Avg ROI',
      value: avgROI,
      change: '+2.4%',
      changeColor: '#a855f7',
      color: '#f59e0b',
      icon: <TrendingUp className="text-amber-400" size={24} />,
      bgGradient: 'from-amber-500/10 to-transparent',
      barWidth: '50%',
    },
    {
      label: 'Risk Factor',
      value: riskDistribution.label,
      change: `${riskDistribution.pct}% Low`,
      changeColor: '#f59e0b',
      color: '#ef4444',
      icon: <ShieldCheck className="text-red-400" size={24} />,
      bgGradient: 'from-red-500/10 to-transparent',
      barWidth: `${riskDistribution.pct}%`,
    },
  ];

  return (
    <>
      {/* SUMMARY CARDS — Real Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="relative overflow-hidden bg-[#1e293b] border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.bgGradient} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:border-slate-600 transition-colors">
                  {card.icon}
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700"
                  style={{ color: card.changeColor }}
                >
                  {card.change}
                </span>
              </div>

              <p className="text-slate-400 text-sm font-medium mb-1">{card.label}</p>
              <h3 className="text-3xl font-bold tracking-tight" style={{ color: card.color }}>
                {card.value}
              </h3>

              <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 group-hover:w-full"
                  style={{
                    backgroundColor: card.color,
                    width: card.barWidth,
                    boxShadow: `0 0 10px ${card.color}44`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOP 3 RECOMMENDED DEALS — Recommendation Engine */}
      {top3.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-amber-400 fill-amber-400" />
              <h3 className="text-lg font-bold text-white">Top Recommended Deals</h3>
              <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                Based on your interests
              </span>
            </div>
            <Link
              href="/investor/deals"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {top3.map((deal: any, index: number) => {
              const riskColor =
                deal.riskLevel === 'Low' ? '#22c55e'
                : deal.riskLevel === 'Medium' ? '#f59e0b'
                : '#ef4444';

              const scoreColor =
                deal.score >= 70 ? 'text-emerald-400'
                : deal.score >= 40 ? 'text-amber-400'
                : 'text-slate-400';

              return (
                <Link key={deal.id} href={`/deals/${deal.id}`} className="no-underline group">
                  <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-5 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1">

                    {/* Rank badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-lg">
                        #{index + 1} Match
                      </span>
                      <span
                        style={{ color: riskColor, backgroundColor: riskColor + '15' }}
                        className="text-[10px] font-extrabold uppercase px-2 py-1 rounded-full border border-current/20"
                      >
                        {deal.riskLevel} Risk
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-base mb-1 group-hover:text-blue-400 transition-colors">
                      {deal.companyName}
                    </h4>
                    <p className="text-slate-500 text-xs mb-4 line-clamp-1">{deal.description}</p>

                    {/* Match Score bar */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-slate-400">Match</span>
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${deal.score}%` }}
                        />
                      </div>
                      <span className={`text-xs font-black ${scoreColor}`}>{deal.score}%</span>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between pt-3 border-t border-slate-700/50">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">ROI</p>
                        <p className="text-emerald-400 font-bold text-sm">{deal.roi}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Sector</p>
                        <p className="text-blue-400 font-bold text-sm uppercase">{deal.industry}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Goal</p>
                        <p className="text-white font-bold text-sm">
                          ${(deal.fundingGoal / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}