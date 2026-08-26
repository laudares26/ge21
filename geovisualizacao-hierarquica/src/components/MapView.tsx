import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  GeoJSON,
  Polygon,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";
import type { Feature, FeatureCollection } from "geojson";
import type { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";
import { GEOSERVER_WMS_URL } from "../data/layersData";
import type { MapLayer } from "../data/layersData";
import type { IptuLote } from "../data/iptuData";

interface MapViewProps {
  layers: MapLayer[];
  selectedLote: IptuLote | null;
  allLotes: IptuLote[];
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

function featureTooltip(p: Record<string, string> | null): string | null {
  if (!p) return null;
  if (p.nome) return `<strong>${p.nome}</strong><br/>Pavimentação: ${p.pavimentac || "-"}`;
  if (p.lote) return `<strong>Lote ${p.lote}</strong><br/>Distrito ${p.distrito} — Quadra ${p.quadra}`;
  if (p.quadra) return `<strong>Quadra ${p.quadra}</strong><br/>Distrito ${p.distrito}`;
  return null;
}

function GeoJsonLayer({ layer }: { layer: MapLayer }) {
  const [data, setData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    if (!layer.geojsonUrl) return;
    fetch(layer.geojsonUrl)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [layer.geojsonUrl]);

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      style={{
        color: layer.color,
        weight: 1.5,
        opacity: layer.opacity,
        fillOpacity: layer.opacity * 0.1,
      }}
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
  layers,
  selectedLote,
  allLotes,
  onLoteClick,
  flyKey,
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
      </LayersControl>
      <ZoomControl position="topright" />

      {layers
        .filter((l) => l.visible && l.wmsLayer)
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

      {layers
        .filter((l) => l.visible && l.geojsonUrl)
        .map((layer) => (
          <GeoJsonLayer key={layer.id} layer={layer} />
        ))}

      {allLotes.map((lote) => {
        const isSelected = selectedLote?.iptu === lote.iptu;
        return (
          <Polygon
            key={lote.iptu}
            positions={lote.coordinates as [number, number][]}
            pathOptions={{
              color: isSelected ? "#ff4d4f" : "#FFFF00",
              fillColor: isSelected ? "#ff4d4f" : "#FFFF00",
              fillOpacity: isSelected ? 0.5 : 0.15,
              weight: isSelected ? 3 : 1,
            }}
            eventHandlers={{ click: () => onLoteClick(lote.iptu) }}
          >
            <Tooltip sticky>
              <strong>IPTU: {lote.iptu}</strong>
              <br />
              {lote.endereco}
              <br />
              Área: {lote.area} m² | {lote.zoneamento.zona}
            </Tooltip>
          </Polygon>
        );
      })}

      <FlyToLote lote={selectedLote} flyKey={flyKey} />
    </MapContainer>
  );
}
