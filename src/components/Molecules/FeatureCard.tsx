import styles from "./FeatureCard.module.scss";

type FeatureCardProps = {
   image: string;
   alt: string;
   title: string;
   description: string;
};

export default function FeatureCard({ image, alt, title, description }: FeatureCardProps) {
   return (
      <div className={styles.card}>
         <div className={styles.imageWrapper}>
            <img src={image} alt={alt} />
            <div className={styles.overlay}>
               <h3 className={styles.title}>{title}</h3>
               <p className={styles.description}>{description}</p>
            </div>
         </div>
      </div>
   );
}
