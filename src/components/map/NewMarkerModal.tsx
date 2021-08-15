import { Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import Title from "antd/lib/typography/Title";
import { LatLngLiteral } from "leaflet";
import React, { useRef, useState } from "react";
import { generateCategoriesOptions } from "../../lib/generateSelectOptions";
import { Marker, MarkerCategory, MarkerCategoryId } from "../../types";
import { useCreateMarker } from "../api/markers";

type Props = {
  show: boolean;
  toggle: () => void;
  selectedLocation: LatLngLiteral | null;
  categories: MarkerCategory[];
};

export const NewMarkerModal = ({
  show,
  toggle,
  selectedLocation,
  categories,
}: Props) => {
  const { mutate: saveMarker } = useCreateMarker();
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<MarkerCategoryId | null>();
  const [error, setError] = useState<string | null>(null);

  if (!selectedLocation) return null;

  const resetFields = () => {
    setDescription("");
    setSelectedCategory(null);
  };

  const handleClose = () => {
    resetFields();
    toggle();
  };

  const onOk = () => {
    if (!selectedCategory)
      return setError("* Veuillez sélectionner au minimum une catégorie");
    if (!description.length)
      return setError("* La description ne peut pas être laissée vide");
    const newMarker: Omit<Marker, "id"> = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      description,
      category: selectedCategory,
    };
    saveMarker(newMarker);
    resetFields();
    toggle();
  };

  return (
    <Modal
      title="Ajouter un marqueur à cet emplacement ?"
      visible={show}
      onOk={onOk}
      onCancel={handleClose}
    >
      <Title level={5}>Catégories</Title>
      <Select
        allowClear
        style={{ width: "100%", marginBottom: "30px" }}
        placeholder="Veuillez sélectionner une catégorie"
        onChange={(categoryId) => setSelectedCategory(categoryId as any)}
        options={generateCategoriesOptions(categories)}
      />
      <Title level={5}>Description</Title>
      <TextArea
        rows={4}
        placeholder="Exemple: Donne lecons de flûte"
        onChange={({ target: { value } }) => setDescription(value)}
        value={description}
      />

      {error && <p style={{ color: "red", textAlign: "right" }}>{error}</p>}
    </Modal>
  );
};
