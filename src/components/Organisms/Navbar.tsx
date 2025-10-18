import { useState } from "react";
import Logo from "../Atoms/Logo";
import Button from "../Atoms/Button";
import styles from "./Navbar.module.scss";

type NavbarProps = {
  onAuthClick: (mode: "login" | "register") => void;
};

export default function Navbar({ onAuthClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Logo />

        <ul className={styles.navLinks}>
          <li onClick={() => scrollToSection("features")}>Features</li>
          <li onClick={() => scrollToSection("how-it-works")}>How It Works</li>
          <li onClick={() => scrollToSection("about")}>About</li>
        </ul>

        <div className={styles.authButtons}>
          <Button
            label="Login"
            appearance="typeB"
            onClick={() => onAuthClick("login")}
          />
          <Button
            label="Sign Up"
            appearance="typeA"
            onClick={() => onAuthClick("register")}
          />
        </div>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul>
            <li onClick={() => scrollToSection("features")}>Features</li>
            <li onClick={() => scrollToSection("how-it-works")}>How It Works</li>
            <li onClick={() => scrollToSection("about")}>About</li>
            <li onClick={() => {
                onAuthClick("login");
                setMobileMenuOpen(false);
              }}>Login</li>
            <li onClick={() => {
                onAuthClick("register");
                setMobileMenuOpen(false);
              }}>Sign Up</li>
          </ul>
        </div>
      )}
    </nav>
  );
}