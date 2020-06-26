"use strict";

// Utils
import { mergeParamsToBody } from "../../utils/utils";
import { xmlhttprequest as xhr } from "../../utils/xmlhttprequest";

export const getAllInWedding = () => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!localStorage.weddingId) {
      reject("Wedding ID in localStorage not found!");
    }

    xhr({
      method: "GET",
      url: `${process.env.VUE_APP_API}present/all-in-wedding/${localStorage.weddingId}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => {
        resolve(JSON.parse(data).data.presents);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllByGuestIdInWedding = (guestId) => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!guestId || !localStorage.weddingId) {
      reject("Wedding ID in localStorage and guestId param are required!");
    }

    xhr({
      method: "GET",
      url: `${process.env.VUE_APP_API}present/by-guest-in-wedding/${localStorage.weddingId}/${guestId}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => {
        resolve(JSON.parse(data).data.presents);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const add = (params) => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!params || !localStorage.weddingId) {
      reject("Wedding ID in localStorage and params are required!");
    }

    params.weddingId = localStorage.weddingId;
    let body = mergeParamsToBody(params);

    // Request
    xhr({
      method: "POST",
      url: `${process.env.VUE_APP_API}present`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body,
    })
      .then((data) => {
        resolve(JSON.parse(data).data.present);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateById = (presentId, params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!presentId || !params) {
      reject("Present ID and params are required!");
    }

    let body = mergeParamsToBody(params);

    // Request
    xhr({
      method: "PATCH",
      url: `${process.env.VUE_APP_API}present/${presentId}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body,
    })
      .then((data) => {
        resolve(JSON.parse(data).data.present);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteById = (presentId) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!presentId) {
      reject("Present ID required!");
    }

    // Request
    xhr({
      method: "DELETE",
      url: `${process.env.VUE_APP_API}present/${presentId}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
