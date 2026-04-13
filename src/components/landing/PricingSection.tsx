import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const plans = [
  {
    name: 'Personal',
    price: 'Free',
    description: 'For individuals getting started',
    features: ['Send up to $5,000/mo', 'Basic analytics', 'Email support', '1 currency'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/mo',
    description: 'For professionals and freelancers',
    features: ['Unlimited transfers', 'Advanced analytics', 'Priority support', '10 currencies', 'API access', 'Custom reports'],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and organizations',
    features: ['Everything in Pro', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'Compliance tools', 'Bulk transfers'],
    cta: 'Contact Sales',
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">Pricing</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground">No hidden fees. No surprises. Choose the plan that works for you.</p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                plan.featured
                  ? 'border-primary bg-card shadow-xl scale-105'
                  : 'border-border bg-card shadow-card'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="mt-8 block">
                <Button
                  variant={plan.featured ? 'default' : 'outline'}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
