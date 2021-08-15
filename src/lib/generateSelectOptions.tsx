import { sortBy } from "lodash";
import { MarkerCategory } from "../types";

export const generateCategoriesOptions = (
  categories: MarkerCategory[],
  addAll = false
) => {
  if (!categories) return [];
  const cats = addAll
    ? [
        ...categories,
        {
          _id: "1",
          name: "Toutes",
        },
      ]
    : categories;
  return sortBy(cats, "name").map((category) => ({
    key: category._id,
    label: category.name,
    value: category._id,
  }));
};
