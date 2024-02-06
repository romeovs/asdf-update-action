import { test, expect } from "bun:test"
import { match } from "./versions"

test("match should find the best matching version in major strategy", function () {
	const m = match("2.1.15", "major", [
		"2.1.13",
		"2.1.14",
		"2.1.15",
		"2.1.16",
		"2.1.17",
		"2.2.1",
		"2.2.2",
		"2.2.3",
		"3.1.1",
		"3.1.2",
	])
	expect(m).toBe("3.1.2")
})

test("match should find the best matching version in minor strategy", function () {
	const m = match("2.1.15", "minor", [
		"2.1.13",
		"2.1.14",
		"2.1.15",
		"2.1.16",
		"2.1.17",
		"2.2.1",
		"2.2.2",
		"2.2.3",
		"3.1.1",
		"3.1.2",
	])
	expect(m).toBe("2.2.3")
})

test("match should find the best matching version in patch strategy", function () {
	const m = match("2.1.15", "patch", [
		"2.1.13",
		"2.1.14",
		"2.1.15",
		"2.1.16",
		"2.1.17",
		"2.2.1",
		"2.2.2",
		"2.2.3",
		"3.1.1",
		"3.1.2",
	])
	expect(m).toBe("2.1.17")
})
