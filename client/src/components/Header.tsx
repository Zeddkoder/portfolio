import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";
import { translations } from "../data/translations";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      
      closeMobileMenu();
    }
  };

  return (
    <header className={`fixed w-full bg-white z-50 transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Name */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black tracking-wider font-sans">
              <span className="text-primary">SEWANOU</span> LANDJELI
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {Object.entries(t.navigation).map(([key, value]) => (
              <button 
                key={key}
                onClick={() => scrollToSection(key)}
                className="font-medium text-secondary hover:text-primary transition-colors"
              >
                {value}
              </button>
            ))}
          </nav>
          
          {/* Language Toggle and Resume Download */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex border rounded overflow-hidden">
              <button 
                onClick={language === "en" ? toggleLanguage : undefined}
                className={`px-3 py-1 font-medium ${language === "fr" ? "bg-primary text-secondary" : "bg-white text-secondary"}`}
              >
                FR
              </button>
              <button 
                onClick={language === "fr" ? toggleLanguage : undefined}
                className={`px-3 py-1 font-medium ${language === "en" ? "bg-primary text-secondary" : "bg-white text-secondary"}`}
              >
                EN
              </button>
            </div>
            <Button
              variant="default"
              className="bg-secondary text-white hover:bg-primary hover:text-secondary transition-colors"
              onClick={handleDownloadCV}
            >
              <i className="fas fa-download mr-2"></i> CV
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-secondary"
            >
              {isMobileMenuOpen ? (
                <i className="fas fa-times text-2xl"></i>
              ) : (
                <i className="fas fa-bars text-2xl"></i>
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-2"
          >
            <nav className="flex flex-col space-y-3">
              {Object.entries(t.navigation).map(([key, value]) => (
                <button 
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className="font-medium text-secondary hover:text-primary transition-colors text-left"
                >
                  {value}
                </button>
              ))}
            </nav>
            <div className="flex flex-col space-y-3 mt-4">
              <div className="flex border rounded overflow-hidden self-start">
                <button 
                  onClick={language === "en" ? toggleLanguage : undefined}
                  className={`px-3 py-1 font-medium ${language === "fr" ? "bg-primary text-secondary" : "bg-white text-secondary"}`}
                >
                  FR
                </button>
                <button 
                  onClick={language === "fr" ? toggleLanguage : undefined}
                  className={`px-3 py-1 font-medium ${language === "en" ? "bg-primary text-secondary" : "bg-white text-secondary"}`}
                >
                  EN
                </button>
              </div>
              <Button
                variant="default"
                className="bg-secondary text-white hover:bg-primary hover:text-secondary transition-colors w-auto self-start"
                onClick={handleDownloadCV}
              >
                <i className="fas fa-download mr-2"></i> CV
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
