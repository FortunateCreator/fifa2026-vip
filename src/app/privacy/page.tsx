'use client'

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="text-4xl font-bold text-white mb-2">
        <span className="text-gold-400">Vantage 26 | </span>Privacy Policy
      </h1>
      <p className="text-gray-500 mb-10">Last updated: June 2026</p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Information We Collect</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          When you use our services, we collect information that you voluntarily provide to us,
          including:
        </p>
        <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-4 space-y-1">
          <li><strong className="text-gray-300">Personal Identification:</strong> Full name, email address, phone number, and billing details.</li>
          <li><strong className="text-gray-300">Device Information:</strong> Browser type and version, operating system, screen resolution, IP address, timezone, number of CPU cores, and total RAM.</li>
          <li><strong className="text-gray-300">Communication Data:</strong> Messages, inquiries, and correspondence sent through our platform.</li>
          <li><strong className="text-gray-300">Transaction Data:</strong> Cryptocurrency wallet addresses used for payment, transaction hashes, and booking history.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          We use the collected information for the following purposes:
        </p>
        <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-4 space-y-1">
          <li>Processing and confirming bookings and payments</li>
          <li>Communicating with you about your booking, including confirmations, updates, and changes</li>
          <li>Fraud prevention, risk assessment, and security monitoring</li>
          <li>Improving our services, website, and user experience</li>
          <li>Complying with legal obligations and enforcing our Terms of Service</li>
          <li>Sending service-related notifications and, with your consent, promotional materials</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Data Storage</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          We store your data in JSONL (JSON Lines) files on secure, encrypted servers. Each line in
          these files represents a structured record containing the information described in Section 1.
          This format allows us to efficiently process, search, and manage data while maintaining a
          complete audit trail.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          Our servers are protected by industry-standard encryption at rest (AES-256) and in transit
          (TLS 1.3). Access to stored data is restricted to authorized personnel only, and all access
          is logged and monitored.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Third-Party Services</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          We use the following third-party services to deliver our services:
        </p>
        <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-4 space-y-1">
          <li><strong className="text-gray-300">Telegram:</strong> We use Telegram for booking notifications, client communication, and service updates. Your contact information may be shared with Telegram to facilitate these communications. Telegram&apos;s privacy policy applies to data processed on their platform.</li>
          <li><strong className="text-gray-300">Blockchain Networks:</strong> Cryptocurrency transactions are processed through public blockchain networks (Bitcoin, Ethereum, etc.). Transaction details including wallet addresses and amounts are publicly visible on the respective blockchain.</li>
        </ul>
        <p className="text-gray-400 leading-relaxed mb-4">
          We do not sell your personal information to third parties. We only share data with third-party
          services as necessary to fulfill our service obligations to you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Data Retention</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          We retain your personal data for as long as necessary to fulfill the purposes for which it
          was collected, including any legal, accounting, or reporting requirements. Typically, this
          means we retain your data for the duration of your relationship with us plus a reasonable
          period thereafter (up to 5 years) to comply with legal obligations.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Your Rights</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Depending on your jurisdiction, you may have the following rights regarding your personal
          data:
        </p>
        <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-4 space-y-1">
          <li><strong className="text-gray-300">Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong className="text-gray-300">Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong className="text-gray-300">Right to Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
          <li><strong className="text-gray-300">Right to Restrict Processing:</strong> Request that we limit the processing of your data.</li>
          <li><strong className="text-gray-300">Right to Data Portability:</strong> Request a structured, machine-readable copy of your data.</li>
          <li><strong className="text-gray-300">Right to Object:</strong> Object to the processing of your data for marketing purposes.</li>
        </ul>
        <p className="text-gray-400 leading-relaxed mb-4">
          To exercise any of these rights, please contact us through our encrypted communication
          channels. We will respond to your request within 30 days.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Security</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          We implement appropriate technical and organizational measures to protect your personal data
          against unauthorized access, alteration, disclosure, or destruction. These measures include
          encryption, access controls, regular security audits, and secure data storage practices.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          However, no method of electronic storage or transmission is 100% secure. While we strive to
          protect your data, we cannot guarantee its absolute security.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">8. Changes to This Policy</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any material
          changes by posting the new policy on this page and updating the &quot;Last updated&quot; date at the
          top. We encourage you to review this policy periodically.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">9. Contact</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data
          practices, please contact us through our encrypted communication channels.
        </p>
      </section>
    </div>
  )
}
