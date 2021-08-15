import React, { useState } from "react";
import { LocationPicker } from "./components/LocationPicker";
import "antd/dist/antd.css";
import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";

import { Map } from "./components/map/Map";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { MapperFilters } from "./components/MapperFilters";
import { Filter } from "./types";

function App() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter | null>(null);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout className="main-layout">
        <Header className="header">
          Communauté - Plateforme d'entraide entre voisins
        </Header>

        <Content className="content">
          {(!lat || !lng) && <LocationPicker setLat={setLat} setLng={setLng} />}
          {lat && lng ? (
            <>
              <MapperFilters setFilter={setFilter} />
              <Map latitude={lat} longitude={lng} filter={filter} />
            </>
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
