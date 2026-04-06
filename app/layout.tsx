'use client';
import { ReduxProvider } from "../src/store/Provider";
import Sidebar from "../src/components/shared/Sidebar";
import './globals.css';
import { useState } from 'react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <ReduxProvider>

          {/* Hamburger - mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <span /><span /><span />
          </button>

          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="mobile-overlay"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* ✅ NO inline style - sirf class */}
     {/* ✅ Inline styles kadhun tak, fakt class-name thev */}
<main className="main-content">
  {children}
</main>
        </ReduxProvider>
      </body>
    </html>
  );
}