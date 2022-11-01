import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const PLaceMap = ({lat, long, name}) => {
  console.log(lat, long);
  return (
    <MapContainer center={[lat,  long]} zoom={8} scrollWheelZoom={false}>
      <TileLayer
        attribution=''
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]}>
        <Popup>
          {name}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default PLaceMap;
