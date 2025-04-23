import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";
import { translations } from "../data/translations";
import { motion } from "framer-motion";
import profileImage from "../assets/pro.jpeg;
const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Profile Image */}
          <motion.div 
            className="lg:w-2/5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-primary shadow-xl">
              <img 
                src={profileImage} 
                alt="Sewanou Landjeli" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          {/* Profile Info */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-sans">
              <span className="text-primary">{t.hero.greeting}</span> {t.hero.iam} <br />
              Sewanou Landjeli
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-secondary opacity-90">{t.hero.title}</h2>
            <p className="text-lg mb-8 max-w-2xl leading-relaxed">
              {t.hero.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all transform hover:-translate-y-1"
              >
                {t.hero.contactButton}
              </Button>
              <Button 
                onClick={() => scrollToSection("projets")}
                className="bg-secondary text-black px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all transform hover:-translate-y-1"
              >
                {t.hero.projectsButton}
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center">
                <i className="fas fa-envelope text-primary mr-2"></i>
                <a href="mailto:sewanou.landjeli@gmail.com" className="hover:text-primary transition-colors">
                  sewanou.landjeli@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-primary mr-2"></i>
                <a href="tel:0753808157" className="hover:text-primary transition-colors">
                  07 53 80 81 57
                </a>
              </div>
              <div className="flex items-center">
                <i className="fab fa-linkedin text-primary mr-2"></i>
                <a href="https://www.linkedin.com/in/sèwanou-landjeli-b2901817a" className="hover:text-primary transition-colors">
                  Sewanou Landjeli
                </a>
              </div>
              <div className="flex items-center">
                <i className="fab fa-github text-primary mr-2"></i>
                <a href="https://github.com/Zeddkoder" className="hover:text-primary transition-colors">
                  Zeddkoder
                </a>
              </div>
            </div>
            
            {/* Availability */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg inline-block">
              <p className="font-medium">
                <i className="far fa-calendar-alt text-primary mr-2"></i>
                {t.hero.availability}: <span className="font-bold">{t.hero.availabilityDate}</span> • 
                {t.hero.duration}: <span className="font-bold">{t.hero.durationValue}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
