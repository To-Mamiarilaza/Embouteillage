import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MainMap() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[-18.8792, 47.5079]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={[-18.8792, 47.5079]}>
          <Popup>
            Tu es à Paris 🇫🇷
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MainMap;
