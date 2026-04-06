'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeProvider';
import { LayoutDashboard, Briefcase, PieChart, LogOut, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Investor Dashboard', icon: <LayoutDashboard size={20} />, path: '/investor' },
    { name: 'Deal Explorer', icon: <Briefcase size={20} />, path: '/investor/deals' },
    { name: 'Corporate Analytics', icon: <PieChart size={20} />, path: '/corporate' },
  ];

  return (
    <aside
      style={{
        width: '256px',
        height: '100vh',
        backgroundColor: '#0f172a',
        color: 'white',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: '16px',
        borderRight: '1px solid #1e293b',
        zIndex: 70,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
      }}
      className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
    >
      {/* Logo + Close button (mobile) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '0 8px' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <span style={{ color: '#60a5fa' }}>Arteriaz </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Fintech</span>
        </div>

        {/* ✅ Close button — only mobile */}
        <button
          onClick={onClose}
          className="sidebar-close-btn"
          style={{
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '6px',
            padding: '6px',
            cursor: 'pointer',
            color: 'white',
            display: 'none', // desktop pe hidden
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose} // mobile pe click karne pe sidebar band
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive ? '#60a5fa' : 'white',
                backgroundColor: isActive ? '#1e293b' : 'transparent',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'background 0.2s',
                borderLeft: isActive ? '3px solid #60a5fa' : '3px solid transparent',
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.backgroundColor = '#1e293b';
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom — Theme + Logout */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '20px',
        borderTop: '1px solid #1e293b'
      }}>
        <p style={{
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          color: '#64748b',
          fontWeight: 'bold',
          letterSpacing: '1px',
          marginBottom: '12px',
          paddingLeft: '8px'
        }}>
          Appearance
        </p>
        <div style={{ padding: '0 4px' }}>
          <ThemeToggle />
        </div>

        <div style={{
          marginTop: '20px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#94a3b8',
          fontSize: '0.875rem',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1e293b'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;