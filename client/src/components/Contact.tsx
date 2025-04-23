import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";
import { translations } from "../data/translations";
import { motion } from "framer-motion";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const handleDownloadCV = () => {
    const a = document.createElement("a");
    a.href = "/assets/";
    a.download = "Sewanou_Landjeli_CV.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2 font-sans">{t.contact.title}</h2>
          <div className="w-20 h-1 bg-primary mb-12"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 mx-auto max-w-2xl"
          >
            <h3 className="text-xl font-semibold mb-6 font-sans">{t.contact.myDetails}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-envelope text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:sewanou.landjeli@gmail.com" className="text-black hover:text-primary transition-colors">
                    sewanou.landjeli@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-phone text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.contact.phone}</h4>
                  <a href="tel:0753808157" className="text-black hover:text-primary transition-colors">
                    07 53 80 81 57
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fab fa-linkedin text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/sèwanou-landjeli-b2901817a" className="text-black hover:text-primary transition-colors">
                    linkedin.com/in/sèwanou-landjeli-b2901817a
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fab fa-github text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">GitHub</h4>
                  <a href="https://github.com/Zeddkoder" className="text-black hover:text-primary transition-colors">
                    github.com/Zeddkoder
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-file-download text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.contact.downloadResume}</h4>
                  <Button 
                    variant="default"
                    className="bg-secondary text-white hover:bg-primary hover:text-secondary transition-colors mt-2"
                    onClick={handleDownloadCV}
                  >
                    <i className="fas fa-download mr-2"></i> {t.contact.pdfFormat}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 font-sans">{t.contact.availability}</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="mb-4"><i className="far fa-calendar-alt text-primary mr-2"></i> {t.contact.availableFrom} <span className="font-bold">{t.contact.availableDate}</span></p>
                  <p className="mb-4"><i className="fas fa-clock text-primary mr-2"></i> {t.contact.desiredDuration}: <span className="font-bold">{t.contact.durationValue}</span></p>
                  <p><i className="fas fa-map-marker-alt text-primary mr-2"></i> {t.contact.mobility}: <span className="font-bold">{t.contact.mobilityValue}</span></p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
