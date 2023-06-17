import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("../../img/marker/marker-icon.png"),
  iconSize: [30, 30],
});

export default function Routing() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(43.30178227792329, -2.0229350002488355), L.latLng(43.311102, -1.897625)],
      routeWhileDragging: true,
      showAlternatives: true,
      router: new L.Routing.osrmv1({ language: "es", profile: "bike" }), // car, bike or foot
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
