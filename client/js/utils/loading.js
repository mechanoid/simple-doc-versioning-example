/* global fetch */

const fetchOptions = {
  headers: { Accept: 'application/json' },
  credentials: 'same-origin',
  method: 'GET',
  mode: 'same-origin',
  redirect: 'follow'
}

export const load = async dataFile => {
  const result = await fetch(dataFile, fetchOptions)

  if (!result.ok) {
    throw new Error(`Data could not be loaded: ${result.status}`)
  }

  return result.json()
}
