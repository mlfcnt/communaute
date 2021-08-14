import React, { useState } from "react";
import { LocationPicker } from "./components/LocationPicker";
import "./App.css";

import { Map } from "./components/Map";

function App() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  return (
    <>
      <h1 className="title">Communauté</h1>
      <LocationPicker setLat={setLat} setLng={setLng} />
      {lat && lng && <Map lat={lat} lng={lng} />}
    </>
  );
}

export default App;
