<template>
    <LMap :zoom="14" :center="[lat, lng]" style="height:300px; width:100%;">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LMarker :lat-lng="[lat, lng]">
        <LPopup>{{ title }}</LPopup>
      </LMarker>
    </LMap>
  </template>
  
  <script>
  import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
  import "leaflet/dist/leaflet.css";
  
  export default {
    name: "MapBox",
    components: { LMap, LTileLayer, LMarker, LPopup },
    props: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      title: { type: String, default: "Lokasi Pemancingan" }
    }
  };
  </script>