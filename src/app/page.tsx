import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AgentEcosystem from '@/components/AgentEcosystem';
import DataStorySection from '@/components/DataStorySection';
import CommandCenter from '@/components/CommandCenter';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import InfrastructureSection from '@/components/InfrastructureSection';
import EnterpriseSection from '@/components/EnterpriseSection';
import NewsEventsSection from '@/components/NewsEventsSection';
import CareersSection from '@/components/CareersSection';
import ContactFooter from '@/components/ContactFooter';
import LogiGuide from '@/components/LogiGuide';

function SectionDivider() {
  return (
    <div className="relative h-px max-w-5xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric/15 to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <AgentEcosystem />
      <SectionDivider />
      <DataStorySection />
      <SectionDivider />
      <CommandCenter />
      <SectionDivider />
      <CaseStudiesSection />
      <SectionDivider />
      <InfrastructureSection />
      <SectionDivider />
      <EnterpriseSection />
      <SectionDivider />
      <NewsEventsSection />
      <SectionDivider />
      <CareersSection />
      <ContactFooter />
      <LogiGuide />
    </main>
  );
}
