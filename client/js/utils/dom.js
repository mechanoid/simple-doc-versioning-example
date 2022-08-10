/* global DOMParser */

export const html = htmlSnippet => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlSnippet, 'text/html')
  return doc.body.firstChild
}
