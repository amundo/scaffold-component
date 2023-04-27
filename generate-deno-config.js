/* sample-component/deno.json */

let build = ({slug, componentName}) => {
  return {
    "tasks": {
        "build": `pandoc -f markdown -t html --css ${slug}-docs.css --template=template.html -o ${slug}-docs.html ${slug}-docs.md`
    }
  }
}
export let generateDenoConfig = ({slug, componentName}) => {
  let denoObject = build({slug, componentName})

  return JSON.stringify(denoObject, null, 2)
}

