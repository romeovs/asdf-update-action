import { promises as fs } from "fs"
import { parse, stringify, Tool } from "./tool-versions"

export async function read(path: string): Promise<Tool[]> {
	const content = await fs.readFile(path, "utf-8")
	return parse(content)
}

export async function write(path: string, tools: Tool[]): Promise<void> {
	const content = stringify(tools)
	await fs.writeFile(path, content)
}
