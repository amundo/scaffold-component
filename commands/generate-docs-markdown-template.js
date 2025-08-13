
/* sample-component/sample-component.md */
export let generateDocsMarkdownTemplate = ({slug, componentName}) => `---
lang: en
title:  \\<${slug}\\> docs
css: ${slug}.css
---

<main>


## Example


\`\`\`html
<${slug}></${slug}>
\`\`\`

\`\`\`{=html}
<${slug}></${slug}>
\`\`\`





## Attributes



## Methods



## Data



## Events



## Layouts



## See also

</main>


<script type="module">
import {${componentName}} from './${componentName}.js'

window.${componentName[0].toLowerCase() + componentName.slice(1)} = document.querySelector('${slug}')
</script>

`
