import { parse } from "jsr:@std/flags"

const commands = {
  component: "./commands/scaffold-component.js",
  module: "./commands/scaffold-module.js"
}

let flags = parse(Deno.args)
let command = flags._[0]
let name = flags._[1]

if (!command || !name || !commands[command]) {
  console.log(`
Usage: scaffold-docling <command> <name>

Commands:
  component   Create a new web component (e.g., interlinear-text-view)
  module      Create a new data model (e.g., text)

Examples:
  scaffold-docling component interlinear-text-view
  scaffold-docling module text
`)
  Deno.exit(1)
}

// Forward to appropriate command
const module = await import(commands[command])
await module.default(name, flags)
