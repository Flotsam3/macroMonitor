import Logo from "../Atoms/Logo";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.tagline}>
              Your personal nutrition tracking companion
            </p>
          </div>

          <div className={styles.links}>
            <h4>Product</h4>
            <ul>
              <li>Features</li>
              <li>How It Works</li>
              <li>Pricing</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Legal</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2024 NutriTrack. All rights reserved.</p>
          <div className={styles.social}>
            <span>🐦</span>
            <span>📘</span>
            <span>📸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}