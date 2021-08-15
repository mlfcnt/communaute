import React, { useState } from "react";
import { LocationPicker } from "./components/LocationPicker";
import "antd/dist/antd.css";
import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";

import { Map } from "./components/map/Map";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout className="main-layout">
        <Header className="header">
          Communauté - Plateforme d'entraide entre voisins
        </Header>

        <Content className="content">
          <LocationPicker setLat={setLat} setLng={setLng} />
          {lat && lng ? (
            <Map latitude={lat} longitude={lng} />
          ) : (
            "La carte s'affichera une fois que vous serez localisé"
          )}
        </Content>
        <Footer className="footer">TMN / AHN</Footer>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
