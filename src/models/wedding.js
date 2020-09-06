'use strict'

// Utils
import { joinParamsAsString, setLocalStorageWedding } from '../../utils/utils'
import { xmlhttprequest as xhr } from '../../utils/xmlhttprequest'

export const getUserLastPlanner = () => {
  return new Promise((resolve, reject) => {
    // Request
    xhr({
      method: 'GET',
      url: `${process.env.VUE_APP_API}wedding/last`,
      async: true,
      credentials: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((data) => {
        const wedding = JSON.parse(data).data.wedding
        resolve(setLocalStorageWedding(wedding))
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const add = (params) => {
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!params) {
      reject('Body param required!')
    }

    params.emoji1 = params.emoji1.split('-')[0]
    params.emoji2 = params.emoji2.split('-')[0]
    let body = joinParamsAsString(params)

    // Request
    xhr({
      method: 'POST',
      url: `${process.env.VUE_APP_API}wedding`,
      async: true,
      credentials: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        resolve(JSON.parse(data).data.wedding)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
