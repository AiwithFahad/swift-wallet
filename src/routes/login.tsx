import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/login')({
  head: () => ({
    meta: [
      { title: 'Log In — NovaPay' },
      { name: 'description', content: 'Sign in to your NovaPay account.' },
    ],
  }),
  component: LoginPage,
});

const DEMO_CREDENTIALS = [
  { email: 'alex@novapay.com', password: 'Demo@1234', name: 'Alex Johnson' },
  { email: 'sarah@novapay.com', password: 'Test@5678', name: 'Sarah Miller' },
];

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = Route.useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const match = DEMO_CREDENTIALS.find(
        (c) => c.email === email && c.password === password
      );
      if (match) {
        localStorage.setItem('novapay_user', JSON.stringify({ name: match.name, email: match.email }));
        navigate({ to: '/dashboard' });
      } else {
        setError('Invalid email or password. Please use the demo credentials below.');
      }
      setLoading(false);
    }, 800);
  };

  const fillCredentials = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 gradient-hero lg:flex lg:flex-col lg:items-center lg:justify-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md px-12">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl gradient-teal">
            <Wallet className="h-7 w-7 text-teal-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground">Welcome back to NovaPay</h2>
          <p className="mt-4 text-primary-foreground/60">Manage your money, track your transactions, and send payments — all in one place.</p>
        </motion.div>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">NovaPay</span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground">Log in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your credentials to access your account</p>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-teal hover:underline">Forgot password?</button>
              </div>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Signing in…' : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Demo Credentials</p>
            <div className="space-y-2">
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => fillCredentials(cred)}
                  className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
                >
                  <div>
                    <p className="font-medium text-foreground">{cred.name}</p>
                    <p className="text-xs text-muted-foreground">{cred.email} / {cred.password}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">Sign up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
