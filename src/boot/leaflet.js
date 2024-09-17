/* eslint-disable */
import { createApp } from "vue";
import App from "../App.vue";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LGeoJson,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

createApp(App)
  .component("l-map", LMap)
  .component("l-tile-layer", LTileLayer)
  .component("l-marker", LMarker)
  .component("l-popup", LPopup)
  .component("l-geo-json", LGeoJson);

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
