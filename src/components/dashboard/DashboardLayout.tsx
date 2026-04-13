import { Link, useLocation } from '@tanstack/react-router';
import { Wallet, LayoutDashboard, Send, History, Settings, LogOut, Bell, CreditCard, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockUser, mockNotifications } from '@/lib/mock-data';
import { useState } from 'react';

const navItems = [
  { to: '/dashboard' as const, label: 'Home' },
  { to: '/transactions' as const, label: 'Activity' },
  { to: '/send' as const, label: 'Send & Request' },
  { to: '/wallet' as const, label: 'Wallet' },
  { to: '/settings' as const, label: 'Settings' },
];

export function DashboardNavbar() {
  const location = useLocation();
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      {/* Top identity bar */}
      <div className="border-b border-border bg-primary">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6">
          <span className="text-xs text-primary-foreground/70">{mockUser.name}</span>
          <div className="flex items-center gap-4">
            <button className="relative text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1.5 text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/20 text-[10px] font-bold text-primary-foreground">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                {mockUser.name}
                <ChevronDown className="h-3 w-3" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-card py-1 shadow-lg">
                  <Link to="/settings" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                    Profile Settings
                  </Link>
                  <Link to="/settings" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                    Account Settings
                  </Link>
                  <div className="my-1 border-t border-border" />
                  <Link to="/login" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                    Log out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Wallet className="h-4 w-4 text-primary-foreground" />
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'relative px-4 py-4 text-sm font-medium transition-colors',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <button
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div className="border-t border-border bg-card md:hidden">
            <nav className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="my-2 border-t border-border" />
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                Log out
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {children}
      </main>
    </div>
  );
}
