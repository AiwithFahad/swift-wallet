import { createFileRoute, Link } from '@tanstack/react-router';
import { DashboardSidebar, DashboardTopbar, DashboardMobileNav } from '@/components/dashboard/DashboardLayout';
import { mockUser } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Plus, ArrowDownToLine, CreditCard, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Route = createFileRoute('/wallet')({
  head: () => ({
    meta: [
      { title: 'Wallet — NovaPay' },
      { name: 'description', content: 'Manage your NovaPay wallet and funds.' },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
  const [copied, setCopied] = useState(false);
  const walletId = 'NP-' + mockUser.id.slice(4).toUpperCase();

  const handleCopy = () => {
    navigator.clipboard.writeText(walletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardTopbar />
        <main className="p-4 pb-24 sm:p-6 lg:pb-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold text-foreground">Wallet</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your balance and funds</p>
          </motion.div>

          {/* Main wallet card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="relative mt-6 overflow-hidden rounded-2xl gradient-hero p-8 text-primary-foreground shadow-xl">
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-teal/20 blur-[60px]" />
            <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <CreditCard className="h-4 w-4" />
              <span>Digital Wallet</span>
            </div>
            <p className="mt-4 text-5xl font-bold">
              ${mockUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-1 text-sm text-primary-foreground/40">{mockUser.currency}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-primary-foreground/50">Wallet ID: {walletId}</span>
              <button onClick={handleCopy} className="text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="teal" size="default" className="gap-1.5">
                <Plus className="h-4 w-4" /> Add Funds
              </Button>
              <Button variant="hero-outline" size="default" className="gap-1.5">
                <ArrowDownToLine className="h-4 w-4" /> Withdraw
              </Button>
            </div>
          </motion.div>

          {/* Quick stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Available', value: `$${mockUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, color: 'text-success' },
              { label: 'Pending', value: '$89.99', color: 'text-warning' },
              { label: 'Currency', value: mockUser.currency, color: 'text-foreground' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`mt-1 text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </main>
        <DashboardMobileNav />
      </div>
    </div>
  );
}
