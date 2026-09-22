import Hero from '../components/Hero';
import ServicesCards from '../components/ServicesCards';
import AboutSection from '../components/AboutSection';
import PlanningAccordion from '../components/PlanningAccordion';
import ProjectsSection from '../components/ProjectsSection';

export const metadata = {
  title: 'MTS OFFSHORE Group - Specialists in Offshore Construction & Project Management',
  description:
    'MTS OFFSHORE Group excels in offshore construction and project management, delivering innovative solutions, exceptional safety standards, and unparalleled expertise for complex maritime projects globally.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesCards />
      <AboutSection />
      <PlanningAccordion />
      <ProjectsSection />
    </>
  );
}
