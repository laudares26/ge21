---
name: testing-ide-seuma
description: How to run and test the 9 Vite+React+Leaflet IDE SEUMA apps in the ge21 repo end-to-end in a browser.
---

# Testing IDE SEUMA apps (ge21)

## Running the apps
The repo hosts 9 independent Vite apps, deps installed per directory. Run each on its own port with strictPort to avoid auto-shifting:

```bash
cd /path/to/ge21
p=5173
for d in . portal adequabilidade confinantes geovisualizacao-hierarquica pesquisa-processos relatorio-dinamico urbanismo-historico urbanismo-historico-client; do
  (cd $d && nohup npm run dev -- --port $p --strictPort > /tmp/dev_$p.log 2>&1 &); p=$((p+1))
done
```
Then: root=5173, portal=5174, adequabilidade=5175, confinantes=5176, geoviz-hierarquica=5177, pesquisa-processos=5178, relatorio-dinamico=5179, urbanismo-historico=5180, urbanismo-historico-client=5181. No login needed.

## External services
- GeoServer WMS/WFS: https://ubigeodesign.ge21gt.cloud/geoserver/RMs/wms — check reachability first with a GetCapabilities curl; if unreachable, apps fall back to N/D and WMS tiles won't render (note it explicitly, don't fail silently).
- Basemaps: Esri ArcGIS Online (Ortofoto default) and tile.openstreetmap.org.
- Local GeoJSON (quadras/lotes/trechos_sefin.geojson) lives in each app's public/ — renders even offline.

## Useful test flows
- Root app: IPTU search "0001.001.001" (fictional demo data) → "Relatório" button downloads analise-vizinhanca-<iptu>.pdf to ~/Downloads; open via file:// to verify WFS-based restriction table (values vs "N/D").
- Adequabilidade: type "restaurante" in CNAE box, pick "5611-2/01" → map highlights neutral "Área A–G (demonstrativo)" zones (no ZOM/ZOC/ZOR).
- Leaflet LayersControl is hover-activated (top-right or bottom-right icon); hover then click radio to switch Ortofoto ↔ OpenStreetMap.
- Map GeoJSON tooltips (Lote/Quadra/Distrito) appear after zooming into the yellow quadras area (double-click to zoom).

## Devin Secrets Needed
None — all apps are public, frontend-only demos.
