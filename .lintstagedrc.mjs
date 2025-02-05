import { relative } from "path"

const buildEslintCommand = (filenames) =>
	`next lint --fix --file ${filenames
		.map((f) => relative(process.cwd(), f))
		.join(" --file ")} && npx tsc --noEmit`

const rule = {
	"*.{js,jsx,ts,tsx}": [buildEslintCommand]
}

export default rule
