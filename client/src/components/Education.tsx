import { Card } from "@/components/ui/card";
import { useLanguage } from "./LanguageContext";
import { translations } from "../data/translations";
import { resumeData } from "../data/resume";
import { motion } from "framer-motion";

const Education = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { education } = resumeData;

  return (
    <section id="education" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2 font-sans">{t.education.title}</h2>
          <div className="w-20 h-1 bg-primary mb-12"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                <div className="bg-primary text-secondary text-center py-3">
                  <h3 className="text-xl font-semibold font-sans">{language === "fr" ? edu.degree.fr : edu.degree.en}</h3>
                  <p>{edu.period}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <i className={`${edu.icon} text-primary mr-2`}></i>
                      <span className="font-medium">{edu.institution}</span>
                    </div>
                  </div>
                  <p className="mb-4">
                    {language === "fr" ? edu.description.fr : edu.description.en}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t.education.keySkills}: {language === "fr" ? edu.skills.fr.join(", ") : edu.skills.en.join(", ")}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
