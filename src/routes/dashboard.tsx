import { createFileRoute, Link } from '@tanstack/react-router';
import { DashboardSidebar, DashboardTopbar, DashboardMobileNav } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { mockUser, mockTransactions, mockChartData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Plus, Send, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { title: 'Dashboard — NovaPay' },
      { name: 'description', content: 'Your NovaPay dashboard. View balance, transactions, and analytics.' },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const recentTxns = mockTransactions.slice(0, 5);
  const totalIncome = mockChartData.reduce((s, d) => s + d.income, 0);
  const totalSpending = mockChartData.reduce((s, d) => s + d.spending, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardTopbar />
        <main className="p-4 pb-24 sm:p-6 lg:pb-6">
          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {mockUser.name.split(' ')[0]} 👋</h1>
            <p className="mt-1 text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your money today.</p>
          </motion.div>

          {/* Balance + Quick Actions */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl gradient-hero p-6 text-primary-foreground shadow-xl md:col-span-2"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-teal/20 blur-[60px]" />
              <p className="text-sm font-medium text-primary-foreground/60">Total Balance</p>
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="mt-2 text-4xl font-bold"
              >
                ${mockUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </motion.p>
              <p className="mt-1 text-xs text-primary-foreground/40">{mockUser.currency} • Updated just now</p>

              <div className="mt-6 flex gap-3">
                <Link to="/send">
                  <Button variant="teal" size="sm" className="gap-1.5">
                    <Send className="h-3.5 w-3.5" /> Send
                  </Button>
                </Link>
                <Button variant="hero-outline" size="sm" className="gap-1.5">
                  <Plus className="h-3.5 w-3.5" /> Add Funds
                </Button>
                <Button variant="hero-outline" size="sm" className="gap-1.5">
                  <Wallet className="h-3.5 w-3.5" /> Withdraw
                </Button>
              </div>
            </motion.div>

            {/* Stats cards */}
            <div className="grid gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Income (7mo)</p>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">${totalIncome.toLocaleString()}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Spending (7mo)</p>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                    <TrendingDown className="h-4 w-4 text-warning" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">${totalSpending.toLocaleString()}</p>
              </motion.div>
            </div>
          </div>

          {/* Chart + Transactions */}
          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            {/* Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-3">
              <h3 className="text-sm font-semibold text-foreground">Income vs Spending</h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData}>
                    <defs>
                      <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.55 0.18 155)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="oklch(0.55 0.18 155)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.55 0.18 250)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="oklch(0.55 0.18 250)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 255)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.55 0.03 260)" />
                    <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.55 0.03 260)" />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: '1px solid oklch(0.92 0.01 255)', fontSize: 13 }}
                      formatter={(value: number) => ['$' + value.toLocaleString()]}
                    />
                    <Area type="monotone" dataKey="income" stroke="oklch(0.55 0.18 155)" fill="url(#incomeGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="spending" stroke="oklch(0.55 0.18 250)" fill="url(#spendGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
                <Link to="/transactions" className="text-xs font-medium text-teal hover:underline">View all</Link>
              </div>
              <div className="mt-4 space-y-3">
                {recentTxns.map((txn) => (
                  <div key={txn.id} className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${txn.type === 'received' ? 'bg-success/10' : 'bg-primary/10'}`}>
                      {txn.type === 'received' ? (
                        <ArrowDownLeft className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="truncate text-sm font-medium text-foreground">{txn.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                    <p className={`text-sm font-semibold ${txn.type === 'received' ? 'text-success' : 'text-foreground'}`}>
                      {txn.type === 'received' ? '+' : '-'}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
        <DashboardMobileNav />
      </div>
    </div>
  );
}
