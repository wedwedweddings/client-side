"use strict";

// Utils
import emojis from "./emojis";

export const capitalize = (s) => {
  if (typeof s !== "string") {
    return "";
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const diffFields = (older, newer) => {
  const newObj = {};

  Object.keys(newer).forEach((key) => {
    if (older[key] !== newer[key]) {
      newObj[key] = newer[key];
    }
  });

  return newObj;
};

export const mergeParamsToBody = (params) => {
  let body = "";
  let i = 0;

  Object.keys(params).forEach((key) => {
    i++;
    body += `${key}=${params[key]}`;
    body += i < Object.keys(params).length ? "&" : "";
  });

  return body;
};

export const setLocalStorageWedding = (wedding) => {
  // Wedding ID
  localStorage.weddingId = wedding._id;

  // Spouses
  const spouses = {
    one: {
      emoji: emojis.profile[wedding.emoji1],
      fullName: `${wedding.firstName1} ${wedding.lastName1}`,
      id: 1,
    },
    two: {
      emoji: emojis.profile[wedding.emoji2],
      fullName: `${wedding.firstName2} ${wedding.lastName2}`,
      id: 2,
    },
    both: {
      emoji: emojis.profile.both,
      fullName: "Both",
      id: 0,
    },
  };

  localStorage.spouses = JSON.stringify(spouses);
};
