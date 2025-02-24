
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Conclusion from "@/components/Conclusion";
import PersonalAI from "@/components/PersonalAI";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <PersonalAI />
      <Conclusion />
    </main>
  );
};

export default Index;
