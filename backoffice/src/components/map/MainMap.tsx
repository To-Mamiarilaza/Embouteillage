import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import OrsApiService from "../../services/OrsApiService";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const start: LatLngTuple = [-18.99875, 47.53606];
const end: LatLngTuple = [-18.91022, 47.52759];

function ClickHandler({ onMapClick }: { onMapClick: (latlng: LatLngTuple) => void }) {
  useMapEvents({
    click(e) {
      const newLatLng: LatLngTuple = [e.latlng.lat, e.latlng.lng];
      onMapClick(newLatLng);
    },
  });
  return null;
}

function MainMap() {

  const [markerPosition, setMarkerPosition] = useState<LatLngTuple>([-18.8792, 47.5079]);
  const [routeCoords, setRouteCoords] = useState<LatLngTuple[]>([]);

  useEffect(() => {

    const fetchRoute = async () => {
      const data = await OrsApiService.direction(start, end);
      
      const coords = data.data.features[0].geometry.coordinates.map(
        (coord: number[]) => [coord[1], coord[0]] as LatLngTuple
      );
      setRouteCoords(coords);
    };

    fetchRoute();
  }, []);

  const handleMapClick = (latlng: LatLngTuple) => {
    setMarkerPosition(latlng);
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={markerPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
        />

        <ClickHandler onMapClick={handleMapClick} />

        <Marker position={markerPosition}>
          <Popup>
            Latitude : {markerPosition[0].toFixed(5)} <br/>
            Longitude : {markerPosition[1].toFixed(5)}
          </Popup>
        </Marker>

        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} pathOptions={{ color: "#28a745", weight: 5 }} />
        )}
      </MapContainer>
    </div>
  );
}

export default MainMap;
