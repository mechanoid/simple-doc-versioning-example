/* global customElements, HTMLElement, fetch, DOMParser */

const button = (label, { classes = [], type = 'button' } = {}) => html(`<button class="${classes.join(' ')}" type="${type}">${label}</button>`)

const link = element => `<a href="${element.path}">${element.version}</a>`

const linkListItem = currentVersion => element => `<li class="${currentVersion === element.version ? 'selected' : ''}">${link(element)}</li>`

const linkList = (elements = [], currentVersion) => {
  const linkItem = linkListItem(currentVersion)
  const content = `
  <ul class="link-list">
    ${elements.map(linkItem).join('\n')}
  </ul>}
`
  console.log(content)
  return html(content)
}

const fetchOptions = {
  headers: { Accept: 'application/json' },
  credentials: 'same-origin',
  method: 'GET',
  mode: 'same-origin',
  redirect: 'follow'
}

const loadData = async dataFile => {
  const result = await fetch(dataFile, fetchOptions)
  if (!result.ok) {
    throw new Error(`Data could not be loaded: ${result.status}`)
  }
  return result.json()
}

customElements.define('doc-version-select', class DocVersionSelect extends HTMLElement {
  async connectedCallback () {
    const versions = await loadData(this.versionInfoFile)

    const dropdownButton = button(`${this.documentName}: ${this.currentVersion}`, { classes: ['button', 'dropdown-toggle'] })
    this.appendChild(dropdownButton)

    const versionList = linkList(versions, this.currentVersion)
    console.log(versionList)
    this.appendChild(versionList)
  }

  get versionInfoFile () {
    const versionInfoFile = this.hasAttribute('version-info') ? this.getAttribute('version-info') : null

    if (!versionInfoFile) {
      throw new Error('No version info data provided! Please add the attribute "version-info"!')
    }

    return versionInfoFile
  }

  get currentVersion () {
    const currentVersion = this.hasAttribute('current-version') ? this.getAttribute('current-version') : null
    return currentVersion || 'unknown'
  }

  get documentName () {
    const documentName = this.hasAttribute('document-name') ? this.getAttribute('document-name') : null
    return documentName || 'Docs'
  }
})

function html (htmlSnippet) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlSnippet, 'text/html')
  return doc.body.firstChild
}
