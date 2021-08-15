import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker as MarkerComponent,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Instructions } from "./Instructions";
import { useCreateMarker, useMarkers } from "./api/markers";
import { Marker } from "../types";

type Props = {
  latitude: number;
  longitude: number;
};

export const Map = ({ latitude, longitude }: Props) => {
  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={20}
        scrollWheelZoom
        doubleClickZoom={false}
      >
        <ActualMap />
      </MapContainer>
      <Instructions />
    </>
  );
};

const ActualMap = () => {
  const { data: dbMarkers, loading } = useMarkers();
  console.log("🚀 ~ ActualMap ~ dbMarkers", dbMarkers);
  const [markers, setMarkers] = useState<Marker[]>([]);

  const { mutate: createMarker } = useCreateMarker();

  const handleNewMarker = (marker: Omit<Marker, "id">) => createMarker(marker);

  useEffect(() => {
    if (!dbMarkers) return;
    setMarkers(dbMarkers);
  }, [dbMarkers]);

  const displayMarkers = () => {
    return (markers || []).map(({ id, latitude, longitude, content }) => (
      <MarkerComponent key={id} position={{ lat: latitude, lng: longitude }}>
        <Popup>{content}</Popup>
      </MarkerComponent>
    ));
  };

  useMapEvents({
    dblclick: ({ latlng: { lat, lng } }) => {
      handleNewMarker({
        latitude: lat,
        longitude: lng,
        content: `Event ajouté le ${new Date().toLocaleTimeString()}`,
      });
    },
  });

  return (
    <>
      {loading && <p>Chargement des marqueurs...</p>}
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {displayMarkers()}
    </>
  );
};
