export type MarkerCategory = {
  _id: string;
  name: string;
};

export type MarkerCategoryId = string;

export type Marker = {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  category: MarkerCategory | MarkerCategoryId;
};

export type Filter = MarkerCategoryId;
