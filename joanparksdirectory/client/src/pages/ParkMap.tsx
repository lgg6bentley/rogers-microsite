import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Park {
  PARK_NAME: string;
  latitude: number;
  longitude: number;
}

export default function ParkMap({ parks }: { parks: Park[] }) {
  return (
    <MapContainer center={[46.5, -80]} zoom={5.5} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {parks
        .filter(
          (park) =>
            typeof park.latitude === 'number' &&
            typeof park.longitude === 'number' &&
            !isNaN(park.latitude) &&
            !isNaN(park.longitude)
        )
        .map((park) => (
          <Marker key={park.PARK_NAME} position={[park.latitude, park.longitude]}>
            <Popup>
              <strong>{park.PARK_NAME}</strong>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}