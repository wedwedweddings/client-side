"use strict";

// Utils
import { joinParamsAsString } from "../../utils/utils";
import { xmlhttprequest as xhr } from "../../utils/xmlhttprequest";

/**
 * ✔️ Actions by logged in users
 */

export const getByGuestId = (guestId) => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!guestId) {
      reject("Guest ID required!");
    }

    xhr({
      method: "GET",
      url: `${process.env.VUE_APP_API}song/by-guest-id/${guestId}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => {
        resolve(JSON.parse(data).data.song);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllInWedding = () => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!localStorage.weddingId) {
      reject("Wedding ID in localStorage not found!");
    }

    xhr({
      method: "GET",
      url: `${process.env.VUE_APP_API}song/all-in-wedding/${localStorage.weddingId}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => {
        resolve(JSON.parse(data).data.songs);
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

    params.guestId = "couple";
    params.weddingId = localStorage.weddingId;

    let body = joinParamsAsString(params);

    // Request
    xhr({
      method: "POST",
      url: `${process.env.VUE_APP_API}song`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body,
    })
      .then((data) => {
        resolve(JSON.parse(data).data.song);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateById = (songId, params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!songId || !params) {
      reject("Song ID and params are required!");
    }

    let body = joinParamsAsString(params);

    // Request
    xhr({
      method: "PATCH",
      url: `${process.env.VUE_APP_API}song/${songId}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body,
    })
      .then((data) => {
        resolve(JSON.parse(data).data.song);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteById = (id) => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!id) {
      reject("Guest ID required!");
    }

    xhr({
      method: "DELETE",
      url: `${process.env.VUE_APP_API}song/${id}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => {
        resolve(JSON.parse(data));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteByGuestId = (guestId) => {
  // Request
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!guestId) {
      reject("Guest ID required!");
    }

    xhr({
      method: "DELETE",
      url: `${process.env.VUE_APP_API}song/by-guest-id/${guestId}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => {
        resolve(JSON.parse(data));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * ⛔ Actions by NOT logged in users
 */

export const guestGetsSong = (guestId) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!guestId) {
      reject("Guest ID required!");
    }

    // Request
    xhr({
      method: "GET",
      url: `${process.env.VUE_APP_API}song/guest-suggestion/${guestId}`,
      async: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => {
        resolve(JSON.parse(data).data.song);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const guestUpdatesSong = (mainGuest, params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!mainGuest || !params) {
      reject("Guest ID and body are required!");
    }

    params.weddingId = mainGuest.weddingId;
    let body = joinParamsAsString(params);

    // Request
    xhr({
      method: "PATCH",
      url: `${process.env.VUE_APP_API}song/guest-suggestion/${mainGuest._id}`,
      async: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body,
    })
      .then((data) => {
        resolve(JSON.parse(data).data.song);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const guestDeletesSong = (guestId, prev) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!guestId || !prev) {
      reject("Guest ID and body are required!");
    }

    // Request
    xhr({
      method: "DELETE",
      url: `${process.env.VUE_APP_API}song/guest-suggestion/${guestId}`,
      async: true,
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
