export type Strategy = "major" | "minor" | "patch"

export function parseStrategy(str: string): Strategy {
	if (str === "major" || str === "minor" || str === "patch") {
		return str
	}
	throw new Error(`Invalid strategy: ${str}`)
}
