export let kebabToCamel = s => s
  .split(`-`)
  .map(token => token[0].toUpperCase() + token.slice(1))
  .join("")

/* like camel, but first letter is lower */
export let kebabToOstrich = s => {
  let decapitalize = w => w[0].toUpperCase() + w.slice(1)
  let camel = kebabToCamel(s)
  let ostrich = decapitalize(camel)
  return ostrich
}