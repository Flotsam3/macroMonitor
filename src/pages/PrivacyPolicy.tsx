import { Link } from "react-router-dom";
import styles from "./LegalPage.module.scss";

export default function PrivacyPolicy() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          Back to Home
        </Link>
      </div>

      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: January 2024</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to MacroMonitor. We respect your privacy and are committed to protecting
            your personal data. This privacy policy will inform you about how we look after
            your personal data and tell you about your privacy rights.
          </p>
        </section>

        <section>
          <h2>2. Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
          <ul>
            <li><strong>Identity Data:</strong> first name, last name, username</li>
            <li><strong>Contact Data:</strong> email address</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
            <li><strong>Usage Data:</strong> information about how you use our app and services</li>
            <li><strong>Nutrition Data:</strong> food images, macro tracking data, nutrition goals</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <p>We use your personal data for the following purposes:</p>
          <ul>
            <li>To provide and maintain our nutrition tracking service</li>
            <li>To manage your account and provide customer support</li>
            <li>To analyze and improve our app's functionality</li>
            <li>To send you updates and marketing communications (with your consent)</li>
            <li>To ensure the security and integrity of our services</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Storage and Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your
            personal data against unauthorized access, alteration, disclosure, or destruction.
            Your data is stored on secure servers and encrypted during transmission.
          </p>
        </section>

        <section>
          <h2>5. Data Sharing</h2>
          <p>
            We do not sell your personal data. We may share your information with:
          </p>
          <ul>
            <li>Service providers who help us operate our platform</li>
            <li>Legal authorities when required by law</li>
            <li>Third parties with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>Under data protection laws, you have rights including:</p>
          <ul>
            <li><strong>Right to Access:</strong> Request copies of your personal data</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
            <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
          </ul>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service
            and store certain information. You can instruct your browser to refuse all cookies
            or to indicate when a cookie is being sent.
          </p>
        </section>

        <section>
          <h2>8. Third-Party Services</h2>
          <p>
            Our app may contain links to third-party websites or services. We are not responsible
            for the privacy practices of these third parties. We encourage you to read their
            privacy policies.
          </p>
        </section>

        <section>
          <h2>9. Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13 years of age. We do not knowingly
            collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any
            changes by posting the new Privacy Policy on this page and updating the "Last updated"
            date.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p>
            Email: privacy@macromonitor.com<br />
            Address: [Your Company Address]
          </p>
        </section>
      </div>
    </div>
  );
}