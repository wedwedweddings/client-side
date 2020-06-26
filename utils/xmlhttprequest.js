"use strict";

export const xmlhttprequest = (obj) => {
  if (!obj.method || !obj.url) {
    console.error("XmlHttpRequest requires method and url parameters.");
    return;
  }

  if (!obj.async) {
    obj.async = false;
  }

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(obj.method, obj.url, obj.async);

    if (obj.credentials) {
      xhr.withCredentials = obj.credentials;
    }

    if (obj.headers) {
      Object.keys(obj.headers).forEach((key) => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = () => reject(xhr.statusText);

    obj.body ? xhr.send(obj.body) : xhr.send();
  });
};
