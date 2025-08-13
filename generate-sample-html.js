import { toCamelCase } from "jsr:@std/text";

/* sample-component/sample-component.html */
export let generateSampleHtml = ({slug, componentName}) => `
<!doctype html>
<html lang="en">
<head>  
  <title>&lt;${slug}></title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="${slug}.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22/>"

</head>
<body>

    <${slug} id="demo"></${slug}>  

<script type="module" defer>
import {${componentName}} from './${componentName}.js'

window.${toCamelCase(componentName)} = document.querySelector('${slug}')
</script>

</body>
</html>
`.trim() + '\n'
