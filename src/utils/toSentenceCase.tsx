export function toSentenceCase(str: string) {
	return str
		.split(" ")
		.map((word) => {
			const match = word.match(/[a-zA-Z]/)
			if (!match) return word

			const index = match.index!
			return (
				word.slice(0, index) +
				word.charAt(index).toUpperCase() +
				word.slice(index + 1).toLowerCase()
			)
		})
		.join(" ")
}
