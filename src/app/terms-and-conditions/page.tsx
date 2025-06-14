import Footer from "../about-us/components/Footer"
import Navbar from "../about-us/components/NavBar"

export default function TermsPage() {
  const terms = [
    {
      title: "1. Eligibility",
      text: "To use our services, you must be a restaurant owner or authorized representative.",
    },
    {
      title: "2. Services Provided",
      text: "MenuCards provides a customizable digital profile tool for restaurants to promote themselves online and drive direct customer engagement.",
    },
    {
      title: "3. User Responsibility",
      text: "You are responsible for the accuracy and legality of the content (menu, images, reviews) you upload.",
    },
    {
      title: "4. Intellectual Property",
      text: "All content, logos, and designs on MenuCards are the property of MenuCards unless otherwise stated.",
    },
    {
      title: "5. Termination",
      text: "We reserve the right to suspend or terminate accounts violating our terms or engaging in fraudulent activity.",
    },
    {
      title: "6. Liability",
      text: "MenuCards is not liable for any direct or indirect losses resulting from the use of our platform. We offer tools to assist restaurant marketing but do not guarantee outcomes.",
    },
    {
      title: "7. Changes to Terms",
      text: "We may update these terms from time to time. Continued use of the platform indicates acceptance of any changes.",
    },
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
