import semver from "semver"
import { Strategy } from "./strategy"

function toRange(version: string, strategy: Strategy): string {
	const [major, minor, patch] = version.split(".")
	if (!major || !minor || !patch) {
		throw new Error(`Cannot parse version: ${version}`)
	}

	if (strategy === "major") {
		return "x.x.x"
	}

	if (strategy === "minor") {
		return `${major}.x.x`
	}

	return `${major}.${minor}.x`
}

export function match(
	version: string,
	strategy: Strategy,
	versions: string[],
): string | null {
	const range = toRange(version, strategy)
	const sorted = semver.rsort(versions)

	for (const version of sorted) {
		if (semver.satisfies(version, range)) {
			return version
		}
	}

	return null
}
