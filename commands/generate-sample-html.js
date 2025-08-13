import { kebabToCamel, kebabToOstrich } from "jsr:@std/text"

/* sample-component/sample-component.html */
export let generateSampleHtml = ({slug, componentName}) => `
<!doctype html>
<html lang="en">
<head>  
  <title>&lt;${slug}></title>
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
