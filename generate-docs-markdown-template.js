
/* sample-component/sample-component.md */
export let generateDocsMarkdownTemplate = ({slug, componentName}) => `---
lang: en
title:  \\<${slug}\\> docs
css: ${slug}.css
---

<main>

<section id=example>

## Example


\`\`\`html
<${slug}></${slug}>
\`\`\`

\`\`\`{=html}
<${slug}></${slug}>
\`\`\`



</section>

<section id=attributes>

## Attributes

</section>

<section id=methods>

## Methods

</section>

<section id=data>

## Data

</section>

<section id=events>

## Events

</section>

<section id=layouts>

## Layouts

</section>

<section id=see-also>

## See also

</main>


<script type="module">
import {${componentName}} from './${componentName}.js'

window.${componentName[0].toLowerCase() + componentName.slice(1)} = document.querySelector('${slug}')
</script>

`