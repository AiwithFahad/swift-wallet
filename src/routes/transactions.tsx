import { createFileRoute } from '@tanstack/react-router';
import { DashboardSidebar, DashboardTopbar, DashboardMobileNav } from '@/components/dashboard/DashboardLayout';
import { mockTransactions } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const Route = createFileRoute('/transactions')({
  head: () => ({
    meta: [
      { title: 'Transactions — NovaPay' },
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

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardTopbar />
        <main className="p-4 pb-24 sm:p-6 lg:pb-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
            <p className="mt-1 text-sm text-muted-foreground">Your complete transaction history</p>
          </motion.div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {(['all', 'sent', 'received'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-6 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
            <div className="divide-y divide-border">
              {filtered.map((txn, i) => (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-accent/50"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    txn.type === 'received' ? 'bg-success/10' : 'bg-primary/10'
                  }`}>
                    {txn.type === 'received' ? (
                      <ArrowDownLeft className="h-5 w-5 text-success" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{txn.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{txn.note || txn.email}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${txn.type === 'received' ? 'text-success' : 'text-foreground'}`}>
                      {txn.type === 'received' ? '+' : '-'}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                        txn.status === 'success' ? 'bg-success' : txn.status === 'pending' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                      <span className="text-xs text-muted-foreground">
                        {new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <div className="px-6 py-12 text-center text-sm text-muted-foreground">No transactions found</div>
              )}
            </div>
          </motion.div>
        </main>
        <DashboardMobileNav />
      </div>
    </div>
  );
}
