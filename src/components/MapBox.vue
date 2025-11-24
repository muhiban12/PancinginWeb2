<template>
  <LMap :zoom="14" :center="[lat, lng]" style="height:300px; width:100%;">
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <LMarker :lat-lng="[lat, lng]">
      <LPopup>
        <h3>{{ title }}</h3>

        <p><strong>Cuaca Saat Ini:</strong></p>
        <ul>
          <li>Suhu: {{ currentWeather.temperature }}°C</li>
          <li>Kelembaban: {{ currentWeather.humidity }}%</li>
          <li>Kondisi: {{ currentWeather.condition }}</li>
        </ul>

        <p><strong>Prakiraan 7 Hari:</strong></p>
        <ul>
          <li v-for="(forecast, index) in forecastWeather" :key="index">
            {{ forecast.date }} - {{ forecast.condition }},
            {{ forecast.temperature }}°C, {{ forecast.humidity }}%
          </li>
        </ul>
      </LPopup>
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
  lat: Number,
  lng: Number,
  title: String,
  currentWeather: Object,
  forecastWeather: Array
}
};
</script>
