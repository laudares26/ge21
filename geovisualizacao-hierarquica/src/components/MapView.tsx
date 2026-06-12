import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Esri"
      />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        attribution="Esri Labels"
      />
      <ZoomControl position="topright" />

      {layers
        .filter((l) => l.visible)
        .map((layer) =>
          layer.features.map((feat, fi) => {
            if (layer.type === "polygon") {
              return (
                <Polygon
                  key={`${layer.id}-${fi}`}
                  positions={feat.coordinates}
                  pathOptions={{
                    color: layer.color,
                    fillColor: layer.color,
                    fillOpacity: layer.opacity * 0.4,
                    weight: 2,
                    opacity: layer.opacity,
                  }}
                >
                  {feat.label && <Tooltip sticky>{feat.label}</Tooltip>}
                </Polygon>
              );
            }
            return (
              <Polyline
                key={`${layer.id}-${fi}`}
                positions={feat.coordinates}
                pathOptions={{
                  color: layer.color,
                  weight: 3,
                  opacity: layer.opacity,
                }}
              >
                {feat.label && <Tooltip sticky>{feat.label}</Tooltip>}
              </Polyline>
            );
          })
        )}

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
