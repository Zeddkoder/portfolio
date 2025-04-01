import { useLanguage } from "./LanguageContext";
import { translations } from "../data/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold font-sans">
              <span className="text-primary">SEWANOU</span> LANDJELI
            </h2>
            <p className="text-gray-400 mt-2">{t.footer.jobTitle}</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://www.linkedin.com/in/sèwanou-landjeli-b2901817a" 
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a 
              href="https://github.com/Zeddkoder" 
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a 
              href="mailto:sewanou.landjeli@gmail.com" 
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Sewanou Landjeli. {t.footer.rights}</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">{t.footer.legal}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
