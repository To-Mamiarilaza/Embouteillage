import axios from "axios";
import { LatLngTuple } from "leaflet";

const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

const api = axios.create({
    baseURL: "https://api.openrouteservice.org/v2",
    headers: {
        "Content-Type": "application/json",
        "Authorization": ORS_API_KEY,
    }
});

const OrsApiService = {
    direction: (start: LatLngTuple, end: LatLngTuple) => api.post('/directions/driving-car/geojson', { coordinates: [[start[1], start[0]], [end[1], end[0]]] })
};

export default OrsApiService;