'use client';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../src/store/store';
import { toggleSavedDeal } from '../../../../src/store/slices/dealSlice';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Heart, TrendingUp, Shield,
  Target, Building2, DollarSign, BarChart2
} from 'lucide-react';

export default function DealDetailsClient() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'risk'>('overview');

  const deal = useSelector((state: RootState) =>
    state.deals.items.find(d => String(d.id) === String(id))
  );
  const savedDeals = useSelector((state: RootState) => state.deals.savedDeals);
  const isSaved = savedDeals.includes(String(id));

  if (!deal) return (
    <div className="flex items-center justify-center p-20 text-slate-400">
      Deal not found!
    </div>
  );

  const riskColor = deal.riskLevel === 'Low' ? '#22c55e'
    : deal.riskLevel === 'Medium' ? '#f59e0b'
    : '#ef4444';

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Back Button */}
      <Link
        href="/investor/deals"
        className="flex items-center gap-2 text-slate-400 hover:text-blue-400 mb-6 transition-colors text-sm w-fit"
      >
        <ArrowLeft size={16} /> Back to Deal Explorer
      </Link>

      {/* ── HEADER CARD ── */}
      <div className="bg-[#1e293b] rounded-2xl p-8 mb-6 border border-slate-700">
        <div className="flex justify-between items-start flex-wrap gap-4">

          {/* Logo + Name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Building2 size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{deal.companyName}</h1>
              <p className="text-slate-400 text-sm mt-1">
                {deal.industry} • {(deal as any).location || 'Global'}
              </p>
            </div>
          </div>

          {/* Right side — Risk badge + Save button */}
          <div className="flex items-center gap-3">
            <span
              style={{ color: riskColor, backgroundColor: riskColor + '15' }}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase border border-current/20"
            >
              {deal.riskLevel} Risk
            </span>

            {/* ✅ Save to Interests Button */}
            <button
              onClick={() => dispatch(toggleSavedDeal(String(deal.id)))}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                isSaved
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : 'bg-slate-800 border-slate-600 text-slate-400 hover:text-rose-400 hover:border-rose-400/30'
              }`}
            >
              <Heart size={14} className={isSaved ? 'fill-rose-400' : ''} />
              {isSaved ? 'Saved' : 'Save to Interests'}
            </button>
          </div>
        </div>

        <p className="text-slate-300 leading-relaxed mt-5">{deal.description}</p>
      </div>

      {/* ── TABS ── */}
      <div className="flex gap-2 mb-6 border-b border-slate-700">
        {(['overview', 'financials', 'risk'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-semibold capitalize rounded-t-lg transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-blue-400'
            }`}
          >
            {tab === 'overview' && '📋 Overview'}
            {tab === 'financials' && '💰 Financials'}
            {tab === 'risk' && '🛡️ Risk Analysis'}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: 'Funding Goal',
              value: `$${(deal.fundingGoal / 1000000).toFixed(1)}M`,
              icon: <Target size={20} className="text-blue-400" />,
              color: '#3b82f6'
            },
            {
              label: 'Projected ROI',
              value: `${deal.roi}%`,
              icon: <TrendingUp size={20} className="text-emerald-400" />,
              color: '#10b981'
            },
            {
              label: 'Risk Level',
              value: deal.riskLevel,
              icon: <Shield size={20} style={{ color: riskColor }} />,
              color: riskColor
            },
            {
              label: 'Industry',
              value: deal.industry,
              icon: <Building2 size={20} className="text-purple-400" />,
              color: '#a855f7'
            },
            {
              label: 'Min Investment',
              value: `$${(((deal as any).minInvestment || 10000) / 1000).toFixed(0)}K`,
              icon: <DollarSign size={20} className="text-amber-400" />,
              color: '#f59e0b'
            },
            {
              label: 'Stage',
              value: (deal as any).stage || 'Series A',
              icon: <BarChart2 size={20} className="text-pink-400" />,
              color: '#ec4899'
            },
          ].map(item => (
            <div
              key={item.label}
              className="bg-[#1e293b] rounded-xl p-5 border border-slate-700 flex items-center gap-4 hover:border-slate-600 transition-colors"
            >
              <div className="p-3 bg-slate-800 rounded-lg shrink-0">{item.icon}</div>
              <div>
                <p className="text-slate-400 text-xs mb-1">{item.label}</p>
                <p className="text-white font-bold text-lg" style={{ color: item.color }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── FINANCIALS TAB ── */}
      {activeTab === 'financials' && (
        <div className="bg-[#1e293b] rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-bold text-lg mb-6">Financial Metrics</h3>
          <div className="space-y-5">
            {[
              {
                label: 'Funding Goal',
                value: `$${(deal.fundingGoal / 1000000).toFixed(1)}M`,
                pct: 75,
                color: '#3b82f6'
              },
              {
                label: 'Projected ROI',
                value: `${deal.roi}%`,
                pct: Math.min(deal.roi * 3, 100),
                color: '#10b981'
              },
              {
                label: 'Min Investment',
                value: `$${(((deal as any).minInvestment || 10000) / 1000).toFixed(0)}K`,
                pct: 40,
                color: '#f59e0b'
              },
              {
                label: 'Expected Return',
                value: `$${((deal.fundingGoal * deal.roi) / 100 / 1000000).toFixed(2)}M`,
                pct: 60,
                color: '#a855f7'
              },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RISK TAB ── */}
      {activeTab === 'risk' && (
        <div className="space-y-4">
          {/* Risk summary */}
          <div
            style={{ backgroundColor: riskColor + '10', borderColor: riskColor + '40' }}
            className="border rounded-xl p-6"
          >
            <p style={{ color: riskColor }} className="font-bold text-xl mb-2">
              {deal.riskLevel} Risk Profile
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              {deal.riskLevel === 'Low' && 'This deal offers stable returns with minimal volatility. Ideal for conservative investors seeking capital preservation with steady growth.'}
              {deal.riskLevel === 'Medium' && 'Balanced risk-reward profile. Suitable for moderate investors comfortable with some market fluctuation in exchange for higher returns.'}
              {deal.riskLevel === 'High' && 'High potential returns with significant volatility. Recommended only for aggressive investors with high risk tolerance and long investment horizons.'}
            </p>
          </div>

          {/* Risk meter */}
          <div className="bg-[#1e293b] rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-4">Risk Comparison</p>
            <div className="grid grid-cols-3 gap-3">
              {['Low', 'Medium', 'High'].map(level => {
                const lColor = level === 'Low' ? '#22c55e' : level === 'Medium' ? '#f59e0b' : '#ef4444';
                const isActive = deal.riskLevel === level;
                return (
                  <div
                    key={level}
                    style={isActive ? { borderColor: lColor, backgroundColor: lColor + '10' } : {}}
                    className="border border-slate-700 rounded-xl p-4 text-center transition-all"
                  >
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: lColor }}
                    />
                    <p style={{ color: lColor }} className="font-bold text-sm">{level}</p>
                    {isActive && (
                      <p className="text-xs text-slate-400 mt-1">← This deal</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk factors */}
          <div className="bg-[#1e293b] rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-4">Risk Factors</p>
            <div className="space-y-3">
              {[
                { factor: 'Market Risk', level: deal.riskLevel === 'High' ? 85 : deal.riskLevel === 'Medium' ? 50 : 25 },
                { factor: 'Liquidity Risk', level: deal.riskLevel === 'High' ? 70 : deal.riskLevel === 'Medium' ? 40 : 20 },
                { factor: 'Regulatory Risk', level: 35 },
                { factor: 'Operational Risk', level: deal.riskLevel === 'High' ? 60 : deal.riskLevel === 'Medium' ? 35 : 15 },
              ].map(item => (
                <div key={item.factor}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{item.factor}</span>
                    <span style={{ color: riskColor }} className="font-bold">{item.level}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.level}%`, backgroundColor: riskColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}