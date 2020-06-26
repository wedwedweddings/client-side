"use strict";

// Utils
import emojis from "../../utils/emojis";
import menus from "../../utils/menus";
import { tags } from "../../utils/tags";

export const getDescription = (g, lang) => {
  return `${getMenu(g.menu)} | ${emojis.tag} ${getTags(g.tags, lang)}`;
};

export const getMenu = (menu) => {
  let result = emojis.menu.standard;

  Object.keys(menus).forEach((key) => {
    if (key === menu) {
      result = menus[key].emoji;
    }
  });

  return result;
};

export const getTags = (guestTags, lang) => {
  const tagNames = [];
  guestTags = guestTags.split(",");

  guestTags.forEach((element) => {
    tags.map((tag) => {
      if (element === tag.id) {
        tagNames.push(tag.name[lang]);
      }
    });
  });

  return tagNames.join(", ");
};
