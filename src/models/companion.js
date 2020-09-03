'use strict'

// Utils
import { joinParamsAsString } from '../../utils/utils'
import { xmlhttprequest as xhr } from '../../utils/xmlhttprequest'

/**
 * ⛔ Actions by NOT logged in users
 */

export const guestGetsOwnDataById = (guestId) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!guestId) {
      reject('Guest ID required!')
    }

    // Request
    xhr({
      method: 'GET',
      url: `${process.env.VUE_APP_API}companion/own-data/${guestId}`,
      async: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((data) => {
        resolve(JSON.parse(data).data.guest)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const guestUpdatesOwnDataById = (guestId, params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!guestId || !params) {
      reject('Guest ID and body are required!')
    }

    params.accepted = false

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'PATCH',
      url: `${process.env.VUE_APP_API}companion/own-data/${guestId}`,
      async: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        resolve(JSON.parse(data).data.guest)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const guestGetsCompanionsById = (guestId) => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!guestId) {
      reject('GuestId param are required!')
    }

    xhr({
      method: 'GET',
      url: `${process.env.VUE_APP_API}companion/${guestId}`,
      async: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((data) => {
        resolve(JSON.parse(data).data.guests)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const guestUpdatesCompanion = (guestId, prev, params, mainGuest) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!guestId || !prev || !params) {
      reject('Guest ID and body are required!')
    }

    if (!prev.fullName || !prev.menu) {
      reject('Previous companion fullName and menu required!')
    }

    params.relative = mainGuest.relative
    params.weddingId = mainGuest.weddingId
    params.accepted = false
    params.assistance = mainGuest.assistance
    params.tags = mainGuest.tags

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'PATCH',
      url: `${process.env.VUE_APP_API}companion/${guestId}/${prev.fullName}/${prev.menu}`,
      async: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        resolve(JSON.parse(data).data.guest)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const guestDeletesCompanion = (guestId, prev) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!guestId || !prev) {
      reject('Guest ID and body are required!')
    }

    if (!prev.fullName || !prev.menu) {
      reject('Previous companion fullName and menu required!')
    }

    // Request
    xhr({
      method: 'DELETE',
      url: `${process.env.VUE_APP_API}companion/${guestId}/${prev.fullName}/${prev.menu}`,
      async: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
