'use strict'

// Utils
import { joinParamsAsString } from '../../utils/utils'
import { xmlhttprequest as xhr } from '../../utils/xmlhttprequest'

/**
 * ✔️ Actions by logged in users
 */
export const getAllInWedding = () => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!localStorage.weddingId) {
      reject('Wedding ID in localStorage not found!')
    }

    xhr({
      method: 'GET',
      url: `${process.env.VUE_APP_API}guest/all-in-wedding/${localStorage.weddingId}`,
      async: true,
      credentials: true,
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

export const getOneInWedding = (guestId) => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!localStorage.weddingId || !guestId) {
      reject('Wedding ID in localStorage and guestId param are required!')
    }

    xhr({
      method: 'GET',
      url: `${process.env.VUE_APP_API}guest/one-in-wedding/${localStorage.weddingId}/${guestId}`,
      async: true,
      credentials: true,
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

export const add = (params) => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!params || !localStorage.weddingId) {
      reject('Wedding ID in localStorage not found!')
    }

    params.weddingId = localStorage.weddingId
    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'POST',
      url: `${process.env.VUE_APP_API}guest`,
      async: true,
      credentials: true,
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

export const updateById = (guestId, params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!guestId || !params) {
      reject('Guest ID and body are required!')
    }

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'PATCH',
      url: `${process.env.VUE_APP_API}guest/${guestId}`,
      async: true,
      credentials: true,
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

export const deleteById = (guestId) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!guestId) {
      reject('Guest ID required!')
    }

    // Request
    xhr({
      method: 'DELETE',
      url: `${process.env.VUE_APP_API}guest/${guestId}`,
      async: true,
      credentials: true,
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
      url: `${process.env.VUE_APP_API}guest/own-data/${guestId}`,
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
      url: `${process.env.VUE_APP_API}guest/own-data/${guestId}`,
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
      url: `${process.env.VUE_APP_API}guest/companion/${guestId}`,
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
