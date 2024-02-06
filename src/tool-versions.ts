import semver from "semver"

export type Tool = {
	/**
	 * The name of the tool.
	 */
	name: string

	/**
	 * The literal version that was found in the file.
	 */
	literal: string

	/**
	 * The coerced semver version if valid, null if not.
	 */
	version: string | null
}

/**
 * Parse a string into a list of tools.
 *
 * Tries to coerce the version into a valid semver version.
 */
export function parse(content: string): Tool[] {
	return content
		.split("\n")
		.map(function (line) {
			if (line.trim() === "") {
				return null
			}
			const [name, vrsn] = line.trim().split(/\s+/)
			if (!name || !vrsn) {
				throw new Error(`Cannot parse line: ${line}`)
			}

			const literal = vrsn.trim()
			const version = semver.valid(semver.coerce(literal))

			return {
				name: name.trim(),
				literal,
				version,
			}
		})
		.filter((x): x is Tool => x !== null)
}

/**
 * Stringify a list of tools to the .tool-versions format.
 */
export function stringify(tools: Tool[]): string {
	const content: string[] = []
	for (const tool of tools) {
		const v = tool.version ?? tool.literal
		if (!v) {
			continue
		}
		content.push(`${tool.name} ${v}`)
	}

	return content.join("\n").concat("\n")
}
