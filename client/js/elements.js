import { html } from './utils/dom.js'

export const button = (label, { classes = [], type = 'button' } = {}) => html(`<button class="${classes.join(' ')}" type="${type}">${label}</button>`)

const link = element => `<a href="${element.path}">${element.version}</a>`

const linkListItem = currentVersion => element => `<li class="${currentVersion === element.version ? 'selected' : ''}">${link(element)}</li>`

export const linkList = (elements = [], currentVersion) => {
  const linkItem = linkListItem(currentVersion)

  return html(`
    <ul class="link-list">
      ${elements.map(linkItem).join('\n')}
    </ul>
  `)
}
