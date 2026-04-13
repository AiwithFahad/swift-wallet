import { createFileRoute, Link } from '@tanstack/react-router';
import { DashboardShell } from '@/components/dashboard/DashboardLayout';
import { mockUser, mockContacts } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Send, ArrowRight, HelpCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const [tab, setTab] = useState<'send' | 'request' | 'contacts'>('send');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [step, setStep] = useState<'search' | 'details' | 'done'>('search');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleNext = () => {
    if (step === 'search' && recipient) setStep('details');
    else if (step === 'details' && amount) {
      setStep('done');
      setTimeout(() => {
        setStep('search');
        setRecipient('');
        setAmount('');
        setNote('');
        setSelectedContact(null);
      }, 3000);
    }
  };

  const handleContactClick = (name: string, email: string) => {
    setRecipient(email);
    setSelectedContact(name);
    setStep('details');
  };

  const tabs = [
    { key: 'send' as const, label: 'Send' },
    { key: 'request' as const, label: 'Request' },
    { key: 'contacts' as const, label: 'Contacts' },
  ];

  return (
    <DashboardShell>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main send area */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setStep('search'); setRecipient(''); setSelectedContact(null); }}
                className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                  tab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <motion.div
            key={tab + step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-xl border border-border bg-card p-8 shadow-sm"
          >
            {step === 'done' ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <Send className="h-8 w-8 text-success" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-foreground">
                  {tab === 'send' ? 'Money Sent!' : 'Request Sent!'}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  ${parseFloat(amount || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })} {tab === 'send' ? 'sent to' : 'requested from'} {selectedContact || recipient}
                </p>
              </div>
            ) : step === 'search' ? (
              <>
                <h2 className="text-2xl font-semibold text-foreground">
                  {tab === 'send' ? 'Send money' : tab === 'request' ? 'Request money' : 'Contacts'}
                </h2>
                <div className="mt-6">
                  <Input
                    placeholder="Name, email or mobile number"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="h-14 text-base"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="default" onClick={handleNext} disabled={!recipient}>
                    Next
                  </Button>
                  <button className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                    How it works <HelpCircle className="h-4 w-4" />
                  </button>
                </div>

                {/* Recent contacts */}
                <div className="mt-8">
                  <div className="flex gap-6">
                    {mockContacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => handleContactClick(contact.name, contact.email)}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${contact.color} text-sm font-bold text-primary-foreground transition-transform group-hover:scale-105`}>
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="max-w-[72px] truncate text-xs text-muted-foreground group-hover:text-foreground">
                          {contact.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                  <button className="mt-4 text-sm font-medium text-primary hover:underline">
                    Manage contacts
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-foreground">
                  {tab === 'send' ? 'Send to' : 'Request from'}: {selectedContact || recipient}
                </h2>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Amount (USD)</label>
                    <Input
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="mt-1.5 h-14 text-2xl font-bold"
                      autoFocus
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Available: ${mockUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Note (optional)</label>
                    <Input
                      placeholder="What's this for?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={handleNext} disabled={!amount || parseFloat(amount) <= 0} className="gap-2">
                      {tab === 'send' ? 'Send Money' : 'Request'} <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => { setStep('search'); setSelectedContact(null); }}>
                      Back
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Right sidebar - features */}
        <div className="space-y-4">
          {[
            { icon: '🏦', title: 'Send to a bank account', desc: 'Over 90 destination countries.' },
            { icon: '💵', title: 'Send cash for pick up', desc: 'Over 110 destination countries.' },
            { icon: '📄', title: 'Send an invoice', desc: 'Customize, track, and send invoices.' },
            { icon: '🎁', title: 'Send a digital gift card', desc: 'Choose from over 300 gift card brands.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-accent/30"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
