import styles from "./Logo.module.scss";
import logo from "../../assets/images/landingPage/logo-v3.png";

type LogoProps = {
  size?: "small" | "medium" | "large";
};

export default function Logo({ size = "medium" }: LogoProps) {
  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      <img src={logo} alt="app logo" />
      <span className={styles.text}>MacroMonitor</span>
    </div>
  );
}