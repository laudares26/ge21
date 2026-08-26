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
import type { ZoningArea } from "../data/zoningData";
import type { IptuLote } from "../data/iptuData";

const GEOSERVER_WMS_URL = "https://ubigeodesign.ge21gt.cloud/geoserver/RMs/wms";

interface MapViewProps {
  zoningAreas: ZoningArea[];
  highlightedZones: string[];
  selectedLote: IptuLote | null;
  allLotes: IptuLote[];
  onLoteClick: (iptu: string) => void;
  flyKey: number;
  showAllZones: boolean;
}

function FlyToLote({
  lote,
  flyKey,
}: {
  lote: IptuLote | null;
  flyKey: number;
}) {
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
  zoningAreas,
  highlightedZones,
  selectedLote,
  allLotes,
  onLoteClick,
  flyKey,
  showAllZones,
}: MapViewProps) {
  const fortalezaCenter: [number, number] = [-3.7319, -38.5267];

  const visibleZones = showAllZones
    ? zoningAreas
    : zoningAreas.filter((z) => highlightedZones.includes(z.id));

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
        <LayersControl.Overlay name="Quadras (SEFIN)">
          <WMSTileLayer
            url={GEOSERVER_WMS_URL}
            layers="RMs:Quadras_SEFIN"
            format="image/png"
            transparent
            attribution="GeoServer IDE SEUMA — Prefeitura de Fortaleza"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Lotes (SEFIN)">
          <WMSTileLayer
            url={GEOSERVER_WMS_URL}
            layers="RMs:Lotes_SEFIN"
            format="image/png"
            transparent
            attribution="GeoServer IDE SEUMA — Prefeitura de Fortaleza"
          />
        </LayersControl.Overlay>
      </LayersControl>

      <ZoomControl position="topright" />

      {visibleZones.map((zone) =>
        zone.polygons.map((poly, pi) => (
          <Polygon
            key={`${zone.id}-${pi}`}
            positions={poly}
            pathOptions={{
              color: zone.color,
              fillColor: zone.color,
              fillOpacity: 0.35,
              weight: 2,
              opacity: 0.8,
            }}
          >
            <Tooltip sticky>
              <strong>{zone.nome}</strong>
              <br />
              {zone.descricao}
            </Tooltip>
          </Polygon>
        ))
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
              <br />
              Zoneamento: {lote.zoneamento}
            </Tooltip>
          </Polygon>
        );
      })}

      <FlyToLote lote={selectedLote} flyKey={flyKey} />
    </MapContainer>
  );
}
