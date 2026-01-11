import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar, MobileNav } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check screen size
  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth < 1024 && window.innerWidth >= 768;
      setIsMobile(mobile);
      setSidebarCollapsed(tablet);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update page title based on route
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Dashboard',
      '/settings': 'Settings',
      '/create': 'Create Presentation',
    };

    const pathTitle = titles[location.pathname];
    if (pathTitle) {
      document.title = `${pathTitle} | N46.ai`;
    } else if (location.pathname.startsWith('/presentation/')) {
      document.title = 'View Presentation | N46.ai';
    } else {
      document.title = 'N46.ai - AI Presentation Platform';
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-n46-gray-50">
      {/* Desktop/Tablet Sidebar */}
      {!isMobile && (
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {/* Main Content */}
      <main
        className={`
          min-h-screen transition-all duration-200
          ${isMobile
            ? 'pt-0 pb-20 px-4'
            : sidebarCollapsed
              ? 'ml-24 p-10'
              : 'ml-80 p-10'
          }
        `}
      >
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileNav />}
    </div>
  );
}
