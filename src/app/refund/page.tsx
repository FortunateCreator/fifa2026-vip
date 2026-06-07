'use client'

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="text-4xl font-bold text-white mb-2">
        <span className="text-gold-400">Vantage 26 | </span>Refund & Cancellation Policy
      </h1>
      <p className="text-gray-500 mb-10">Last updated: June 2026</p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Our Guarantee</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          At Vantage 26, we are committed to delivering the premium experience you have reserved. Our
          core promise is simple: <strong className="text-gray-200">we keep our promise to get you to the event.</strong> Every booking is
          backed by our network of authorized providers and contingency arrangements to ensure your
          experience is delivered as agreed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Cancellation Timeline</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          If you need to cancel your booking, the refund amount depends on when you cancel relative to
          the event date. All cancellation requests must be submitted in writing through our encrypted
          communication channels.
        </p>
        <div className="overflow-hidden rounded-lg border border-dark-border mt-6 mb-6">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-dark-border bg-dark-900">
                <th className="px-5 py-3 font-semibold text-white">Cancellation Period</th>
                <th className="px-5 py-3 font-semibold text-gold-400">Refund Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              <tr className="bg-dark-950">
                <td className="px-5 py-3 text-gray-300">90+ days before the event</td>
                <td className="px-5 py-3 text-white">100% Full Refund</td>
              </tr>
              <tr className="bg-dark-950">
                <td className="px-5 py-3 text-gray-300">60–89 days before the event</td>
                <td className="px-5 py-3 text-white">75% Refund</td>
              </tr>
              <tr className="bg-dark-950">
                <td className="px-5 py-3 text-gray-300">30–59 days before the event</td>
                <td className="px-5 py-3 text-white">50% Refund</td>
              </tr>
              <tr className="bg-dark-950">
                <td className="px-5 py-3 text-gray-300">Under 30 days before the event</td>
                <td className="px-5 py-3 text-gray-500">No Refund</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 leading-relaxed text-sm">
          The &quot;event date&quot; refers to the date of the specific match or service included in your booking.
          For multi-match packages, the earliest match date applies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Crypto Refunds</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          All refunds will be issued in the <strong className="text-gray-200">same cryptocurrency</strong> that was used for the original
          payment (BTC, ETH, or USDT). The refund amount will be calculated at the current market rate
          at the time the refund is processed.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          Please note that cryptocurrency values are volatile. The USD equivalent of your refund may
          differ from the original USD value of your payment due to market fluctuations between the
          purchase and refund dates. You bear the risk of any such changes in value.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          Refunds will be sent to the same wallet address used for the original payment, unless
          alternative arrangements are agreed upon in writing. Network transaction fees (gas fees) for
          the refund transfer will be deducted from the refunded amount.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Service Failure</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          In the unlikely event that Vantage 26 fails to deliver the services as described in your
          booking confirmation, you are entitled to a <strong className="text-gray-200">full refund</strong> of the amount paid. Service
          failure includes:
        </p>
        <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-4 space-y-1">
          <li>Failure to provide valid match tickets or venue access</li>
          <li>Failure to provide contracted transportation or hospitality services</li>
          <li>Material misrepresentation of the package contents compared to what was delivered</li>
        </ul>
        <p className="text-gray-400 leading-relaxed mb-4">
          To qualify for a service failure refund, you must notify us within 48 hours of the scheduled
          service date and provide reasonable evidence of the failure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Force Majeure</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Vantage 26 shall not be held liable for failure to perform our obligations due to events
          outside our reasonable control, including but not limited to:
        </p>
        <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-4 space-y-1">
          <li>Acts of God (natural disasters, pandemics, extreme weather)</li>
          <li>Government actions, regulations, or travel restrictions</li>
          <li>War, terrorism, civil unrest, or geopolitical events</li>
          <li>FIFA rescheduling, canceling, or relocating matches</li>
          <li>Venue closures or operational disruptions</li>
          <li>Blockchain network outages or failures</li>
        </ul>
        <p className="text-gray-400 leading-relaxed mb-4">
          In the event of a force majeure situation, we will work with you to find alternative
          arrangements where possible. If alternatives are not feasible, we will issue a refund on a
          case-by-case basis, minus any non-recoverable costs already incurred.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. How to Request a Refund</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          To request a cancellation or refund, please contact us through our encrypted communication
          channels with the following information:
        </p>
        <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-4 space-y-1">
          <li>Your full name and booking reference number</li>
          <li>The package or service you wish to cancel</li>
          <li>The reason for cancellation</li>
          <li>The wallet address for the refund (if different from the original payment address)</li>
        </ul>
        <p className="text-gray-400 leading-relaxed mb-4">
          We will process your request within 10 business days of receipt. Refunds will be issued
          within 5 business days after the request is approved.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Contact</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          For all cancellation and refund inquiries, please reach out through our encrypted
          communication channels. Our team is available to assist you with any questions or concerns
          regarding this policy.
        </p>
      </section>
    </div>
  )
}
