
import { motion } from "framer-motion";
import PersonalInfo from "./hero/PersonalInfo";
import SocialLinks from "./hero/SocialLinks";
import ActionButtons from "./hero/ActionButtons";
import BackgroundEffects from "./hero/BackgroundEffects";

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center section-padding text-center relative overflow-hidden pt-16 sm:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6 md:px-0"
      >
        <PersonalInfo />
        <SocialLinks />
        <ActionButtons scrollToProjects={scrollToProjects} />
      </motion.div>

      <BackgroundEffects />
    </section>
  );
}
