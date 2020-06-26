"use strict";

// Utils
import { mergeParamsToBody } from "../../utils/utils";
import { xmlhttprequest as xhr } from "../../utils/xmlhttprequest";

export const getInWedding = () => {
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!localStorage.weddingId) {
      reject("Wedding ID in localStorage not found!");
    }

    // Request
    xhr({
      method: "GET",
      url: `${process.env.VUE_APP_API}tables-planner/in-wedding/${localStorage.weddingId}`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => {
        resolve(JSON.parse(data).data.tablesPlanner);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const add = () => {
  return new Promise((resolve, reject) => {
    // Check Wedding Id in local storage
    if (!localStorage.weddingId) {
      reject("Wedding ID in localStorage required!");
    }

    // Request
    xhr({
      method: "POST",
      url: `${process.env.VUE_APP_API}tables-planner`,
      async: true,
      credentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `weddingId=${localStorage.weddingId}`,
    })
      .then((data) => {
        resolve(JSON.parse(data).data.tablesPlanner);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateById = (tablesPlannerId, params) => {
  return new Promise((resolve, reject) => {
    // Check params
    if (!tablesPlannerId || !params) {
      reject("TablesPlanner ID and params are required!");
    }

    let body = mergeParamsToBody(params);

    // Request
    xhr({
      method: "PATCH",
      url: `${process.env.VUE_APP_API}tables-planner/${tablesPlannerId}`,
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
