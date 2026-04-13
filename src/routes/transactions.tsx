import { createFileRoute } from '@tanstack/react-router';
import { DashboardShell } from '@/components/dashboard/DashboardLayout';
import { mockTransactions } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Route = createFileRoute('/transactions')({
  head: () => ({
    meta: [
      { title: 'Activity — NovaPay' },
      { name: 'description', content: 'View your complete transaction history on NovaPay.' },
    ],
  }),
  component: TransactionsPage,
});

function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');

  const filtered = mockTransactions.filter((txn) => {
    const matchesSearch = txn.name.toLowerCase().includes(search.toLowerCase()) || txn.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || txn.type === filter;
    return matchesSearch && matchesFilter;
  });

  const filterTabs = [
    { key: 'all' as const, label: 'All transactions' },
    { key: 'received' as const, label: 'Payments received' },
    { key: 'sent' as const, label: 'Payments sent' },
  ];

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Activity</h1>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" /> Download
        </Button>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card shadow-sm">
        {/* Filter tabs */}
        <div className="flex items-center justify-between border-b border-border px-6">
          <div className="flex gap-6">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`border-b-2 py-3 text-sm font-medium transition-colors ${
                  filter === tab.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="h-9 w-56 pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile search */}
        <div className="border-b border-border px-6 py-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Transaction list */}
        <div className="divide-y divide-border">
          {filtered.map((txn, i) => (
            <motion.div
              key={txn.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-accent/30"
            >
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
                <p className="truncate text-xs text-muted-foreground">{txn.note || txn.email}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${txn.type === 'received' ? 'text-success' : 'text-foreground'}`}>
                  {txn.type === 'received' ? '+' : '-'}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="px-6 py-16 text-center text-sm text-muted-foreground">No transactions found</div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
