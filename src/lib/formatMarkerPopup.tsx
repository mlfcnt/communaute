import React from "react";
import { isEmpty } from "lodash";

export const formatMarkerPopup = (
  description: any,
  category: any,
  dicCategories: any
) => {
  if (isEmpty(dicCategories)) return;
  return (
    <div>
      <p>Description : {description}</p>
      <p>Catégories : {dicCategories[category]?.name}</p>
    </div>
  );
};
