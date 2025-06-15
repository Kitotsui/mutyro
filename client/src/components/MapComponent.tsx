import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// CSS e correção dos ícones
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// É crucial que este bloco de configuração dos ícones esteja AQUI,
// junto com o componente que o utiliza.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Tipos necessários
interface Mutirao {
  local: string;
  numeroEComplemento?: string;
}

interface MapProps {
  position: [number, number];
  mutirao: Mutirao;
}

const MapComponent = ({ position, mutirao }: MapProps) => {
  if (!position || position.some((p) => p === 0 || isNaN(p))) {
    return (
      <p style={{ color: "#aaa", marginTop: 8, textAlign: "center" }}>
        Coordenadas inválidas para exibir o mapa.
      </p>
    );
  }

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {mutirao.local}
          {mutirao.numeroEComplemento && (
            <>
              <br />
              {mutirao.numeroEComplemento}
            </>
          )}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
