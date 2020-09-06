'use strict'

// Utils
import { joinParamsAsString } from '../../utils/utils'
import { xmlhttprequest as xhr } from '../../utils/xmlhttprequest'

export const getCaptchaToken = () => {
  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(() => {
      // Request
      window.grecaptcha
        .execute('6Le5JccZAAAAALLB1M8RS30T-eBuqlekD4IF9WfP', {
          action: 'submit',
        })
        .then((token) => resolve(token))
        .catch((error) => {
          reject(error)
        })
    })
  })
}

export const postTokenToVerify = (token) => {
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!token) {
      reject('Token required to check grecaptcha!')
    }

    const params = {
      'g-recaptcha-response': token,
    }

    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'POST',
      url: `${process.env.VUE_APP_API}auth/check-grecaptcha`,
      async: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        resolve(JSON.parse(data))
      })
      .catch((error) => {
        reject(error)
      })
  })
}
