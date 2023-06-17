import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import "leaflet/dist/leaflet.css";
import "./styles.css";
import Routing from "./Routing";
import { isNil } from "ramda";

const Home = () => {
  const [currentCarPosition, setCurrentCarPosition] = useState([43.30147, -2.013712]);
  const [ws, setWs] = useState();

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:8000/wsmap");
    newWs.onopen = () => newWs.send("mycar");
    newWs.onmessage = (e) => {
      if (!isNil(e?.data)) {
        setCurrentCarPosition(JSON.parse(e.data));
      }
    };
    newWs.onerror = (e) => console.log("[error] ", e);
    newWs.onclose = (e) => {
      if (e.wasClean) {
        console.log(`[close] Connection cleaned an closed, code=${e.code} reason=${e.reason}`);
      } else {
        console.log("[close] Connection is down");
      }
    };
    setWs(newWs);
    return () => {
      ws?.close(1000, "Work complete");
    };
  }, []);

  const markers = [
    {
      geocode: [43.30178227792329, -2.0229350002488355],
      popUp: "Here is my home",
    },
    {
      geocode: [43.303961181712666, -2.0219972964923816],
      popUp: "Here is my new job",
    },
  ];

  const customIcon = new Icon({
    //iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png", // From https://www.flaticon.com/free-icons/maps-and-location
    iconUrl: require("../../img/marker/marker-icon.png"),
    iconSize: [30, 30],
  });

  const customUpCarIcon = new Icon({
    iconUrl: require("../../img/marker/marker-car-icon.png"),
    iconSize: [38, 38],
  });

  // const createCustomClusterIcon = (cluster) => {
  //   return new divIcon({
  //     html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
  //     iconSize: point(33, 33, true),
  //     className: "custom-marker-cluster",
  //   });
  // };

  return (
    <MapContainer center={[43.30758, -1.985486]} zoom={14}>
      {/* Others map providers can by obtained from : https://leaflet-extras.github.io/leaflet-providers/preview/ */}

      {/* OPEN STREEN MAPS TILES */}
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}

      {/* GOOGLE MAPS TILES */}
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        // url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      {
        // ******* For customizing the marker cluster group ********
        // <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
        //   {markers.map((marker, index) => (
        //     <Marker key={`marker-${index}`} position={marker.geocode} icon={customIcon}>
        //       <Popup>
        //         <h3>{marker.popUp}</h3>
        //       </Popup>
        //     </Marker>
        //   ))}
        // </MarkerClusterGroup>
      }
      <MarkerClusterGroup>
        {markers.map((marker, index) => (
          <Marker key={`marker-${index}`} position={marker.geocode} icon={customIcon}>
            <Popup>
              <h3>{marker.popUp}</h3>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      <Marker position={currentCarPosition} icon={customUpCarIcon}>
        <Popup>
          <h3>{"I'm a car"}</h3>
        </Popup>
      </Marker>

      <Routing />
    </MapContainer>
  );
};

export default Home;
