import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "./LanguageContext";
import { translations } from "../data/translations";
import { resumeData } from "../data/resume";
import { motion } from "framer-motion";

const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { projects } = resumeData;

  return (
    <section id="projets" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2 font-sans">{t.projects.title}</h2>
          <div className="w-20 h-1 bg-primary mb-12"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  {index === 0 ? (
                    <img 
                      src="/attached_assets/IMG_5852.jpeg" 
                      alt={language === "fr" ? project.title.fr : project.title.en}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <i className={`${project.icon} text-primary text-5xl`}></i>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 font-sans">
                    {language === "fr" ? project.title.fr : project.title.en}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {language === "fr" ? project.description.fr : project.description.en}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-secondary text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="inline-block mt-2 text-primary font-medium hover:underline">
                    {t.projects.viewDetails}
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
