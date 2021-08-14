import React, { useState } from "react";

type Props = {
  setLat: any;
  setLng: any;
};

export const LocationPicker = ({ setLat, setLng }: Props) => {
  const [status, setStatus] = useState<string | null>(null);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <>
      <button onClick={getLocation}>Me localiser</button>
      <br />
      <input
        type="text"
        placeholder={status || "Entrer mon adresse"}
        readOnly
        title="Pas encore disponible"
        style={{
          cursor: "not-allowed",
          width: "auto",
        }}
      />
    </>
  );
};
