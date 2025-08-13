

/* sample-component/SampleComponent.js */
export let generateComponentFile = ({slug, componentName}) => `class ${componentName} extends HTMLElement {
  #data = {} 
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

  set data(data){
    this.#data = data
    this.render()
  }

  get data(){
    return this.#data
  }

  render(){
    // edit .innerHTML here
  }

  listen(){
    /* write event listeners here */
  }
}

export {${componentName}}
customElements.define('${slug}', ${componentName})
`