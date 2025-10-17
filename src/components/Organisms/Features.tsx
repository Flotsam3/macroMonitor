import SectionTitle from "../Atoms/SectionTitle";
import FeatureCard from "../Molecules/FeatureCard";
import styles from "./Features.module.scss";

export default function Features() {
  const features = [
    {
      icon: "📸",
      title: "Image Upload",
      description: "Simply snap a photo of any product and let our app do the rest. Quick and effortless tracking.",
    },
    {
      icon: "📊",
      title: "Macro Tracking",
      description: "Monitor your proteins, carbs, and fats with precision. Stay on top of your nutritional goals.",
    },
    {
      icon: "🧂",
      title: "Essential Nutrients",
      description: "Track salt, sugar, saturated fats, and other vital nutrients to maintain a balanced diet.",
    },
    {
      icon: "📅",
      title: "Daily Archive",
      description: "Review your nutrition history anytime. See patterns and make informed decisions about your diet.",
    },
  ];

  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <SectionTitle
          title="Everything You Need to Track Your Nutrition"
          subtitle="Powerful features designed to make nutrition tracking simple and effective"
        />
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}