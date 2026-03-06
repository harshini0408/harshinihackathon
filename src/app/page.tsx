import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PlatformSection from '@/components/PlatformSection';
import AITechnologySection from '@/components/AITechnologySection';
import SolutionsSection from '@/components/SolutionsSection';
import DashboardSection from '@/components/DashboardSection';
import CustomersSection from '@/components/CustomersSection';
import MaturityAssessment from '@/components/MaturityAssessment';
import FreightBenchmark from '@/components/FreightBenchmark';
import DelayPrediction from '@/components/DelayPrediction';
import InsightsSection from '@/components/InsightsSection';
import CareersSection from '@/components/CareersSection';
import ContactFooter from '@/components/ContactFooter';
import AIAssistant from '@/components/AIAssistant';
import StickyCta from '@/components/StickyCta';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <PlatformSection />
      <AITechnologySection />
      <SolutionsSection />
      <DashboardSection />
      <CustomersSection />
      <MaturityAssessment />
      <FreightBenchmark />
      <DelayPrediction />
      <InsightsSection />
      <CareersSection />
      <ContactFooter />
      <AIAssistant />
      <StickyCta />
    </main>
  );
}
