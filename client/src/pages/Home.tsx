import { Suspense, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

// Import FontAwesome CSS for icons
const loadFontAwesome = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  document.head.appendChild(link);
};

// Import Google Fonts
const loadGoogleFonts = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@300;400;500&family=Roboto+Mono&display=swap";
  document.head.appendChild(link);
};

// Custom styles for timeline
const loadCustomStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    .experience-timeline::before {
      content: '';
      position: absolute;
      width: 2px;
      background-color: hsl(47, 100%, 47%);
      top: 0;
      bottom: 0;
      left: 20px;
    }
    .timeline-dot {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: hsl(47, 100%, 47%);
      left: 13px;
      top: 20px;
    }
    @media (min-width: 768px) {
      .experience-timeline::before {
        left: 50%;
        margin-left: -1px;
      }
      .timeline-dot {
        left: 50%;
        margin-left: -8px;
      }
    }
    .skill-badge {
      transition: all 0.3s ease;
    }
    .skill-badge:hover {
      transform: translateY(-3px);
    }
  `;
  document.head.appendChild(style);
};

const Home = () => {
  // Load external resources on component mount
  useEffect(() => {
    loadFontAwesome();
    loadGoogleFonts();
    loadCustomStyles();

    // Set document title
    document.title = "Sewanou Landjeli - Portfolio";
  }, []);

  return (
    <div className="bg-white text-secondary">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
