'use strict'

// Utils
import { joinParamsAsString } from '../../utils/utils'
import { xmlhttprequest as xhr } from '../../utils/xmlhttprequest'

export const forgotPassword = (params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!params || !params.email) {
      reject('Email required!')
    }

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'POST',
      url: `${process.env.VUE_APP_API}auth/forgot-password`,
      async: true,
      credentials: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const login = (params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!params || !params.email || !params.password) {
      reject('Email and password are required!')
    }

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'POST',
      url: `${process.env.VUE_APP_API}auth/login`,
      async: true,
      credentials: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const register = (params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!params || !params.email || !params.password || !params.confirm) {
      reject('Email, password and confirm are required!')
    }

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'POST',
      url: `${process.env.VUE_APP_API}auth/register`,
      async: true,
      credentials: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const registerWithFacebook = (params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!params || !params.email || !params.facebookId) {
      reject('Email and facebookId required!')
    }

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'POST',
      url: `${process.env.VUE_APP_API}auth/register-with-facebook`,
      async: true,
      credentials: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const resetPassword = (params, resetPasswordToken) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!params || !params.password || !params.confirm) {
      reject('Password and Confirm password are required!')
    }

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'PATCH',
      url: `${process.env.VUE_APP_API}auth/reset-password/${resetPasswordToken}`,
      async: true,
      credentials: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
