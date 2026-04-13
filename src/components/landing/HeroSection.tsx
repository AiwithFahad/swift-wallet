import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-teal/20 blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-1.5 text-sm text-primary-foreground/80 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5" />
              Trusted by 2M+ users worldwide
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-navy-foreground sm:text-5xl lg:text-7xl"
          >
            Send Money Globally{' '}
            <span className="block bg-gradient-to-r from-teal to-success bg-clip-text text-transparent">
              in Seconds
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/60"
          >
            The modern payment platform that makes sending, receiving, and managing
            money effortless. Bank-level security meets beautiful simplicity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/register">
              <Button variant="teal" size="xl" className="gap-2">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="hero-outline" size="xl">
                View Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 sm:gap-12"
          >
            {[
              { icon: Zap, label: 'Instant Transfers', sub: 'Under 3 seconds' },
              { icon: Shield, label: 'Bank-Level Security', sub: '256-bit encryption' },
              { icon: Globe, label: '150+ Countries', sub: 'Send anywhere' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10">
                  <item.icon className="h-5 w-5 text-teal" />
                </div>
                <p className="text-sm font-semibold text-primary-foreground/90">{item.label}</p>
                <p className="text-xs text-primary-foreground/50">{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
