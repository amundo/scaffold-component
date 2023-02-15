/*
  scaffold a component

  1. component.js
  2. html
  3. css

  all in a folder with the slug as a name


*/

const slug = Deno.args[0]

await Deno.mkdir(slug)

let kebabToCamel = s => s
  .split(`-`)
  .map(token => token[0].toUpperCase() + token.slice(1))
  .join("")

/* like camel, but first letter is lower */
let kebabToOstrich = s => {
  let decapitalize = w => w[0].toUpperCase() + w.slice(1)
  let camel = kebabToCamel(s)
  let ostrich = decapitalize(camel)
  return ostrich
}

const componentName = kebabToCamel(slug)

/* sample-component/SampleComponent.js */
let componentJs = `class ${componentName} extends HTMLElement {
  constructor(){
    super()
    this.listen()
  }

  async fetch(url){
    let response = await fetch(url)
    let data = await response.json()
    this.data = data
  }

  connectedCallback(){

  }

  static get observedAttributes(){
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "src"){
      this.fetch(newValue)
    }
  }

  /*
  set data(data){
    this.whatever = data.whatever
    this.metadata = data.metadata
    this.render()
  }

  get data(){
    return {
      whatever: this.whatever,
      metadata: this.metadata
    }
  }
  */

  render(){
    // edit .innerHTML here
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches()){

      }
    })
  }
}

export {${componentName}}
customElements.define('${slug}', ${componentName})
`

await Deno.writeTextFile(`${slug}/${componentName}.js`, componentJs)

/* sample-component/sample-component-docs.css */
let docsCss = `
@import url(${slug}.css);

header {
  background: green;
  color:white;
}

${slug} {
  display: block;
}
`

await Deno.writeTextFile(`${slug}/${slug}-docs.css`, docsCss)

/* sample-component/sample-component.html */
let sampleHtml = `
<!doctype html>
<html lang="en">
<head>  
  <title>${slug}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="${slug}.css">

</head>
<body>

    <${slug}></${slug}>  

<script type="module">
import {${componentName}} from './${componentName}.js'

window.${kebabToOstrich(componentName)} = document.querySelector('${slug}')
</script>

</body>
</html>
`.trim() + '\n'

await Deno.writeTextFile(`${slug}/${slug}.html`, sampleHtml)

/* sample-component/sample-component.css */
let css = `
${slug} {
  display: block;
}
`

await Deno.writeTextFile(`${slug}/${slug}.css`, css)

/* sample-component/deno.json */
let denoConfig = {
  "tasks": {
      "build": `pandoc -f markdown -t html --css ${slug}-docs.css --section-divs --template=template.html -o ${slug}-docs.html ${slug}-docs.md`
  }
}
await Deno.writeTextFile(`${slug}/deno.json`, JSON.stringify(denoConfig, null, 2))


/* docs template (for pandoc) */
let template = `
<!DOCTYPE html>
<html lang="$lang$">
<head>
  <title>$if(title-prefix)$$title-prefix$ – $endif$$pagetitle$</title>
  <meta charset="utf-8" />
  <meta name="generator" content="pandoc" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
$for(author-meta)$
  <meta name="author" content="$author-meta$" />
$endfor$
$if(date-meta)$
  <meta name="dcterms.date" content="$date-meta$" />
$endif$
$if(keywords)$
  <meta name="keywords" content="$for(keywords)$$keywords$$sep$, $endfor$" />
$endif$
$if(description-meta)$
  <meta name="description" content="$description-meta$" />
$endif$
  <style>
    $styles.html()$
  </style>
$for(css)$
  <link rel="stylesheet" href="$css$" />
$endfor$
$for(header-includes)$
  $header-includes$
$endfor$
$if(math)$
  $math$
$endif$
</head>
<body>
$for(include-before)$
$include-before$
$endfor$
$if(pagetitle)$
<header id="title-block-header">
<h1 class="title">$pagetitle$</h1>
$if(subtitle)$
<p class="subtitle">$subtitle$</p>
$endif$
$for(author)$
<p class="author">$author$</p>
$endfor$
$if(date)$
<p class="date">$date$</p>
$endif$
$if(abstract)$
<div class="abstract">
<div class="abstract-title">$abstract-title$</div>
$abstract$
</div>
$endif$
</header>
$endif$
$if(toc)$
<nav id="$idprefix$TOC" role="doc-toc">
$if(toc-title)$
<h2 id="$idprefix$toc-title">$toc-title$</h2>
$endif$
$table-of-contents$
</nav>
$endif$
$body$
$for(include-after)$
$include-after$
$endfor$
</body>
</html>

`

Deno.writeTextFileSync(`${slug}/template.html`, template)


/* sample-component/sample-component.md */
let docsMarkdownTemplate = `---
lang: en
title:  \\<${slug}\\>
css: ${slug}.css
---

<div>

# \\<${slug}\\>

</div>

<main>
::: {#example .section}
## Example
:::

::: {#attributes .section}
## Attributes
:::

::: {#methods .section}
## Methods
:::

::: {#data .section}
## Data
:::

::: {#events .section}
## Events
:::

::: {#layouts .section}
## Layouts
:::

::: {#see-also .section}
## See also
:::
</main>


<script type="module">
import {${componentName}} from './${componentName}.js'

window.${componentName[0].toLowerCase() + componentName.slice(1)} = document.querySelector('${slug}')
</script>

`

await Deno.writeTextFile(`${slug}/${slug}-docs.md`, docsMarkdownTemplate) 
