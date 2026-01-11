import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Plus, Settings, FileText, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getRecentPresentations } from '../../db';
import { Logo } from '../common';
import type { Presentation } from '../../types';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

function NavItem({ to, icon, label, isActive, collapsed = false, onClick }: NavItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-normal
        transition-all duration-150 ease-out
        ${collapsed ? 'justify-center' : ''}
        ${isActive
          ? 'bg-n46-blue/10 text-n46-blue'
          : 'text-n46-gray-600 hover:bg-n46-gray-50 hover:text-n46-gray-900'
        }
      `}
      title={collapsed ? label : undefined}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

interface RecentItemProps {
  presentation: Presentation;
  collapsed?: boolean;
  onClick?: () => void;
}

function RecentItem({ presentation, collapsed = false, onClick }: RecentItemProps) {
  if (collapsed) return null;

  return (
    <Link
      to={`/presentation/${presentation.id}`}
      onClick={onClick}
      className="
        flex items-center gap-3 px-4 py-2 rounded-lg text-sm
        text-n46-gray-500 hover:bg-n46-gray-50 hover:text-n46-gray-700
        transition-all duration-150 ease-out
      "
    >
      <FileText className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{presentation.title}</span>
    </Link>
  );
}

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();
  const [recentPresentations, setRecentPresentations] = useState<Presentation[]>([]);

  useEffect(() => {
    async function loadRecent() {
      const recent = await getRecentPresentations(3);
      setRecentPresentations(recent);
    }
    loadRecent();
  }, [location.pathname]);

  return (
    <aside
      className={`
        h-screen bg-white border-r border-n46-gray-100 flex flex-col fixed left-0 top-0
        transition-all duration-200 z-40
        ${collapsed ? 'w-24' : 'w-80'}
      `}
    >
      {/* Logo */}
      <div className={`px-6 py-6 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {collapsed ? (
          <Link to="/" className="text-2xl font-semibold text-n46-blue">N</Link>
        ) : (
          <Logo size="sm" />
        )}
        {onToggle && !collapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-n46-gray-50 text-n46-gray-400 hover:text-n46-gray-600 transition-colors lg:hidden"
            aria-label="Collapse sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          <NavItem
            to="/"
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            isActive={location.pathname === '/'}
            collapsed={collapsed}
          />
          <NavItem
            to="/create"
            icon={<Plus className="w-5 h-5" />}
            label="Create New"
            isActive={location.pathname === '/create'}
            collapsed={collapsed}
          />
        </div>

        {/* Recent Section */}
        {recentPresentations.length > 0 && !collapsed && (
          <div className="mt-8">
            <h3 className="px-4 text-xs font-medium text-n46-gray-400 uppercase tracking-wide mb-2">
              Recent
            </h3>
            <div className="space-y-0.5">
              {recentPresentations.map((presentation) => (
                <RecentItem
                  key={presentation.id}
                  presentation={presentation}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Settings at Bottom */}
      <div className="px-3 py-4 border-t border-n46-gray-100">
        <NavItem
          to="/settings"
          icon={<Settings className="w-5 h-5" />}
          label="Settings"
          isActive={location.pathname === '/settings'}
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
}

// Mobile Bottom Navigation
export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Home' },
    { to: '/create', icon: Plus, label: 'Create' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-n46-gray-100 z-40 md:hidden safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-lg
                transition-colors duration-150
                ${isActive
                  ? 'text-n46-blue'
                  : 'text-n46-gray-500 hover:text-n46-gray-700'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// Mobile Header with menu toggle
interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-n46-gray-100 z-30 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Logo size="xs" />
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-n46-gray-50 text-n46-gray-600"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
