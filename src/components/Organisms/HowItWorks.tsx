import SectionTitle from "../Atoms/SectionTitle";
import StepCard from "../Molecules/StepCard";
import styles from "./HowItWorks.module.scss";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Upload",
      description: "Take a photo of your food product or meal",
    },
    {
      number: 2,
      title: "Track",
      description: "Automatically log macros and essential nutrients",
    },
    {
      number: 3,
      title: "Analyze",
      description: "Review your daily intake and nutrition history",
    },
  ];

  return (
    <section id="how-it-works" className={styles.howItWorks}>
      <div className={styles.container}>
        <SectionTitle
          title="How It Works"
          subtitle="Start tracking your nutrition in three simple steps"
        />
        <div className={styles.steps}>
          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}