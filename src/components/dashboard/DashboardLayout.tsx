import { Link, useLocation } from '@tanstack/react-router';
import { Wallet, LayoutDashboard, Send, History, Settings, LogOut, Bell, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockUser, mockNotifications } from '@/lib/mock-data';

const navItems = [
  { to: '/dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/wallet' as const, icon: CreditCard, label: 'Wallet' },
  { to: '/send' as const, icon: Send, label: 'Send Money' },
  { to: '/transactions' as const, icon: History, label: 'Transactions' },
  { to: '/settings' as const, icon: Settings, label: 'Settings' },
];

export function DashboardSidebar() {
  const location = useLocation();
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
          <Wallet className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">NovaPay</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-xl px-4 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-teal text-sm font-bold text-teal-foreground">
            {mockUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-medium text-foreground">{mockUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">{mockUser.email}</p>
          </div>
        </div>
        <Link
          to="/login"
          className="mt-2 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Link>
      </div>
    </aside>
  );
}

export function DashboardTopbar() {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-md lg:pl-6">
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
          <Wallet className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">NovaPay</span>
      </div>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <button className="relative rounded-xl p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-teal text-sm font-bold text-teal-foreground lg:hidden">
          {mockUser.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
    </header>
  );
}

export function DashboardMobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-card/95 px-2 py-2 backdrop-blur-md lg:hidden">
      {navItems.slice(0, 5).map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              'flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label.split(' ')[0]}
          </Link>
        );
      })}
    </nav>
  );
}
