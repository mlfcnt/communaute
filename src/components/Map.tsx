import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";

type Props = {
  lat: any;
  lng: any;
};

type Marker = {
  id: number;
  position: LatLngExpression;
  popupContent: string;
};

export const Map = ({ lat, lng }: Props) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={20}
      scrollWheelZoom
      doubleClickZoom={false}
    >
      <ActualMap lat={lat} lng={lng} />
    </MapContainer>
  );
};

const ActualMap = ({ lat, lng }: Props) => {
  const [markers, setMarkers] = useState<Marker[]>([
    {
      id: 1,
      position: { lat, lng },
      popupContent: "Vous êtes ici.",
    },
  ]);

  useMapEvents({
    dblclick: ({ latlng }) => {
      setMarkers([
        ...markers,
        {
          id: new Date().getMilliseconds(),
          position: latlng,
          popupContent: `Event ajouté le ${new Date().toDateString()}`,
        },
      ]);
    },
  });

  const displayMarkers = () =>
    markers.map(({ id, position, popupContent }) => (
      <Marker key={id} position={position}>
        <Popup>{popupContent}</Popup>
      </Marker>
    ));

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {displayMarkers()}
    </>
  );
};
