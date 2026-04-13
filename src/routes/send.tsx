import { createFileRoute } from '@tanstack/react-router';
import { DashboardSidebar, DashboardTopbar, DashboardMobileNav } from '@/components/dashboard/DashboardLayout';
import { mockUser } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export const Route = createFileRoute('/send')({
  head: () => ({
    meta: [
      { title: 'Send Money — NovaPay' },
      { name: 'description', content: 'Send money instantly to anyone with NovaPay.' },
    ],
  }),
  component: SendPage,
});

function SendPage() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardTopbar />
        <main className="p-4 pb-24 sm:p-6 lg:pb-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold text-foreground">Send Money</h1>
            <p className="mt-1 text-sm text-muted-foreground">Transfer funds instantly to anyone</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mx-auto mt-8 max-w-lg">
            {sent ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-12 shadow-card text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <Send className="h-8 w-8 text-success" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-foreground">Money Sent!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} sent to {recipient}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                    <Send className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Available Balance</p>
                    <p className="text-xs text-muted-foreground">${mockUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient (email or username)</Label>
                    <Input id="recipient" placeholder="jane@example.com" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <Input id="amount" type="number" min="0.01" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="note">Note (optional)</Label>
                    <Input id="note" placeholder="Lunch money" value={note} onChange={(e) => setNote(e.target.value)} />
                  </div>
                </div>

                <Button type="submit" className="mt-6 w-full gap-2" size="lg" disabled={!recipient || !amount}>
                  Send Money <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </motion.div>
        </main>
        <DashboardMobileNav />
      </div>
    </div>
  );
}
