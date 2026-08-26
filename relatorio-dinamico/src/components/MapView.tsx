import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  Polygon,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GEOSERVER_WMS_URL } from "../data/layersData";
import type { MapLayer } from "../data/layersData";
import type { IptuLote } from "../data/iptuData";

interface MapViewProps {
  layers: MapLayer[];
  selectedLote: IptuLote | null;
  allLotes: IptuLote[];
  filteredLotes: IptuLote[];
  onLoteClick: (iptu: string) => void;
  flyKey: number;
}

function FlyToLote({ lote, flyKey }: { lote: IptuLote | null; flyKey: number }) {
  const map = useMap();
  const prevRef = useRef<number>(0);

  useEffect(() => {
    if (lote && flyKey !== prevRef.current) {
      prevRef.current = flyKey;
      map.flyTo(lote.center, 17, { duration: 1 });
    }
  }, [lote, flyKey, map]);

  return null;
}

export default function MapView({
  layers,
  selectedLote,
  allLotes,
  filteredLotes,
  onLoteClick,
  flyKey,
}: MapViewProps) {
  const fortalezaCenter: [number, number] = [-3.7319, -38.5267];
  const filteredIptus = new Set(filteredLotes.map((l) => l.iptu));

  return (
    <MapContainer
      center={fortalezaCenter}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
      zoomControl={false}
      attributionControl={false}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Ortofoto (imagem de satélite)">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Esri"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap (ruas e toponímia)">
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="Nomes de ruas e lugares">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            attribution="Esri Labels"
          />
        </LayersControl.Overlay>
      </LayersControl>

      <ZoomControl position="topright" />

      {/* Render layers */}
      {layers
        .filter((l) => l.visible)
        .map((layer) => (
          <WMSTileLayer
            key={layer.id}
            url={GEOSERVER_WMS_URL}
            layers={layer.wmsLayer}
            format="image/png"
            transparent
            opacity={layer.opacity}
            attribution="GeoServer IDE SEUMA — Prefeitura de Fortaleza"
          />
        ))}

      {/* All lotes */}
      {allLotes.map((lote) => {
        const isSelected = selectedLote?.iptu === lote.iptu;
        const isFiltered = filteredIptus.has(lote.iptu);
        const color = isSelected
          ? "#ff4d4f"
          : isFiltered
          ? "#00e5ff"
          : "#FFFF00";

        return (
          <Polygon
            key={lote.iptu}
            positions={lote.coordinates as [number, number][]}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: isSelected ? 0.5 : isFiltered ? 0.4 : 0.15,
              weight: isSelected ? 3 : isFiltered ? 2.5 : 1,
            }}
            eventHandlers={{
              click: () => onLoteClick(lote.iptu),
            }}
          >
            <Tooltip sticky>
              <strong>IPTU: {lote.iptu}</strong>
              <br />
              {lote.endereco}
              <br />
              Área: {lote.area} m²
              <br />
              Processos: {lote.processos.length}
            </Tooltip>
          </Polygon>
        );
      })}

      <FlyToLote lote={selectedLote} flyKey={flyKey} />
    </MapContainer>
  );
}
