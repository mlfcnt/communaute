import React, { useState } from "react";
import { LocationPicker } from "./components/LocationPicker";
import "antd/dist/antd.css";
import "./App.css";

import { Map } from "./components/Map";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";

function App() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  return (
    <Layout className="main-layout">
      <Header className="header">
        Communauté - Plateforme d'entre aide entre voisins
      </Header>
      <Content className="content">
        <LocationPicker setLat={setLat} setLng={setLng} />
        {lat && lng ? (
          <Map lat={lat} lng={lng} />
        ) : (
          "La carte s'affichera une fois que vous serez localisé"
        )}
      </Content>
      <Footer className="footer">TMN</Footer>
    </Layout>
  );
}

export default App;
