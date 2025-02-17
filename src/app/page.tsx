"use client"
import { Compare } from "./components/landing-page/Compare"
import { HeroSection } from "./components/landing-page/HeroSection"
import { NavBar } from "./components/landing-page/NavBar"
import { StickyScroll } from "./components/landing-page/StickyScroll"
import { TextGeneratorEffect } from "./components/landing-page/TextGeneratorEffect"
import PricingSectionComponent from "./components/landing-page/PricingSection"
import Footer from "./components/landing-page/Footer"
import React, { useState } from "react"

export default function Home() {
	const [sliderText, setSliderText] = useState("Linktree vs MenuCard")
	const handleSliderChange = (sliderXPercent: number) => {
		if (sliderXPercent === 50) {
			setSliderText("Linktree vs MenuCard")
		} else if (sliderXPercent > 50) {
			setSliderText("Linktree UI")
		} else {
			setSliderText("MenuCard UI")
		}
	}

	return (
		<div className="overflow-x-hidden">
			<NavBar
				navItems={[
					{ name: "Home", link: "#home" },
					{ name: "Features", link: "#features" },
					{ name: "Sample", link: "#sample-menu" },
					{ name: "Pricing", link: "#pricing" }
				]}
			/>

			<main className="max-w-full overflow-x-hidden">
				<section id="home">
					<HeroSection className="text-center">
						<div className="mb-20">
							<span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-serif mb-6 block text-black">
								Revolutionize Your Restaurant’s Online Presence with
							</span>
							<h1 className="mt-7 text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-black font-montserrat">
								MenuCard
							</h1>
							<p className="mt-8 mb-3">
								<span className="inline-block font-bold p-2 rounded-lg bg-gradient-to-r from-[#fc5c7d] to-[#6a82fb] dark:from-[#fc5c7d] dark:to-[#6a82fb] text-white mt-6">
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

						<button
							onClick={() => navigator.vibrate([2000, 100, 200])}
							className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
						>
							Join Waitlist
						</button>
					</HeroSection>
				</section>
				<section
					id="features"
					className="max-w-full overflow-x-hidden"
					style={{ height: "75vh", background: "white" }}
				>
					<StickyScroll
						title="Why Choose Us?"
						content={[
							{
								title: "Food Item Rating",
								description:
									"Let your old customers rate food and help new ones discover the best sellers."
							},
							{
								title: "Marketing Returns",
								description:
									"Don’t just blindly spend on marketing. With MenuCards, figure out the ROI of your efforts."
							},
							{
								title: "Customer Feedback",
								description:
									"Ensure that customers leaving your restaurant are happy and satisfied."
							},
							{
								title: "Social Media Sharing",
								description:
									"Easily share your best items and offers on social media, directly from your MenuCard."
							}
						]}
					/>
				</section>

				<section
					id="sample-menu"
					className="flex flex-col justify-center items-center max-w-full overflow-x-hidden"
					style={{
						minHeight: "30vh",
						background: "white",
						paddingBottom: "5vh",
						paddingTop: "5vh"
					}}
				>
					<div className="relative text-center mb-8 w-full px-3 sm:px-4">
						<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold font-montserrat text-black w-auto text-center whitespace-normal break-words">
							Why use MenuCards instead of Linktree?
						</h2>
						<div className="text-1xl text-black font-montserrat w-auto text-center mt-5 whitespace-normal break-words">
							Move beyond static links - Make a better impression of your
							restaurant with menu cards within seconds.
						</div>
					</div>
					<div
						className="relative w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/6 xl:w-1/6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
						style={{ height: "auto", background: "white" }}
					>
						<Compare
							secondImage="/MenuCardsUI.png"
							firstImage="/linktreeUI.png"
							slideMode="drag"
							onSliderChange={handleSliderChange}
						/>
						<p className="text-center mt-4 text-xl font-montserrat text-black">
							{sliderText}
						</p>
					</div>
				</section>

				<section id="pricing" className="pt-10 max-w-full overflow-x-hidden">
					<PricingSectionComponent />
				</section>

				<section className="pt-20 max-w-full overflow-x-hidden">
					<Footer />
				</section>
			</main>
		</div>
	)
}
