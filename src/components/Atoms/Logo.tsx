import styles from "./Logo.module.scss";

type LogoProps = {
  size?: "small" | "medium" | "large";
};

export default function Logo({ size = "medium" }: LogoProps) {
  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      <span className={styles.icon}>🥗</span>
      <span className={styles.text}>NutriTrack</span>
    </div>
  );
}