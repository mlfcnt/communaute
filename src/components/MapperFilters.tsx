import { Select } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { generateCategoriesOptions } from "../lib/generateSelectOptions";
import { Filter, MarkerCategory, MarkerCategoryId } from "../types";
import { useMarkersCategories } from "./api/markers";

type Props = {
  setFilter: Dispatch<SetStateAction<Filter | null>>;
};

export const MapperFilters = ({ setFilter }: Props) => {
  const { data: categories } = useMarkersCategories();
  const handleChange = (categoryId: MarkerCategoryId) => {
    categoryId === "1" ? setFilter(null) : setFilter(categoryId);
  };
  return (
    <>
      <p>Filter par catégorie</p>
      <Select
        allowClear
        style={{ width: "100%", marginBottom: "30px" }}
        placeholder="Veuillez sélectionner une catégorie"
        onChange={handleChange}
        options={generateCategoriesOptions(categories, true)}
      />
    </>
  );
};
