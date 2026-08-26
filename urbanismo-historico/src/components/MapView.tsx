import { MapContainer, TileLayer, WMSTileLayer, LayersControl, Polygon, Tooltip, useMap } from 'react-leaflet';
import type { BemPatrimonial } from '../data/patrimonioData';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const GEOSERVER_WMS_URL = 'https://ubigeodesign.ge21gt.cloud/geoserver/RMs/wms';

interface MapViewProps {
  bens: BemPatrimonial[];
  selectedBem: BemPatrimonial | null;
  onSelectBem: (bem: BemPatrimonial) => void;
  flyKey: number;
}

function FlyToSelected({ bem, flyKey }: { bem: BemPatrimonial | null; flyKey: number }) {
  const map = useMap();
  useEffect(() => {
    if (bem) {
      map.flyTo(bem.center, 17, { duration: 1.2 });
    }
  }, [bem, flyKey, map]);
  return null;
}

export default function MapView({ bens, selectedBem, onSelectBem, flyKey }: MapViewProps) {
  return (
    <MapContainer center={[-3.7319, -38.5267]} zoom={14} style={{ width: '100%', height: '100%' }} zoomControl={true}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Ortofoto (imagem de satélite)">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
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
        <LayersControl.Overlay name="Bens Arqueológicos (Fortaleza)">
          <WMSTileLayer
            url={GEOSERVER_WMS_URL}
            layers="RMs:Bens_Arqueologicos_Imoveis_Moveis_FOR"
            format="image/png"
            transparent
            attribution="GeoServer IDE SEUMA — Prefeitura de Fortaleza"
          />
        </LayersControl.Overlay>
      </LayersControl>
      {bens.map((bem) => (
        <Polygon
          key={bem.id}
          positions={bem.coordinates}
          pathOptions={{
            color: selectedBem?.id === bem.id ? '#ff4d4f' : '#52c41a',
            weight: selectedBem?.id === bem.id ? 3 : 2,
            fillColor: selectedBem?.id === bem.id ? '#ff4d4f' : '#52c41a',
            fillOpacity: selectedBem?.id === bem.id ? 0.4 : 0.25,
          }}
          eventHandlers={{ click: () => onSelectBem(bem) }}
        >
          <Tooltip>{bem.nome} — {bem.status}</Tooltip>
        </Polygon>
      ))}
      <FlyToSelected bem={selectedBem} flyKey={flyKey} />
    </MapContainer>
  );
}
