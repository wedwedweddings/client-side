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
        resolve(JSON.parse(data).data.companions)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const guestUpdatesCompanion = (mainGuest, prev, params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!mainGuest || !prev || !params) {
      reject('Main Guest, previous and new data are required!')
    }

    params.relative = mainGuest.relative
    params.weddingId = mainGuest.weddingId
    params.assistance = mainGuest.assistance
    params.tags = mainGuest.tags

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'PATCH',
      url: `${process.env.VUE_APP_API}companion/${mainGuest._id}/${mainGuest.weddingId}/${prev.fullName}/${prev.menu}`,
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

export const guestDeletesCompanion = (guestId, weddingId, prev) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!guestId || !weddingId || !prev) {
      reject('Guest ID and body are required!')
    }

    if (!prev.fullName || !prev.menu) {
      reject('Previous companion fullName and menu required!')
    }

    // Request
    xhr({
      method: 'DELETE',
      url: `${process.env.VUE_APP_API}companion/${guestId}/${weddingId}/${prev.fullName}/${prev.menu}`,
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
