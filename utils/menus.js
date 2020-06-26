const emojis = require("./emojis");

module.exports = {
  allergen: {
    name: {
      en: "allergen",
      es: "alérgenos",
    },
    help: {
      en: "Celiac or any other allergy issue.",
      es: "Celíacos o alérgicos de alguna índole.",
    },
    emoji: emojis.menu.allergen,
  },
  children: {
    name: {
      en: "children",
      es: "infantil",
    },
    emoji: emojis.menu.children,
  },
  other: {
    name: {
      en: "other",
      es: "especial",
    },
    help: {
      en: "Contact the marriage to ask what kind of menu you need.",
      es:
        "Contacta con los novios o las novias para indicar qué tipo de menú necesitas.",
    },
    emoji: emojis.menu.other,
  },
  standard: {
    name: {
      en: "standard",
      es: "estándar",
    },
    emoji: emojis.menu.standard,
  },
  vegan: {
    name: {
      en: "vegan",
      es: "vegano",
    },
    emoji: emojis.menu.vegan,
  },
  vegetarian: {
    name: {
      en: "vegetarian",
      es: "vegetariano",
    },
    emoji: emojis.menu.vegetarian,
  },
};
