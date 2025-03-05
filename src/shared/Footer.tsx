import Link from "next/link"

function Footer() {
	return (
		<footer className="bg-slate-900 mt-4  flex justify-center p-2">
			<div className="text-stone-300 text-sm">
				Powered by{" "}
				<Link href={`/`} className="underline text-sm">
					Menucards
				</Link>
			</div>
		</footer>
	)
}

export default Footer
