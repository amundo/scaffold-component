
export let generateComponentFile = ({slug, componentName}) => `/**
 * Custom element for ${slug}
 * @element ${slug}
 * @customElement
 */
class ${componentName} extends HTMLElement {
  /**
   * The component's internal data
   * @private 
   */
  #data = null

  constructor() {
    super()
    this.listen()
  }

  /**
   * Fetches component data from a URL
   * @param {string} url - URL to fetch data from
   * @returns {Promise<void>}
   */
  async fetch(url) {
    let response = await fetch(url)
    let data = await response.json()
    this.data = data
  }

  /**
   * Called when element is inserted into DOM
   */
  connectedCallback() {
  }

  /**
   * List of observed attributes
   * @returns {string[]}
   */
  static get observedAttributes() {
    return ["src"]
  }

  /**
   * Handles attribute changes
   * @param {string} attribute - Name of changed attribute
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(attribute, oldValue, newValue) {
    if(attribute == "src") {
      this.fetch(newValue)
    }
  }

  /**
   * Sets component data and triggers render
   * @param {Object} data - Component data
   */
  set data(data) {
    this.#data = data
    this.render()
  }

  /**
   * Gets current component data
   * @returns {Object} Current data
   */
  get data() {
    return this.#data
  }

  /**
   * Renders the component
   * @private
   */
  render() {
    // edit .innerHTML here
  }

  /**
   * Sets up event listeners
   * @private
   */
  listen() {
    /* write event listeners here */
  }
}

export {${componentName}}
customElements.define('${slug}', ${componentName})
`