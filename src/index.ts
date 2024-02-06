import * as core from "@actions/core"

import { Tool } from "./tool-versions"
import { parseStrategy } from "./strategy"
import { read, write } from "./file"
import { versions } from "./asdf"
import { match } from "./versions"

try {
	await run()
} catch (err) {
	if (err instanceof Error) {
		core.setFailed(err.message)
	} else {
		throw err
	}
}

async function run() {
	const path = core.getInput("path") || ".tool-versions"
	const strategy = parseStrategy(core.getInput("strategy") || "minor")

	core.debug(`Updating versions from ${path} using ${strategy} strategy`)
	const tools = await read(path)

	const res: Tool[] = []

	const all: { [name: string]: string[] } = {}
	await Promise.all(
		tools.map(async function (tool) {
			const vs = await versions(tool.name)
			all[tool.name] = vs
		}),
	)

	for (const tool of tools) {
		if (!tool.version) {
			core.debug(`cannot parse version for tool ${tool.name}, skipping`)
			res.push(tool)
			continue
		}

		core.debug(`finding latest matching version for ${tool.name}`)

		const vs = all[tool.name]
		if (!vs) {
			throw new Error("unreachable")
		}

		const version = match(tool.version, strategy, vs)
		if (!version) {
			res.push(tool)
		} else {
			res.push({
				...tool,
				version,
			})
		}
	}

	await write(path, tools)
}
