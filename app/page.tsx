import HeroSection from "./sections/HeroSection"
import AboutSection from "./sections/AboutSection"
import ProjectsSection from "./sections/ProjectsSection"
import TechSection from "./sections/TechSection"
import ContactSection from "./sections/ContactSection"

export default function Home() {
  return (
    <main className="scroll-smooth">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechSection />
      <ContactSection />
    </main>
  )
}
