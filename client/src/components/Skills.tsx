import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "./LanguageContext";
import { translations } from "../data/translations";
import { resumeData } from "../data/resume";
import { motion } from "framer-motion";

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { technicalSkills, softwareSkills, softSkills, digitalSkills, languages, interests } = resumeData;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const skillBadge = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="competences" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2 font-sans">{t.skills.title}</h2>
          <div className="w-20 h-1 bg-primary mb-12"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Technical Skills */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center font-sans">
                  <i className="fas fa-code text-primary mr-3 text-2xl"></i>
                  {t.skills.technical}
                </h3>
                
                <motion.div variants={container} className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      variants={skillBadge}
                      className="skill-badge px-3 py-1 rounded-full bg-secondary text-white text-sm font-medium hover:transform hover:-translate-y-1 transition-transform"
                    >
                      {language === "fr" ? skill.fr : skill.en}
                    </motion.span>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Software Skills */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center font-sans">
                  <i className="fas fa-laptop text-primary mr-3 text-2xl"></i>
                  {t.skills.software}
                </h3>
                
                <motion.div variants={container} className="flex flex-wrap gap-2">
                  {softwareSkills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      variants={skillBadge} 
                      className="skill-badge px-3 py-1 rounded-full bg-secondary text-white text-sm font-medium hover:transform hover:-translate-y-1 transition-transform"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Soft Skills & Digital Skills */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center font-sans">
                  <i className="fas fa-user-tie text-primary mr-3 text-2xl"></i>
                  {t.skills.soft}
                </h3>
                
                <motion.div variants={container} className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      variants={skillBadge}
                      className="skill-badge px-3 py-1 rounded-full bg-primary text-secondary text-sm font-medium hover:transform hover:-translate-y-1 transition-transform"
                    >
                      {language === "fr" ? skill.fr : skill.en}
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Digital Marketing Skills */}
                <h4 className="text-lg font-semibold mt-6 mb-3 font-sans">{t.skills.digital}</h4>
                <motion.div variants={container} className="flex flex-wrap gap-2">
                  {digitalSkills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      variants={skillBadge}
                      className="skill-badge px-3 py-1 rounded-full bg-secondary text-white text-sm font-medium hover:transform hover:-translate-y-1 transition-transform"
                    >
                      {language === "fr" ? skill.fr : skill.en}
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Languages */}
                <h4 className="text-lg font-semibold mt-6 mb-3 font-sans">{t.skills.languages}</h4>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <motion.div key={index} variants={item}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{lang.name}</span>
                        <span>{language === "fr" ? lang.levelFr : lang.levelEn}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-primary h-2 rounded-full" 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Interests */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center font-sans">
                <i className="fas fa-heart text-primary mr-3 text-2xl"></i>
                {t.skills.interests}
              </h3>
              
              <div className="flex flex-wrap gap-6">
                {interests.map((interest, index) => (
                  <motion.div 
                    key={index}
                    variants={item}
                    className="flex flex-col items-center w-20"
                  >
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      <i className={`${interest.icon} text-primary text-xl`}></i>
                    </div>
                    <span className="text-center text-sm font-medium">
                      {language === "fr" ? interest.fr : interest.en}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
