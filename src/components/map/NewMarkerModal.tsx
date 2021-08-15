import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import Title from "antd/lib/typography/Title";
import { LatLngLiteral } from "leaflet";
import React, { useRef, useState } from "react";
import { Marker } from "../../types";
import { useCreateMarker } from "../api/markers";

type Props = {
  show: boolean;
  toggle: () => void;
  selectedLocation: LatLngLiteral;
};

export const NewMarkerModal = ({ show, toggle, selectedLocation }: Props) => {
  const { mutate: createMarker } = useCreateMarker();
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onOk = () => {
    if (!description.length)
      return setError("* La description ne peut pas être laissée vide");
    const newMarker: Omit<Marker, "id"> = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      description,
    };
    createMarker(newMarker);
    toggle();
  };

  return (
    <Modal
      title="Ajouter un marqueur à cet emplacement ?"
      visible={show}
      onOk={onOk}
      onCancel={toggle}
    >
      <Title level={5}>Quel est la description de ce marqueur ?</Title>
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
