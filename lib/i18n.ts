import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      menu: {
        title: "Our Culinary Menu",
        searchPlaceholder: "Search Item By Name, Price Or Description...",
        gridView: "Grid View",
        listView: "List View",
        filterTitle: "Filter Menu",
        clearFilters: "Clear All",
        filterLabel: "Filters",
        priceRange: "Price Range (FCFA)",
        maxPriceLabel: "Max Price: ",
        dietaryLabel: "Dietary & Category Tags",
        vegan: "Vegan",
        vegetarian: "Vegetarian",
        glutenFree: "Gluten-Free",
        seafood: "Seafood",
        cameroonianClassics: "Cameroonian Classics",
        noItems: "No menu items match your search filters.",
        loading: "Loading delicacies...",
        suggestionHeader: "Suggestions",
      },
    },
  },
  fr: {
    translation: {
      menu: {
        title: "Notre Menu Culinaire",
        searchPlaceholder: "Rechercher par nom, prix ou description...",
        gridView: "Vue Grille",
        listView: "Vue Liste",
        filterTitle: "Filtrer le Menu",
        clearFilters: "Effacer tout",
        filterLabel: "Filtres",
        priceRange: "Tranche de Prix (FCFA)",
        maxPriceLabel: "Prix Max: ",
        dietaryLabel: "Régimes & Catégories",
        vegan: "Végétalien",
        vegetarian: "Végétarien",
        glutenFree: "Sans Gluten",
        seafood: "Fruits de Mer",
        cameroonianClassics: "Classiques Camerounais",
        noItems: "Aucun plat ne correspond à vos filtres.",
        loading: "Chargement des délices...",
        suggestionHeader: "Suggestions",
      },
    },
  },
};

// Initialize i18n only if it hasn't been initialized yet
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: "en",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
