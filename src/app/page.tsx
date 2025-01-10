import { Compare } from './components/landing-page/Compare';
import { HeroSection } from './components/landing-page/HeroSection';
import { NavBar } from './components/landing-page/NavBar';
import { StickyScroll } from './components/landing-page/StickyScroll';
import { TextGeneratorEffect } from './components/landing-page/TextGeneratorEffect';
import PricingSectionComponent from './components/landing-page/PricingSection';
import Footer from './components/landing-page/Footer';

export default function Home() {
  return (
    <div>
      <NavBar navItems={[ { name: "Home", link: "#home" }, { name: "Features", link: "#features" }, { name: "Sample Menu", link: "#sample-menu" }, { name: "Pricing", link: "#pricing" } ]} />
      <main>
        <section id="home">
          <HeroSection className="text-center">
            <div className="mb-20">
              <span className="text-4xl font-serif mb-6 block text-black">
                Revolutionize Your Restaurant’s Online Presence with
              </span>
              <h1 className="mt-7 text-7xl font-black font-montserrat">
                MenuCard
              </h1>
              <p className="mt-8 mb-3">
                <span className="inline-block font-bold p-2 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500 text-white mt-6">
                  Save 30% in Commissions
                </span>
              </p>
            </div>

            <div className="mb-4">
              <TextGeneratorEffect
                words="Skip Zomato and Swiggy commissions. Take direct orders and maximize
            your profits."
              />
            </div>

            <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
              Join Waitlist
            </button>
          </HeroSection>
        </section>
        <section id="features" style={{ height: "110vh", background: "white"}}>
          <StickyScroll
            title="Why Choose Us?"
            content={[
              {
                title: "Food Item Rating",
                description:
                  "Let your old customers rate food and help new ones discover the best sellers.",
              },
              {
                title: "Marketing Returns",
                description:
                  "Don’t just blindly spend on marketing. With MenuCards, figure out the ROI of your efforts.",
              },
              {
                title: "Customer Feedback",
                description:
                  "Ensure that customers leaving your restaurant are happy and satisfied.",
              },
              {
                title: "Social Media Sharing",
                description:
                  "Easily share your best items and offers on social media, directly from your MenuCard.",
              },
            ]}
          />
        </section>
        <section id="sample-menu" className="flex flex-col justify-center items-center" style={{ minHeight: "30vh", background: "white", paddingBottom: "5vh", paddingTop : "5vh" }} > 
          <div className="relative text-center mb-8" style={{ width: "100%", background: "white" }}> 
            <h2 className="text-4xl font-bold font-montserrat text-black w-auto whitespace-nowrap text-center"> 
              Why use MenuCards instead of Linktree? 
            </h2>
            <h4 className="text-1xl text-black font-montserrat w-auto whitespace-nowrap text-center mt-5"> 
            Move beyond static links - Make a better impression of your
						restaurant with menu cards within seconds.
            </h4>
          </div> 
          <div className="relative" style={{ width: "15%", maxWidth: "600px", height: "auto", background: "white" }}> 
            <Compare secondImage="/MenuCardsUI.png" firstImage="/linktreeUI.png" slideMode="drag" /> 
          </div> 
        </section>
        <section id="pricing" className="pt-10">
          <PricingSectionComponent />
        </section>
        <section className="pt-20">
          <Footer />
        </section>
      </main>
    </div>
  );
}
