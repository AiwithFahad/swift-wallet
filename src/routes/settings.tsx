import { createFileRoute } from '@tanstack/react-router';
import { DashboardSidebar, DashboardTopbar, DashboardMobileNav } from '@/components/dashboard/DashboardLayout';
import { mockUser } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Lock, Eye, EyeOff } from 'lucide-react';
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

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardTopbar />
        <main className="p-4 pb-24 sm:p-6 lg:pb-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your account and security preferences</p>
          </motion.div>

          <div className="mx-auto mt-8 max-w-2xl space-y-6">
            {/* Profile */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Profile</h2>
              </div>
              <div className="mt-5 space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Button size="sm">Save Changes</Button>
              </div>
            </motion.div>

            {/* Security */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-teal">
                  <Shield className="h-5 w-5 text-teal-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Security</h2>
              </div>
              <div className="mt-5 space-y-5">
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
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                  <Bell className="h-5 w-5 text-warning" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive email updates for transactions</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        <DashboardMobileNav />
      </div>
    </div>
  );
}
