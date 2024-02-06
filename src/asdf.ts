import { exec as _exec } from "child_process"

export async function versions(tool: string): Promise<string[]> {
	const stdout = await exec(`asdf list all ${tool}`)
	return stdout.split("\n")
}

export async function exec(cmd: string): Promise<string> {
	return new Promise(function (resolve, reject) {
		_exec(cmd, function (err, stdout) {
			if (err) {
				reject(err)
				return
			}
			resolve(stdout)
		})
	})
}
