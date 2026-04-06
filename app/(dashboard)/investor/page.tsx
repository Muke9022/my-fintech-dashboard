'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvestors } from '../../../src/store/slices/investorSlice';
import { AppDispatch, RootState } from '../../../src/store/store';

const riskColor = (risk: string) => {
  if (risk === 'Low') return '#22c55e';
  if (risk === 'Medium') return '#f59e0b';
  return '#ef4444';
};

export default function InvestorsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.investors);

  useEffect(() => {
    dispatch(fetchInvestors());
  }, [dispatch]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
      Loading investors...
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
          Investors
        </h1>
        <p style={{ color: '#64748b' }}>All registered investors on the platform.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {items.map((investor) => (
          <div key={investor.id} style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
          }}>
            {/* Avatar + Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                backgroundColor: '#3b82f6', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '1rem',
              }}>
                {investor.avatar}
              </div>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>{investor.name}</p>
                <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{investor.location}</p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '12px' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '4px' }}>Portfolio</p>
                <p style={{ color: '#3b82f6', fontWeight: 'bold' }}>${(investor.portfolio / 1000000).toFixed(1)}M</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '12px' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '4px' }}>Avg ROI</p>
                <p style={{ color: '#10b981', fontWeight: 'bold' }}>{investor.avgRoi}%</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '12px' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '4px' }}>Active Deals</p>
                <p style={{ color: '#f59e0b', fontWeight: 'bold' }}>{investor.activeDeals}</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '12px' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '4px' }}>Success Rate</p>
                <p style={{ color: '#22c55e', fontWeight: 'bold' }}>{investor.successRate}%</p>
              </div>
            </div>

            {/* Risk */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Risk Appetite</span>
              <span style={{
                backgroundColor: riskColor(investor.riskAppetite) + '20',
                color: riskColor(investor.riskAppetite),
                padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600,
              }}>{investor.riskAppetite}</span>
            </div>

            {/* Industries */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {investor.preferredIndustries.map((ind) => (
                <span key={ind} style={{
                  backgroundColor: '#334155', color: '#94a3b8',
                  padding: '3px 10px', borderRadius: '999px', fontSize: '0.7rem',
                }}>{ind}</span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}