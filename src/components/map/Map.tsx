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
import { useMarkers, useMarkersCategories } from "../api/markers";
import { Filter, Marker, MarkerCategory } from "../../types";
import { useToggle } from "react-use";
import { NewMarkerModal } from "./NewMarkerModal";
import { LatLngLiteral } from "leaflet";
import { formatMarkerPopup } from "../../lib/formatMarkerPopup";
import { filter, keyBy } from "lodash";

type Props = {
  latitude: number;
  longitude: number;
  filter: Filter | null;
};

export const Map = ({ latitude, longitude, filter }: Props) => {
  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={20}
        scrollWheelZoom
        doubleClickZoom={false}
      >
        <ActualMap filter={filter} />
      </MapContainer>
      <Instructions />
    </>
  );
};

const ActualMap = ({ filter }: { filter: Filter | null }) => {
  const { data: dbMarkers, loading: loadingMarkers } = useMarkers();
  console.log("🚀 ~ ActualMap ~ dbMarkers", dbMarkers);
  const { data: dbMarkersCategories, loading: loadingCategories } =
    useMarkersCategories();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [showCreateModal, toggleCreateModal] = useToggle(false);
  const [selectedLocation, setSelectedLocation] =
    useState<LatLngLiteral | null>(null);

  useEffect(() => {
    if (!dbMarkers) return;
    setMarkers(dbMarkers);
  }, [dbMarkers]);

  const displayMarkers = () => {
    const dicCategories = keyBy(dbMarkersCategories, "_id");
    const filteredMarkers = filter
      ? markers.filter((marker) => marker.category === filter)
      : markers;

    return (filteredMarkers || []).map(
      ({ id, latitude, longitude, description, category }) => (
        <MarkerComponent key={id} position={{ lat: latitude, lng: longitude }}>
          <Popup>
            {formatMarkerPopup(description, category, dicCategories)}
          </Popup>
        </MarkerComponent>
      )
    );
  };

  useMapEvents({
    dblclick: ({ latlng }) => {
      setSelectedLocation(latlng);
      toggleCreateModal();
    },
  });

  const isLoading = loadingMarkers || loadingCategories;

  return (
    <>
      {isLoading && <p>Chargement des marqueurs...</p>}
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {displayMarkers()}
      <NewMarkerModal
        show={showCreateModal}
        toggle={toggleCreateModal}
        selectedLocation={selectedLocation}
        categories={dbMarkersCategories}
      />
    </>
  );
};
