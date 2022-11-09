import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const HotelsMap = ({ hotel }) => {
  const position = [21.9497, 89.1833];
  return (
    <MapContainer center={position} zoom={9} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotel.map((hotel) => (
        <Marker position={[hotel.latitude, hotel.longitude]}>
          <Popup>
            {hotel.name}, {hotel.cost}/night <br /> {hotel.address}
          </Popup>
        </Marker>
      ))}
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default HotelsMap;
