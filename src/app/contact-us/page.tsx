"use client"

import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

import Navbar from "../about-us/components/NavBar"
import Footer from "../about-us/components/Footer"

export default function ContactPage() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		message: ""
	})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [submitted, setSubmitted] = useState(false)
	const contactData = [
		{
			title: "Registered Office",
			content: ["Mumbai, Maharashtra, India"]
		},
		{
			title: "Support & General Inquiries",
			content: ["supportmenucards@gmail.com"]
		},
		{
			title: "Business & Partnerships",
			content: ["getmenucards@gmail.com"]
		}
	]
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const validate = () => {
		const tempErrors: { [key: string]: string } = {}
		if (!form.name) tempErrors.name = "Name is required"
		if (!form.email) tempErrors.email = "Email is required"
		else if (!/\S+@\S+\.\S+/.test(form.email))
			tempErrors.email = "Email is invalid"
		if (!form.phone) tempErrors.phone = "Phone is required"
		if (!form.message) tempErrors.message = "Message is required"
		return tempErrors
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const validationErrors = validate()
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
		} else {
			setErrors({})
			setSubmitted(true)
			// send data to backend here
		}
	}

	function handleCaptchaChange() {
		console.log()
	}

	return (
		<div className="bg-white text-emerald-900 px-6 py-10 md:px-16 md:py-16 rounded-3xl  space-y-8 max-w-5xl mx-auto">
            <Navbar />
			<div className="max-w-xl w-full">
				<h2 className="text-lg font-semibold mb-1 text-center text-[#E53888]">
					Contact Us
				</h2>
				<p className="mb-6 text-sm text-black text-center">
					We&#39;re always here to help and would love to hear from you!
				</p>

				{!submitted ? (
					<form
						onSubmit={handleSubmit}
						className="bg-[#FFCCE1] p-6 rounded-md space-y-4 shadow-sm text-black"
					>
						<input
							type="text"
							name="name"
							placeholder="Name"
							className="w-full p-2 border border-gray-300 rounded"
							value={form.name}
							onChange={handleChange}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm">{errors.name}</p>
						)}

						<input
							type="email"
							name="email"
							placeholder="Email"
							className="w-full p-2 border border-gray-300 rounded"
							value={form.email}
							onChange={handleChange}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email}</p>
						)}

						<input
							type="text"
							name="phone"
							placeholder="Phone"
							className="w-full p-2 border border-gray-300 rounded"
							value={form.phone}
							onChange={handleChange}
						/>
						{errors.phone && (
							<p className="text-red-500 text-sm">{errors.phone}</p>
						)}

						<textarea
							name="message"
							placeholder="Message"
							rows={4}
							className="w-full p-2 border border-gray-300 rounded"
							value={form.message}
							onChange={handleChange}
						/>
						{errors.message && (
							<p className="text-red-500 text-sm">{errors.message}</p>
						)}

						{/* reCAPTCHA placeholder */}
						<div className="recaptcha-wrapper">
							<ReCAPTCHA
								sitekey="6LcTxF8rAAAAAOsvNfvfhuoFicGJ554XVrOaRy7O"
								onChange={handleCaptchaChange}
							/>
							,
						</div>

						<button
							type="submit"
							className="bg-[#E53888] text-white px-6 py-2 rounded hover:bg-pink-600"
						>
							Send
						</button>
					</form>
				) : (
					<div className="text-center text-green-600 font-medium mt-4">
						Thank you for contacting us!
					</div>
				)}

				{/* Contact Info Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
					{contactData.map((item, idx) => (
						<div
							key={idx}
							className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition"
						>
							<h3 className="text-lg font-semibold text-[#E53888] mb-2 ">
								{item.title}
							</h3>
							{item.content.map((line, i) => (
								<p key={i} className="text-gray-700 break-words">
									<a
										href={`mailto:${line}`}
										className="text-black"
									>
										{line}
									</a>
								</p>
							))}
						</div>
					))}
				</div>
			
			</div>
             <Footer />
		</div>
	)
}
