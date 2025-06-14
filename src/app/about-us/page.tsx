"use client"

import React from "react"
import OurSolutions from "./components/ourSolution"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"

/* This is TERMS & CONDITIONS page */
export default function AboutPage() {
	return (
		<div className="bg-white text-emerald-900 px-6 py-10 md:px-16 md:py-16 rounded-3xl  space-y-8 max-w-5xl mx-auto">
			<NavBar />
			<h2 className="text-2xl font-bold text-[#E53888]  text-center">
				About MenuCards
			</h2>

			<p className="text-lg text-center">
				Welcome to{" "}
				<span className="font-semibold text-[#E53888]">MenuCards!</span> Were on
				a mission to help restaurants grow independently by converting online
				attention into real orders—with no middlemen.
			</p>

			<div className="bg-[#F7CFD8] space-y-6  py-10 px-4 md:px-16">
				<section>
					<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E53888]  mb-6">
						What We do
					</h3>
					<p
						className="text-sm sm:text-base  text-gray-700 leading-relaxed"
						style={{ wordSpacing: "0.15rem" }}
					>
						Restaurants today spend thousands on marketing but struggle to
						convert social media traffic into paying customers. That’s where
						MenuCards steps in. We offer a smarter, high-converting alternative
						to traditional link-in-bio tools, designed specifically for
						restaurants and cloud kitchens.
					</p>
				</section>

				<section>
					<OurSolutions />
				</section>

				<section>
					<h3 className="text-2xl font-semibold mb-2 text-[#E53888] ">
						🌱 Our Vision
					</h3>
					<p>
						Every restaurant should have access to modern digital tools that
						empower them to compete with aggregators, grow their brand, and own
						their customer relationships.
					</p>
				</section>

				<section>
					<h3 className="text-2xl font-semibold mb-2 text-[#E53888] ">
						🤝 Let’s Grow Together
					</h3>
					<p>
						Whether youre a buzzing cloud kitchen or a beloved local spot,
						MenuCards is here to help you thrive online—organically and
						effectively.
					</p>
				</section>
			</div>
			<Footer />
		</div>
	)
}
