import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "./LanguageContext";
import { translations } from "../data/translations";
import { motion } from "framer-motion";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: t.contact.errorTitle,
        description: t.contact.errorMessage,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: t.contact.successTitle,
        description: t.contact.successMessage,
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      toast({
        title: t.contact.errorTitle,
        description: t.contact.serverError,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDownloadCV = async () => {
    try {
      const response = await apiRequest("GET", "/api/download-cv", undefined);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Sewanou_Landjeli_CV.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading CV:", error);
    }
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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-6 font-sans">{t.contact.sendMessage}</h3>
            
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">{t.contact.name}</label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder={t.contact.namePlaceholder}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block mb-2 font-medium">{t.contact.subject}</label>
                    <Input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder={t.contact.subjectPlaceholder}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block mb-2 font-medium">{t.contact.message}</label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5} 
                      className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all transform hover:-translate-y-1 w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><i className="fas fa-spinner fa-spin mr-2"></i> {t.contact.sending}</>
                    ) : (
                      t.contact.send
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
