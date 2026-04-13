import { createFileRoute } from '@tanstack/react-router';
import { DashboardShell } from '@/components/dashboard/DashboardLayout';
import { mockUser } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Plus, ArrowDownToLine, CreditCard, Copy, Check, Building2, Smartphone } from 'lucide-react';
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
    <DashboardShell>
      <h1 className="text-2xl font-semibold text-foreground">Wallet</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Balance card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            <span>NovaPay Balance</span>
          </div>
          <p className="mt-4 text-4xl font-bold text-foreground">
            ${mockUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            <span className="ml-2 text-base font-normal text-muted-foreground">USD*</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Available</p>

          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">USD</span>
              <span className="text-foreground font-medium">US${mockUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Wallet ID: {walletId}</span>
            <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">*This is an estimate based on the most recent conversion rate.</p>

          <button className="mt-3 text-sm font-medium text-primary hover:underline">
            Set up auto transfers
          </button>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Actions</h2>
            <div className="mt-4 space-y-3">
              <Button variant="default" className="w-full justify-start gap-3">
                <Plus className="h-4 w-4" /> Add Money
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <ArrowDownToLine className="h-4 w-4" /> Withdraw to Bank
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Linked Accounts</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Chase ••••4521</p>
                  <p className="text-xs text-muted-foreground">Checking account</p>
                </div>
              </div>
              <button className="text-sm font-medium text-primary hover:underline">
                + Link a bank or card
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Insights</h2>
          <span className="text-sm text-muted-foreground">Last 7 days</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Money in</p>
            <p className="mt-2 text-2xl font-bold text-foreground">$2,950.00</p>
            <button className="mt-2 text-sm font-medium text-primary hover:underline">Total received</button>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Money out</p>
            <p className="mt-2 text-2xl font-bold text-foreground">$305.48</p>
            <button className="mt-2 text-sm font-medium text-primary hover:underline">Total sent</button>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
