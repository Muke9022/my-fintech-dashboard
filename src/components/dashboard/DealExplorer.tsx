'use client';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchDeals, toggleSavedDeal, loadSavedDeals } from '../../store/slices/dealSlice';
import { getRecommendedDeals } from '../../utils/scoring';
import Link from 'next/link';
import { Search, TrendingUp, ChevronRight, ChevronLeft, Heart, Star } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

// ✅ NAVEEN UI COMPONENTS IMPORTS
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type Tab = 'all' | 'recommended' | 'interests';
const PER_PAGE = 6;

const TAB_CONFIG = [
  { key: 'all'         as Tab, label: '🗂️ All Deals'   },
  { key: 'recommended' as Tab, label: '⭐ Recommended'  },
  { key: 'interests'   as Tab, label: '❤️ My Interests' },
] as const;

function SkeletonCard() {
  return (
    <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="h-5 w-36 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <div className="h-5 w-14 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>
      <div className="space-y-2 flex-grow">
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-800 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100 dark:border-slate-800">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 bg-slate-100 dark:bg-slate-800 rounded-lg" />
        ))}
      </div>
      <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />
    </div>
  );
}

function LazyCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="transition-all duration-500" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
      {children}
    </div>
  );
}

export default function DealExplorer() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, userInterests, savedDeals } = useSelector((state: RootState) => state.deals);

  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('All Industries');
  const [risk, setRisk] = useState('All Risk Levels');
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    dispatch(fetchDeals());
    dispatch(loadSavedDeals());
  }, [dispatch]);

  // ✅ FIXED: Removed the 3rd argument (50) to match TypeScript signature
  const recommendedDeals = useMemo(() => getRecommendedDeals(items, userInterests), [items, userInterests]);
  const myInterestDeals = useMemo(() => items.filter(d => savedDeals.includes(String(d.id))), [items, savedDeals]);

  const baseList = useMemo(() => {
    if (activeTab === 'recommended') return recommendedDeals;
    if (activeTab === 'interests') return myInterestDeals;
    return items;
  }, [activeTab, items, recommendedDeals, myInterestDeals]);

  const filtered = useMemo(() => baseList.filter(deal => {
    const matchSearch = deal.companyName.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchIndustry = industry === 'All Industries' || deal.industry === industry;
    const matchRisk = risk === 'All Risk Levels' || deal.riskLevel === risk;
    return matchSearch && matchIndustry && matchRisk;
  }), [baseList, debouncedSearch, industry, risk]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const tabCounts = useMemo(() => ({
    all: items.length,
    recommended: recommendedDeals.length,
    interests: savedDeals.length,
  }), [items.length, recommendedDeals.length, savedDeals.length]);

  const industries = useMemo(() => ['All Industries', ...Array.from(new Set(items.map(d => d.industry)))], [items]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setPage(1);
    setSearch('');
  }, []);

  const handleSave = useCallback((e: React.MouseEvent, dealId: string) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleSavedDeal(dealId));
  }, [dispatch]);

  const scoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-slate-400';
  };

  if (loading) return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* HEADER */}
      <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C41E3A] mb-2">Arteriaz Fintech</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Deal Explorer</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Find your next high-growth investment opportunity.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-wider" style={{ background: 'rgba(196,30,58,0.1)', border: '1px solid rgba(196,30,58,0.3)', color: '#C41E3A' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#C41E3A' }} /> LIVE MARKET
          </div>
        </div>
      </div>

      {/* FILTERS - ✅ USED UI INPUT */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search company name..." value={search} onChange={handleSearch} className="pl-10" />
        </div>
        <div className="flex gap-3">
          <select value={industry} onChange={e => { setIndustry(e.target.value); setPage(1); }} className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20">
            {industries.map(i => <option key={i}>{i}</option>)}
          </select>
          <select value={risk} onChange={e => { setRisk(e.target.value); setPage(1); }} className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20">
            {['All Risk Levels', 'Low', 'Medium', 'High'].map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 mb-8 overflow-x-auto no-scrollbar">
        {TAB_CONFIG.map(({ key, label }) => (
          <button key={key} onClick={() => handleTabChange(key)} className={`px-6 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === key ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
            {label}
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === key ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 dark:bg-slate-800'}`}>{tabCounts[key]}</span>
          </button>
        ))}
      </div>

      {/* CARDS GRID */}
      {paginated.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-slate-500 font-medium">No deals found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {paginated.map((deal: any) => {
            const isSaved = savedDeals.includes(String(deal.id));
            const matchScore = deal.score ?? 0;

            return (
              <LazyCard key={deal.id}>
                <Link href={`/deals/${deal.id}`} className="group block h-full">
                  <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all group-hover:shadow-xl group-hover:border-blue-500/30 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{deal.companyName}</h3>
                      {/* ✅ USED UI BADGE */}
                      <Badge variant={deal.riskLevel}>{deal.riskLevel}</Badge>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 flex-grow">{deal.description}</p>
                    {activeTab === 'recommended' && (
                      <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star size={14} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Match Score</span>
                        </div>
                        <span className={`text-sm font-black ${scoreColor(matchScore)}`}>{matchScore}%</span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                      <div><p className="text-[10px] font-bold text-slate-400 uppercase">ROI</p><p className="text-emerald-500 font-bold text-sm flex items-center gap-1"><TrendingUp size={12} /> {deal.roi}%</p></div>
                      <div className="px-2 border-x border-slate-100 dark:border-slate-800"><p className="text-[10px] font-bold text-slate-400 uppercase">Sector</p><p className="text-blue-500 font-bold text-sm truncate uppercase tracking-tighter">{deal.industry}</p></div>
                      <div className="text-right"><p className="text-[10px] font-bold text-slate-400 uppercase">Goal</p><p className="dark:text-white font-bold text-sm">${(deal.fundingGoal / 1_000_000).toFixed(1)}M</p></div>
                    </div>
                    {/* ✅ USED UI BUTTON */}
                    <Button variant={isSaved ? 'primary' : 'outline'} onClick={e => handleSave(e, String(deal.id))} className="w-full mt-4">
                      <Heart size={14} className={isSaved ? 'fill-rose-500' : ''} />
                      {isSaved ? 'Saved' : 'Save Deal'}
                    </Button>
                  </div>
                </Link>
              </LazyCard>
            );
          })}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pb-12">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-30"><ChevronLeft size={20} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500'}`}>{p}</button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-30"><ChevronRight size={20} /></button>
        </div>
      )}
    </div>
  );
}