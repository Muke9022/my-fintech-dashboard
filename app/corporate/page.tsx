'use client';

import { useEffect, useState } from 'react';
import { dealService } from '../../src/services/dealService';
import { investorService } from '../../src/services/investorService';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

// 🔥 Format Large Numbers - FIXED: Always returns a string for TypeScript
const formatYAxis = (value: any): string => {
  const num = Number(value);
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
};

// Custom Tooltip for professional look
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '12px' }}>{label}</p>
        <p style={{ color: '#f8fafc', margin: 0, fontWeight: 'bold' }}>
          {payload[0].name}: {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function CorporateDashboard() {
  const [deals, setDeals] = useState<any[]>([]);
  const [investors, setInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dealsData = await dealService.getDeals();
        const investorsData = await investorService.getInvestors();
        setDeals(dealsData);
        setInvestors(investorsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p style={{ padding: '20px', color: 'white' }}>Loading...</p>;

  const totalFunding = deals.reduce((sum, d) => sum + d.raisedAmount, 0);
  const totalInvestors = investors.length;
  const activeDeals = deals.length;
  const fundedDeals = deals.filter(d => d.raisedAmount > 0).length;
  const conversionRate = ((fundedDeals / deals.length) * 100).toFixed(1);

  const stats = [
    { label: 'Total Funding Raised', value: `$${(totalFunding / 1000000).toFixed(1)}M`, color: '#3b82f6' },
    { label: 'Total Investors', value: totalInvestors.toString(), color: '#10b981' },
    { label: 'Conversion Rate', value: `${conversionRate}%`, color: '#f59e0b' },
    { label: 'Active Deals', value: activeDeals.toString(), color: '#8b5cf6' },
  ];

  const fundingData = deals.map(d => ({ name: d.companyName, raised: d.raisedAmount }));
  const conversionData = deals.map(d => ({ name: d.companyName, rate: Math.min(100, Math.round((d.raisedAmount / d.fundingGoal) * 100)) }));
  
  const industryMap: any = {};
  deals.forEach(d => { industryMap[d.industry] = (industryMap[d.industry] || 0) + 1; });
  const pieData = Object.entries(industryMap).map(([name, value]) => ({ name, value }));

  const metrics = [
    { label: 'Avg Deal Size', value: `$${(totalFunding / (deals.length || 1) / 1000).toFixed(0)}K` },
    { label: 'Investor Retention', value: '89%' },
    { label: 'Due Diligence Pass Rate', value: '64%' },
    { label: 'Time to Close (days)', value: '42' },
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: '#f8fafc' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.025em' }}>
          Corporate Analytics <span style={{ color: '#64748b', fontWeight: '400', fontSize: '1rem' }}>/ Real-time Overview</span>
        </h1>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ background: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '8px', fontWeight: '500' }}>{stat.label}</p>
            <h2 style={{ color: stat.color, fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>

        {/* Professional Bar Chart */}
        <div style={{ background: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#f1f5f9' }}>Funding by Company</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fundingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                tickFormatter={formatYAxis}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff10' }} />
              <Bar dataKey="raised" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Professional Line Chart */}
        <div style={{ background: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#f1f5f9' }}>Conversion Progress (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#1e293b' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>

        {/* Professional Pie Chart */}
        <div style={{ background: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#f1f5f9' }}>Industry Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={pieData} 
                dataKey="value" 
                innerRadius={70} 
                outerRadius={100} 
                paddingAngle={5} 
                stroke="none"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics List */}
        <div style={{ background: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#f1f5f9' }}>Operational Efficiency</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #334155' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{m.label}</span>
                <span style={{ fontWeight: '600', color: '#f8fafc' }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}