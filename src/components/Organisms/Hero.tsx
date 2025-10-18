import Button from "../Atoms/Button";
import styles from "./Hero.module.scss";
import heroImg from "../../assets/images/landingPage/hero.png";

type HeroProps = {
  onGetStarted: () => void;
};

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Track Your Nutrition with a{" "}
            <span className={styles.highlight}>Simple Snap</span>
          </h1>
          <p className={styles.subheadline}>
            Upload product images, monitor your macros, and keep your health goals
            on track. Your personal nutrition assistant in your pocket.
          </p>
          <div className={styles.cta}>
            <Button
              label="Get Started Free"
              appearance="typeA"
              onClick={onGetStarted}
            />
          </div>
          <p className={styles.subtext}>
            No credit card required • Free forever
          </p>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.mockup}>
            <div className={styles.phone}>
              <div className={styles.screen}>
                <div className={styles.screenContent}>
                  <img src={heroImg} alt="Hero image of the app in mobile view" />
                  {/* <div className={styles.stat}>
                    <span className={styles.label}>Calories</span>
                    <span className={styles.value}>1,847</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.label}>Protein</span>
                    <span className={styles.value}>92g</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.label}>Carbs</span>
                    <span className={styles.value}>215g</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}