import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker as MarkerComponent,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Instructions } from "../Instructions";
import { useMarkers } from "../api/markers";
import { Marker } from "../../types";
import { useToggle } from "react-use";
import { NewMarkerModal } from "./NewMarkerModal";
import { LatLngLiteral } from "leaflet";

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
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [showCreateModal, toggleCreateModal] = useToggle(false);
  const [selectedLocation, setSelectedLocation] =
    useState<LatLngLiteral | null>(null);

  useEffect(() => {
    if (!dbMarkers) return;
    setMarkers(dbMarkers);
  }, [dbMarkers]);

  const displayMarkers = () => {
    return (markers || []).map(({ id, latitude, longitude, description }) => (
      <MarkerComponent key={id} position={{ lat: latitude, lng: longitude }}>
        <Popup>{description}</Popup>
      </MarkerComponent>
    ));
  };

  useMapEvents({
    dblclick: ({ latlng }) => {
      setSelectedLocation(latlng);
      toggleCreateModal();
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
      <NewMarkerModal
        show={showCreateModal}
        toggle={toggleCreateModal}
        selectedLocation={selectedLocation}
      />
    </>
  );
};
