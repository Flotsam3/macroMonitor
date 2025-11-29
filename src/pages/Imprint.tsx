import { Link } from "react-router-dom";
import styles from "./LegalPage.module.scss";

export default function Imprint() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          Back to Home
        </Link>
      </div>

      <div className={styles.container}>
        <h1>Imprint</h1>
        <p className={styles.lastUpdated}>Last updated: January 2024</p>

        <section>
          <h2>Information according to § 5 TMG</h2>
          <p>
            MacroMonitor<br />
            [Your Company Name]<br />
            [Street Address]<br />
            [Postal Code, City]<br />
            [Country]
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Email: legal@macromonitor.com<br />
            Phone: [Your Phone Number]
          </p>
        </section>

        <section>
          <h2>Represented by</h2>
          <p>[Name of Managing Director/Owner]</p>
        </section>

        <section>
          <h2>Register Entry</h2>
          <p>
            Registration court: [Court Name]<br />
            Registration number: [Number]
          </p>
        </section>

        <section>
          <h2>VAT ID</h2>
          <p>
            VAT identification number according to § 27a VAT Tax Act:<br />
            [Your VAT ID]
          </p>
        </section>

        <section>
          <h2>Responsible for Content</h2>
          <p>
            Responsible for content according to § 55 Abs. 2 RStV:<br />
            [Name]<br />
            [Address]
          </p>
        </section>

        <section>
          <h2>EU Dispute Resolution</h2>
          <p>
            The European Commission provides a platform for online dispute resolution (ODR):
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p>
            Our email address can be found above in the imprint.
          </p>
        </section>

        <section>
          <h2>Consumer Dispute Resolution</h2>
          <p>
            We are not willing or obliged to participate in dispute resolution proceedings
            before a consumer arbitration board.
          </p>
        </section>
      </div>
    </div>
  );
}