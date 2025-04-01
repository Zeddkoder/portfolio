import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "./LanguageContext";
import { translations } from "../data/translations";
import { resumeData } from "../data/resume";
import { motion } from "framer-motion";

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { experiences } = resumeData;

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2 font-sans">{t.experience.title}</h2>
          <div className="w-20 h-1 bg-primary mb-12"></div>
        </motion.div>
        
        <div className="relative experience-timeline">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${isEven ? "md:ml-0 md:mr-auto md:w-1/2 md:pr-8 md:text-right" : "md:ml-auto md:mr-0 md:w-1/2 md:pl-8"} mb-12`}
              >
                <div className="timeline-dot"></div>
                <Card className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className={`flex flex-col ${isEven ? "md:items-end" : ""}`}>
                      <span className="inline-block px-3 py-1 bg-primary text-secondary rounded-full text-sm font-medium mb-3">
                        {exp.period}
                      </span>
                      <h3 className="text-xl font-semibold mb-1 font-sans">{language === "fr" ? exp.title.fr : exp.title.en}</h3>
                      <h4 className="text-lg font-medium text-secondary mb-4">{exp.company}</h4>
                    </div>
                    <ul className={`space-y-2 list-disc list-inside ${isEven ? "md:text-right md:list-none" : ""}`}>
                      {(language === "fr" ? exp.responsibilities.fr : exp.responsibilities.en).map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
