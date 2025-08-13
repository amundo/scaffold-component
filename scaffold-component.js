import { parse } from "jsr:@std/flags"
import { generateComponentFile } from "./generate-component-file.js"
import { generateComponentCss } from "./generate-component-css.js"
import { generateSampleHtml } from "./generate-sample-html.js"
import { toPascalCase } from "jsr:@std/text"

/*
This is a command-line tool for scaffolding out a web component.

Example:
$ scaffold-component my-component
*/

const flags = parse(Deno.args, {
  boolean: ["force"],
  string: [],
  default: { force: false },
})

if (!flags._[0]) {
  console.error("Component name required: $ scaffold-component my-component")
  Deno.exit(1)
}

const slug = String(flags._[0])

if (!slug.includes("-")) {
  console.error("Component name must include hyphen: my-component")
  Deno.exit(1)
}

try {
  const dirInfo = await Deno.stat(slug)
  if (dirInfo.isDirectory) {
    if (!flags.force) {
      console.log(
        `Directory ${slug} already exists. To overwrite, use --force. Exiting...`,
      )
      Deno.exit(0)
    } else {
      console.log(
        `Directory ${slug} already exists. Overwriting because --force was used...`,
      )
      await Deno.remove(slug, { recursive: true })
    }
  }
} catch (error) {
  if (!(error instanceof Deno.errors.NotFound)) {
    console.error("Error checking directory:", error)
    Deno.exit(1)
  }
}

await Deno.mkdir(slug)

const componentName = toPascalCase(slug)

const componentConfig = {
  slug,
  componentName,
}

const componentJs = generateComponentFile(componentConfig)
await Deno.writeTextFile(`${slug}/${componentName}.js`, componentJs)

const sampleHtml = generateSampleHtml(componentConfig)
await Deno.writeTextFile(`${slug}/${slug}.html`, sampleHtml)

const componentCss = generateComponentCss(componentConfig)
await Deno.writeTextFile(`${slug}/${slug}.css`, componentCss)
