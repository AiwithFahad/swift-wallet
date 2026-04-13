import { motion } from 'framer-motion';
import { Send, CreditCard, BarChart3, Shield, Smartphone, Globe } from 'lucide-react';

const features = [
  {
    icon: Send,
    title: 'Instant Transfers',
    description: 'Send money to anyone, anywhere in the world in under 3 seconds with zero hidden fees.',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your money is protected with 256-bit encryption, 2FA authentication, and real-time fraud detection.',
  },
  {
    icon: CreditCard,
    title: 'Smart Wallet',
    description: 'Store, manage, and grow your money with our intelligent digital wallet system.',
  },
  {
    icon: BarChart3,
    title: 'Financial Analytics',
    description: 'Get deep insights into your spending habits with beautiful charts and smart categorization.',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Designed for mobile with a responsive experience that works beautifully on every device.',
  },
  {
    icon: Globe,
    title: 'Multi-Currency',
    description: 'Support for 30+ currencies with real-time exchange rates and transparent conversions.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">Features</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to manage money
          </h2>
          <p className="mt-4 text-muted-foreground">
            From instant transfers to detailed analytics, NovaPay gives you complete control over your finances.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
