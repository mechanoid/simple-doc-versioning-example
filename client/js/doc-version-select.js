/* global customElements, HTMLElement */

import { button, linkList } from './elements.js'
import { load } from './utils/loading.js'

class DocVersionSelect extends HTMLElement {
  async connectedCallback () {
    const versions = await load(this.versionInfoFile)

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
}

customElements.define('doc-version-select', DocVersionSelect)
