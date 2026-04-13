import { createFileRoute } from '@tanstack/react-router';
import { DashboardShell } from '@/components/dashboard/DashboardLayout';
import { mockUser } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export const Route = createFileRoute('/settings')({
  head: () => ({
    meta: [
      { title: 'Settings — NovaPay' },
      { name: 'description', content: 'Manage your NovaPay account settings and security.' },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [twoFa, setTwoFa] = useState(mockUser.twoFactorEnabled);
  const [notifications, setNotifications] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  const tabs = [
    { key: 'profile' as const, label: 'Profile', icon: User },
    { key: 'security' as const, label: 'Security', icon: Shield },
    { key: 'notifications' as const, label: 'Notifications', icon: Bell },
  ];

  return (
    <DashboardShell>
      <h1 className="text-2xl font-semibold text-foreground">Account Settings</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        {/* Sidebar tabs */}
        <div className="rounded-xl border border-border bg-card p-2 shadow-sm lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  tab === t.key ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-3"
        >
          {tab === 'profile' && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
              <p className="mt-1 text-sm text-muted-foreground">Update your personal details</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {mockUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{mockUser.name}</p>
                    <p className="text-sm text-muted-foreground">Member since {new Date(mockUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <Button size="sm">Save Changes</Button>
              </div>
            </>
          )}

          {tab === 'security' && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Security</h2>
              <p className="mt-1 text-sm text-muted-foreground">Manage your password and 2FA</p>
              <div className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Min. 8 characters" />
                  </div>
                </div>
                <Button size="sm" variant="outline">Update Password</Button>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch checked={twoFa} onCheckedChange={setTwoFa} />
                </div>
              </div>
            </>
          )}

          {tab === 'notifications' && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <p className="mt-1 text-sm text-muted-foreground">Configure how you receive updates</p>
              <div className="mt-6 space-y-5">
                {[
                  { label: 'Email Notifications', desc: 'Receive email updates for transactions', checked: notifications, onChange: setNotifications },
                  { label: 'Payment Alerts', desc: 'Get notified when you send or receive money', checked: true, onChange: () => {} },
                  { label: 'Security Alerts', desc: 'Notify on new login or suspicious activity', checked: true, onChange: () => {} },
                  { label: 'Marketing', desc: 'Receive tips and product updates', checked: false, onChange: () => {} },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch checked={item.checked} onCheckedChange={item.onChange} />
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </DashboardShell>
  );
}
