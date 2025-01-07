import { Compare } from './components/landing-page/Compare';
import { HeroSection } from './components/landing-page/HeroSection';
import { NavBar } from './components/landing-page/NavBar';
import { StickyScroll } from './components/landing-page/StickyScroll';
import { TextGeneratorEffect } from './components/landing-page/TextGeneratorEffect';

export default function Home() {
  return (
    <div>
      <NavBar navItems={[{ name: "Home", link: "#" }]} />
      <main>
        <section>
          <HeroSection className="text-center">
            <div className="mb-20">
              <span className="text-4xl font-serif mb-6 block">
                Revolutionize Your Restaurant’s Online Presence with
              </span>
              <h1 className="text-7xl font-black font-sans">MenuCard</h1>
              <p className="mt-3">
                <span className="inline-block p-2 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500">
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
        <section style={{ height: "90vh" }}>
          <StickyScroll
            title="Why Choose Us"
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
        <section>
          <div className="relative" style={{ width: "25vw" }}>
            <Compare
              secondImage="/linktreeUI.png"
              firstImage="/MenuCardsUI.png"
              slideMode="drag"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
