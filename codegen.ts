import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
	overwrite: true,
	schema:
		process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4200/graphql",
	documents: "src/**/*.{ts,tsx}",
	generates: {
		"src/generated/graphql.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-apollo"
			],
			config: {
				withHooks: true,
				withComponent: false,
				withHOC: false,
				skipTypename: false,
				scalars: {
					DateTime: "string",
					Date: "string",
					JSON: "Record<string, any>",
					Upload: "File"
				}
			}
		},
		"src/generated/graphql.schema.json": {
			plugins: ["introspection"]
		}
	},
	ignoreNoDocuments: true
}

export default config
