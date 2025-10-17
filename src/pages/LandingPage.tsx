import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Organisms/Navbar";
import Hero from "../components/Organisms/Hero";
import Features from "../components/Organisms/Features";
import HowItWorks from "../components/Organisms/HowItWorks";
import Footer from "../components/Organisms/Footer";
import AuthModal from "../components/Organisms/AuthModal";
import styles from "./LandingPage.module.scss";
import { checkAuth } from "../services/api";

export default function LandingPage() {
   const navigate = useNavigate();
   const [authModalOpen, setAuthModalOpen] = useState(false);
   const [authMode, setAuthMode] = useState<"login" | "register">("login");
   const [checking, setChecking] = useState(true);

  useEffect(() => {
  checkAuth().then((data) => {
    if (data?.user) {
      navigate("/dashboard");
    } else {
      setChecking(false);
    }
  });
}, [navigate]);

   const handleAuthClick = (mode: "login" | "register") => {
      setAuthMode(mode);
      setAuthModalOpen(true);
   };

   const handleGetStarted = () => {
      setAuthMode("register");
      setAuthModalOpen(true);
   };

   // Prevent scroll when modal is open
   useEffect(() => {
      if (authModalOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }
      return () => {
         document.body.style.overflow = "unset";
      };
   }, [authModalOpen]);

   if (checking) {
      return <div className={styles.loader}>Loading...</div>;
   }

   return (
      <div className={styles.landingPage}>
         <Navbar onAuthClick={handleAuthClick} />
         <Hero onGetStarted={handleGetStarted} />
         <Features />
         <HowItWorks />
         <section id="about" className={styles.about}>
            <div className={styles.aboutContainer}>
               <h2>About NutriTrack</h2>
               <p>
                  We believe that tracking your nutrition shouldn't be complicated. That's why we
                  built NutriTrack - a simple, intuitive app that helps you understand what you're
                  eating and make better choices for your health.
               </p>
            </div>
         </section>
         <Footer />
         <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            initialMode={authMode}
         />
      </div>
   );
}
