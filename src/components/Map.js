import React, { useEffect, useState } from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "./mapStyles";
import { getUsersFromApi } from "../services/UserServices";

const Map = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await getUsersFromApi();
        setMarkers(response.data);
      } catch (error) {
        console.log("Can get trees");
      }
    };
    getCoordinates();
  }, []);

  const libraries = ["places"];
  const center = { lat: 25.76585949266363, lng: -80.19816792343089 };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
      options={options}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.uid}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          icon={{
            url: "/map-marker.svg",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
