import Footer from "../about-us/components/Footer"
import Navbar from "../about-us/components/NavBar"

export default function TermsPage() {
	const terms = [
		{
			title: "1. Acceptance",
			text: `By signing up as a restaurant (“Merchant”) or placing an order as a diner (“Guest”) through MenuCards (“Service”), you agree to these terms and our Privacy Policy.`
		},
		{
			title: "2. Eligibility",
			text: `Merchants must hold a valid FSSAI licence. Guests must be 18+ or have guardian consent.`
		},
		{
			title: "3. Merchant Obligations",
			text: `Maintain accurate menu, pricing, allergen info. Fulfil accepted orders on time. Obtain guest opt-in before sending marketing messages. Keep dashboard credentials secure.`
		},
		{
			title: "4. Orders, Subscriptions & Payments",
			text: `Orders flow via QR or WhatsApp cart. Payments processed by integrated gateways; MenuCards never stores full card details. All prices shown include applicable GST unless noted.`
		},
		{
			title: "5. Fees",
			text: `Starter Plan: ₹300/month. Invoices auto-charged via Razorpay; seven-day due net. Non-payment → account suspension after 14 days.`
		},
		{
			title: "6. Delivery & Service Scope",
			text: `MenuCards supplies the software layer; actual food prep and delivery remain the restaurant’s responsibility.`
		},
		{
			title: "7. Cancellations & Refunds",
			text: `Diners may cancel orders until the restaurant confirms preparation. Refunds are issued by the Merchant and routed via the original payment method within 7–8 bank days.`
		},
		{
			title: "8. WhatsApp Communications",
			text: `We communicate via WhatsApp strictly as per Meta’s policies: Only customers who opt in are messaged. We use WhatsApp to send delivery alerts, confirmations, and feedback requests. You may opt out anytime by replying with "STOP".`
		},
		{
			title: "9. Intellectual Property",
			text: `All code, logos, and designs remain © MenuCards Technologies Pvt Ltd. Merchants may display “Powered by MenuCards” badge on menus.`
		},
		{
			title: "10. Limitation of Liability",
			text: `MenuCards’ total liability in any 12-month period is limited to the subscription fees actually paid by the Merchant. No liability for indirect or consequential damages.`
		},
		{
			title: "11. Termination",
			text: `Either party may terminate with 30 days’ notice. Data export (CSV/JSON) available during the notice window.`
		},
		{
			title: "12. Governing Law",
			text: `Indian law; exclusive jurisdiction courts of Mumbai, Maharashtra.`
		},
		{
			title: "13. Contact",
			text: `Welnia Foods Pvt Ltd. D 21 FLR 2 D WING MAHIM, UNNATI CHS BHAGOJI KEER M, Mahim, Mumbai, Mumbai- 400016, Maharashtra. privacy@menu-cards.com | +91 9757024944`
		}
	]

	return (
		<>
			<Navbar />
			<section className="bg-white text-emerald-900 px-6 py-10 md:px-16 md:py-16 rounded-3xl  space-y-8 max-w-5xl mx-auto">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-2xl md:text-4xl font-bold text-[#E53888] mt-8 mb-4 text-center">
						Terms & Conditions
					</h1>

					<p className="text-gray-700 mb-10 text-center">
						By using MenuCards, you agree to the following terms and conditions.
					</p>

					<div className="space-y-6">
						{terms.map((term, index) => (
							<div
								key={index}
								className="bg-pink-50 border border-[#E53888]/20 rounded-2xl p-5 shadow-sm"
							>
								<h2 className="text-[#E53888] font-semibold text-lg mb-1">
									{term.title}
								</h2>
								<p className="text-gray-700">{term.text}</p>
							</div>
						))}
					</div>
				</div>
				<Footer />
			</section>
		</>
	)
}
