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

let componentName = kebabToCamel(slug)

let js = `class ${componentName} extends HTMLElement {
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

await Deno.writeTextFile(`${slug}/${componentName}.js`, js)


let docsHtml = `
<!doctype html>
<html lang="en">
<head>  
  <title>${slug}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="${slug}-docs.css">

</head>
<body>
  
<header>
  <h1>&lt;${slug}></h1>
  <p class=description></p>
</header>

<main>
  <section id=example>
    <h2>Example</h2>
    <${slug}></${slug}>
  </section>

  <section id=attributes>
    <h2>Attributes</h2>
    <!-- list attributes -->
  </section>

  <section id=methods>
    <h2>Methods</h2>
    <!-- list methods -->
  </section>

  <section id=data>
    <h2>Data</h2>
    <!-- list data formats -->
  </section>

  <section id=events>
    <h2>Events</h2>
    <!-- list events -->
  </section>

  <section id=layouts>
    <h2>Layouts</h2>
    <!-- list layouts -->
  </section>


  <section id=see-also>
    <h2>See also</h2>
    <!-- see also -->
  </section>
</main>

<script type="module">
import {${componentName}} from './${componentName}.js'

window.${componentName[0].toLowerCase() + componentName.slice(1)} = document.querySelector('${slug}')
</script>

</body>
</html>
`.trim() + '\n'

await Deno.writeTextFile(`${slug}/${slug}-docs.html`, docsHtml)



let docsCss = `
header {
  background: green;
  color:white;
}

${slug} {
  display: block;
}
`

await Deno.writeTextFile(`${slug}/${slug}-docs.css`, docsCss)


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

window.${componentName[0].toLowerCase() + componentName.slice(1)} = document.querySelector('${slug}')
</script>

</body>
</html>
`.trim() + '\n'

await Deno.writeTextFile(`${slug}/${slug}.html`, sampleHtml)


let css = `
${slug} {
  display: block;
}
`

await Deno.writeTextFile(`${slug}/${slug}.css`, css)

let denoConfig = {
  "tasks": {
      "build": `pandoc -f markdown -t html --css ${slug}-docs.css --section-divs --template=template.html -o ${slug}-docs.html ${slug}-docs.md`
  }
}

let template = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="$lang$" xml:lang="$lang$"$if(dir)$ dir="$dir$"$endif$>
<head>
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
  <title>$if(title-prefix)$$title-prefix$ – $endif$$pagetitle$</title>
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
  <!--[if lt IE 9]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv-printshiv.min.js"></script>
  <![endif]-->
</head>
<body>
$for(include-before)$
$include-before$
$endfor$
$if(title)$
<header id="title-block-header">
<h1 class="title">$title$</h1>
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

await Deno.writeTextFile(`${slug}/deno.json`, JSON.stringify(denoConfig, null, 2))

let docsMarkdownTemplate = `---
lang: en
title: \\<sample-component\\>
viewport: width=device-width
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
`


await Deno.writeTextFile(`${slug}/${slug}-docs.md`, docsMarkdownTemplate) 
