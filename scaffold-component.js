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
    /*
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches()){

      }
    })
    */
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

