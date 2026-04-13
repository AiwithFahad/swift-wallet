import { createFileRoute, Link } from '@tanstack/react-router';
import { DashboardShell } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { mockUser, mockTransactions, mockChartData, mockContacts } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Send, DollarSign, FileText, Link2, ShoppingCart, MoreHorizontal, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { title: 'Dashboard — NovaPay' },
      { name: 'description', content: 'Your NovaPay dashboard. View balance, transactions, and analytics.' },
    ],
  }),
  component: DashboardPage,
});

const quickLinks = [
  { icon: Send, label: 'Send money', to: '/send' as const },
  { icon: DollarSign, label: 'Request money', to: '/send' as const },
  { icon: FileText, label: 'Invoicing', to: '/transactions' as const },
  { icon: Link2, label: 'NovaPay.Me', to: '/settings' as const },
  { icon: ShoppingCart, label: 'Checkout', to: '/wallet' as const },
];

function DashboardPage() {
  const [sendTo, setSendTo] = useState('');
  const recentTxns = mockTransactions.slice(0, 5);
  const totalIncome = mockChartData.reduce((s, d) => s + d.income, 0);
  const totalSpending = mockChartData.reduce((s, d) => s + d.spending, 0);

  return (
    <DashboardShell>
      {/* Top section: Balance + Quick Links */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Balance</h2>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-4 text-4xl font-bold text-foreground">
            ${mockUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            <span className="ml-2 text-base font-normal text-muted-foreground">USD</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Available</p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">USD</span>
              <span className="text-foreground">US${mockUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <Link to="/wallet">
            <Button variant="default" size="sm" className="mt-5">
              Transfer Money
            </Button>
          </Link>
        </motion.div>

        {/* Quick Links + Send Money */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-3"
        >
          <h2 className="text-lg font-semibold text-foreground">Quick links</h2>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.to} className="group flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors hover:bg-accent">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-primary/30">
                  <link.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <h3 className="text-base font-semibold text-foreground">Send Money</h3>
            <div className="mt-3">
              <Input
                placeholder="Add a mobile number, email, or name"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <Link to="/send">
              <Button variant="outline" size="sm" className="mt-3" disabled={!sendTo}>
                Next
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Insights row */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Money in</p>
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
          <p className="mt-2 text-2xl font-bold text-foreground">${totalIncome.toLocaleString()}</p>
          <p className="mt-1 text-xs text-teal">Total received</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Money out</p>
            <TrendingDown className="h-4 w-4 text-warning" />
          </div>
          <p className="mt-2 text-2xl font-bold text-foreground">${totalSpending.toLocaleString()}</p>
          <p className="mt-1 text-xs text-muted-foreground">Total spent</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Pending</p>
          <p className="mt-2 text-2xl font-bold text-warning">$89.99</p>
          <p className="mt-1 text-xs text-muted-foreground">1 transaction</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Contacts</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{mockContacts.length}</p>
          <p className="mt-1 text-xs text-teal">Manage contacts</p>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 rounded-xl border border-border bg-card shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">Recent activity</h2>
          <Link to="/transactions" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            More <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4 border-b border-border px-6">
          {['All', 'Payments received', 'Payments sent'].map((tab, i) => (
            <button
              key={tab}
              className={`border-b-2 py-3 text-sm font-medium transition-colors ${
                i === 0 ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="divide-y divide-border">
          {recentTxns.map((txn) => (
            <div key={txn.id} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-accent/30">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                txn.type === 'received' ? 'bg-success/10' : 'bg-muted'
              }`}>
                {txn.type === 'received' ? (
                  <ArrowDownLeft className="h-5 w-5 text-success" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{txn.name}</p>
                  {txn.status === 'pending' && (
                    <span className="rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning">Pending</span>
                  )}
                  {txn.status === 'failed' && (
                    <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">Failed</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {txn.note && <> · {txn.note}</>}
                </p>
              </div>
              <p className={`text-sm font-semibold ${txn.type === 'received' ? 'text-success' : 'text-foreground'}`}>
                {txn.type === 'received' ? '+' : '-'}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardShell>
  );
}
