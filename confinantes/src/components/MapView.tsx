import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  GeoJSON,
  Polygon,
  Polyline,
  Tooltip,
  useMap,
  ZoomControl,
  CircleMarker,
} from "react-leaflet";
import type { Feature, FeatureCollection } from "geojson";
import type { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { LoteComConfinantes } from "../data/iptuData";

const GEOSERVER_WMS_URL = "https://ubigeodesign.ge21gt.cloud/geoserver/RMs/wms";

interface MapViewProps {
  allLotes: LoteComConfinantes[];
  selectedLote: LoteComConfinantes | null;
  onLoteClick: (iptu: string) => void;
  flyKey: number;
  showEdgeLabels: boolean;
}

function FlyToLote({ lote, flyKey }: { lote: LoteComConfinantes | null; flyKey: number }) {
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

function featureTooltip(p: Record<string, string> | null): string | null {
  if (!p) return null;
  if (p.nome) return `<strong>${p.nome}</strong><br/>Pavimentação: ${p.pavimentac || "-"}`;
  if (p.lote) return `<strong>Lote ${p.lote}</strong><br/>Distrito ${p.distrito} — Quadra ${p.quadra}`;
  if (p.quadra) return `<strong>Quadra ${p.quadra}</strong><br/>Distrito ${p.distrito}`;
  return null;
}

function GeoJsonLayer({ url, color }: { url: string; color: string }) {
  const [data, setData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [url]);

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      style={{ color, weight: 1.5, opacity: 0.9, fillOpacity: 0.08 }}
      onEachFeature={(feature: Feature, lyr: Layer) => {
        const html = featureTooltip(
          feature.properties as Record<string, string> | null
        );
        if (html) lyr.bindTooltip(html, { sticky: true });
      }}
    />
  );
}

export default function MapView({
  allLotes,
  selectedLote,
  onLoteClick,
  flyKey,
  showEdgeLabels,
}: MapViewProps) {
  const fortalezaCenter: [number, number] = [-3.7319, -38.5267];

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
        <LayersControl.Overlay checked name="Quadras (SEFIN)">
          <GeoJsonLayer url="/quadras_sefin.geojson" color="#8c8c8c" />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Lotes (SEFIN)">
          <GeoJsonLayer url="/lotes_sefin.geojson" color="#fadb14" />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Edificações (SEFIN)">
          <WMSTileLayer
            url={GEOSERVER_WMS_URL}
            layers="RMs:Edificacoes_SEFIN"
            format="image/png"
            transparent
            attribution="GeoServer IDE SEUMA — Prefeitura de Fortaleza"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Trechos de Vias (SEFIN)">
          <GeoJsonLayer url="/trechos_sefin.geojson" color="#00bcd4" />
        </LayersControl.Overlay>
      </LayersControl>

      <ZoomControl position="topright" />

      {allLotes.map((lote) => {
        const isSelected = selectedLote?.iptu === lote.iptu;
        return (
          <Polygon
            key={lote.iptu}
            positions={lote.coordinates as [number, number][]}
            pathOptions={{
              color: isSelected ? "#ff4d4f" : "#FFFF00",
              fillColor: isSelected ? "#ff4d4f" : "#FFFF00",
              fillOpacity: isSelected ? 0.5 : 0.25,
              weight: isSelected ? 3 : 1.5,
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
            </Tooltip>
          </Polygon>
        );
      })}

      {selectedLote && showEdgeLabels && (() => {
        const coords = selectedLote.coordinates as [number, number][];
        return coords.map((coord, i) => {
          const next = coords[(i + 1) % coords.length];
          const midLat = (coord[0] + next[0]) / 2;
          const midLon = (coord[1] + next[1]) / 2;
          return (
            <div key={`edge-group-${i}`}>
              <Polyline
                key={`edge-${i}`}
                positions={[coord, next]}
                pathOptions={{
                  color: "#00e5ff",
                  weight: 3,
                  dashArray: "6 4",
                }}
              >
                <Tooltip permanent direction="center" className="edge-label">
                  A{i + 1}
                </Tooltip>
              </Polyline>
              <CircleMarker
                key={`v-${i}`}
                center={coord}
                radius={5}
                pathOptions={{ color: "#fff", fillColor: "#ff4d4f", fillOpacity: 1, weight: 2 }}
              >
                <Tooltip permanent direction="top" offset={[0, -8]}>
                  V{i + 1}
                </Tooltip>
              </CircleMarker>
              <CircleMarker
                key={`mid-${i}`}
                center={[midLat, midLon]}
                radius={3}
                pathOptions={{ color: "#00e5ff", fillColor: "#00e5ff", fillOpacity: 1, weight: 1 }}
              />
            </div>
          );
        });
      })()}

      <FlyToLote lote={selectedLote} flyKey={flyKey} />
    </MapContainer>
  );
}
