import { createFileRoute } from '@tanstack/react-router';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CTASection, LandingFooter } from '@/components/landing/CTASection';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'NovaPay — Send Money Globally in Seconds' },
      { name: 'description', content: 'The modern payment platform for instant, secure global money transfers. Bank-level security meets beautiful simplicity.' },
      { property: 'og:title', content: 'NovaPay — Send Money Globally in Seconds' },
      { property: 'og:description', content: 'The modern payment platform for instant, secure global money transfers.' },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
