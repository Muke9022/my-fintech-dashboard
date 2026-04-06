'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const fundingData = [
  { month: 'Jan', raised: 2400000 },
  { month: 'Feb', raised: 3200000 },
  { month: 'Mar', raised: 2800000 },
  { month: 'Apr', raised: 4500000 },
  { month: 'May', raised: 5100000 },
  { month: 'Jun', raised: 4800000 },
];

const conversionData = [
  { month: 'Jan', rate: 12 },
  { month: 'Feb', rate: 18 },
  { month: 'Mar', rate: 15 },
  { month: 'Apr', rate: 22 },
  { month: 'May', rate: 28 },
  { month: 'Jun', rate: 25 },
];

const investorData = [
  { name: 'Fintech', value: 40 },
  { name: 'SaaS', value: 30 },
  { name: 'CleanTech', value: 20 },
  { name: 'HealthTech', value: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const stats = [
  { label: 'Total Funding Raised', value: '$22.8M', change: '+18%', color: '#3b82f6' },
  { label: 'Total Investors', value: '142', change: '+12', color: '#10b981' },
  { label: 'Conversion Rate', value: '25%', change: '+3%', color: '#f59e0b' },
  { label: 'Active Deals', value: '38', change: '+5', color: '#8b5cf6' },
];

const metrics = [
  { label: 'Avg Deal Size', value: '$485K', progress: 72 },
  { label: 'Investor Retention', value: '89%', progress: 89 },
  { label: 'Due Diligence Pass Rate', value: '64%', progress: 64 },
  { label: 'Time to Close (days)', value: '42', progress: 58 },
];

export default function CorporateDashboard() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
          Corporate Analytics
        </h1>
        <p style={{ color: '#64748b' }}>Track your funding performance and investor engagement.</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
          }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '8px' }}>{stat.label}</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>{stat.value}</p>
            <p style={{ color: '#22c55e', fontSize: '0.875rem' }}>{stat.change} this month</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Bar Chart */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', color: 'white' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Monthly Funding Raised</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fundingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
<Tooltip formatter={(v: any) => [`$${(Number(v) / 1000000).toFixed(2)}M`, 'Raised']} />              <Bar dataKey="raised" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', color: 'white' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Conversion Rate Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${v}%`} />
<Tooltip formatter={(v: any) => [`${v}%`, 'Conversion']} />              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Pie Chart */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', color: 'white' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Investor Industry Focus</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={investorData} innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value">
                {investorData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
<Tooltip formatter={(v: any) => [`${v}%`, 'Share']} />            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {investorData.map((item, i) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS[i] }} />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', color: 'white' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '24px' }}>Key Performance Metrics</h3>
          {metrics.map((metric) => (
            <div key={metric.label} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{metric.label}</span>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>{metric.value}</span>
              </div>
              <div style={{ backgroundColor: '#334155', borderRadius: '999px', height: '6px' }}>
                <div style={{
                  backgroundColor: '#3b82f6',
                  height: '6px',
                  borderRadius: '999px',
                  width: `${metric.progress}%`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}