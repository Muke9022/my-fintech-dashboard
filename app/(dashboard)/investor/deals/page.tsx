'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDeals } from '../../../../src/store/slices/dealSlice';
import { AppDispatch } from '../../../../src/store/store';
import DealExplorer from '../../../../src/components/dashboard/DealExplorer';

export default function DealsPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
          Deal Explorer
        </h1>
        <p style={{ color: '#64748b' }}>Browse and filter all available investment deals.</p>
      </div>
      <DealExplorer />
    </div>
  );
}