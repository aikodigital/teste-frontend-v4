<template>
  <div style="height: 90vh; width: 90vw">
    <l-map
      v-if="ready"
      id="map"
      ref="myMap"
      :zoom="zoom"
      :center="center"
      @update:center="centerUpdated"
      @update:zoom="zoomUpdated"
    >
      <!-- @click="handleMapClick" -->
      <l-tile-layer
        :url="url"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <!-- <l-marker :lat-lng="markerLatLng">
        <l-popup>
          {{ "New Marker: " + markerLatLng }}<br />
          {{ "Center: " + center }}
        </l-popup>
      </l-marker> -->
      <!-- <l-marker
        v-for="(picole, index) in picoleLatLng"
        :key="index"
        :lat-lng="[picole.lat, picole.log]"
        :icon="icon"
      >
        <l-popup>
          {{ picole.info }}
        </l-popup>
      </l-marker> -->
      <l-marker
        v-for="(equip, index) in equipmentsLatLng"
        :key="index"
        :lat-lng="[equip.lat, equip.log]"
        :icon="setStateIcon(equip)"
      >
        <l-popup>
          <div class="q-py-xs q-gutter-y-sm" style="text-align-last: center">
            <div>{{ equip.info }} - {{ equip.state }}</div>
            <div>
              <q-btn
                style="inline-size: max-content"
                class="bg-indigo-10 text-white"
                icon="info_outline"
                label="Detalhes"
                size="sm"
                @click="getEquipDetails(equip)"
              />
            </div>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      style="z-index: 1000"
    >
      <q-btn fab icon="center_focus_strong" color="primary" @click="getLoc" />
    </q-page-sticky>
  </div>
  <q-dialog v-model="equipDialog" persistent>
    <q-card class="card q-pa-md" style="width: 500px; min-height: 460px">
      <q-card-section>
        <div class="text-h6">
          <q-icon
            class="q-pr-sm"
            name="fa-solid fa-screwdriver-wrench"
            size="md"
          />
          Detalhes do equipamento
        </div>
      </q-card-section>
      <q-card-section
        class="row q-pt-none q-px-md q-pb-md items-center"
        style="display: inline-flex"
      >
        <!-- {{ equipamentoDetalhes }} -->
        <q-tabs v-model="tabEquip" align="justify" class="text-indigo-10">
          <q-tab name="informacoes" label="Informações" />
          <q-tab name="historico" label="Histórico" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tabEquip" animated class="full-width">
          <q-tab-panel name="informacoes" style="height: 30vh">
            <div class="q-gutter-y-md row items-start">
              <div class="col-md-6">
                <div class="text-subtitle1 text-weight-medium">Nome</div>
                {{ equipamentoDetalhes.nomeEquipamento }}
              </div>
              <div class="col-md-6">
                <div class="text-subtitle1 text-weight-medium">Modelo</div>
                {{ equipamentoDetalhes.modeloEquipamento.name }}
              </div>
              <div class="col-md-6">
                <div class="text-subtitle1 text-weight-medium">Estado</div>
                <i
                  :class="setStateIconModal(estadoEquipamentoSelecionado)"
                  class="fa-solid fa-circle-exclamation fa-fade"
                ></i>
                {{ estadoEquipamentoSelecionado }}
              </div>
              <div class="col-md-6">
                <div class="text-subtitle1 text-weight-medium">
                  Útima Atualização
                </div>
                {{ ultimaAtualizacaoEquipamentoSelecionado }}
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="historico" style="height: 30vh">
            <q-list bordered separator>
              <q-item
                v-for="(
                  history, index
                ) in equipamentoDetalhes.historicoEquipamento"
                :key="index"
              >
                <q-item-section>
                  <div class="text-md">
                    Data:
                    {{
                      utils.formatarData(history.date, "DD/MM/YYYY HH:MM:SS")
                    }}
                  </div>
                  <div class="q-mt-sm text-md">
                    Estado: {{ history.stateName }}
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Fechar" color="indigo-10" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import utils from "../boot/utils";
import { storeToRefs } from "pinia";
import { useEquipamentoStore } from "../stores/equipamento.store";
import StatusEquipamentos from "../data/equipmentState.json";

const { equipamentos, equipamentoDetalhes } = storeToRefs(
  useEquipamentoStore()
);
const { getEquipamentos, getEquipamentoDetalhes } = useEquipamentoStore();

const latitude = ref("");
const longitude = ref("");
const url = ref("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
const zoom = ref(11);
const center = ref([]);
const markerLatLng = ref([]);
// const picoleLatLng = ref([]);
const equipmentsLatLng = ref([]);
const ready = ref(false);
const equipDialog = ref(false);
const tabEquip = ref("informacoes");
const estadoEquipamentoSelecionado = ref("");
const ultimaAtualizacaoEquipamentoSelecionado = ref("");

const icon = ref(
  L.icon({
    iconUrl: "/img/excavator.png",
    iconSize: [50, 50],
    iconAnchor: [16, 37],
  })
);

const iconGreen = ref(
  L.icon({
    iconUrl: "/img/excavator_green.png",
    iconSize: [50, 50],
    iconAnchor: [16, 37],
  })
);

const iconYellow = ref(
  L.icon({
    iconUrl: "/img/excavator_yellow.png",
    iconSize: [50, 50],
    iconAnchor: [16, 37],
  })
);

const iconRed = ref(
  L.icon({
    iconUrl: "/img/excavator_red.png",
    iconSize: [50, 50],
    iconAnchor: [16, 37],
  })
);

onMounted(() => {
  getEquipamentos();
  getSpecificGeolocation();
});

const centerUpdated = (ct) => {
  if (center.value.lat !== ct.lat && center.value.lng !== ct.lng) {
    center.value = ct;
  }
};

const zoomUpdated = (zm) => {
  if (zoom.value !== zm) {
    zoom.value = zm;
  }
};

// const getSpecificGeolocation = async () => {
//   debugger;
//   utils.showLoadingWithMessage("Centralizando mapa...");
//   const dadosLatLong = await utils.buscaLatLong();
//   if (dadosLatLong.length > 0) {
//     latitude.value = parseFloat(dadosLatLong[0].lat);
//     longitude.value = parseFloat(dadosLatLong[0].lon);
//     const position = {
//       latitude: parseFloat(dadosLatLong[0].lat),
//       longitude: parseFloat(dadosLatLong[0].lon),
//     };
//     setPosition(position);
//     // getCurrentGeolocation()
//   } else {
//     errorPosition();
//   }
// };

const setStateIcon = (equip) => {
  let choosedIcon = icon.value;

  console.log(equip);

  if (equip.state === "Operando") {
    choosedIcon = iconGreen.value;
  } else if (equip.state === "Parado") {
    choosedIcon = iconYellow.value;
  } else if (equip.state === "Manutenção") {
    choosedIcon = iconRed.value;
  }

  return choosedIcon;
};

const setStateIconModal = (equip) => {
  let choosedIcon = "text-gray";

  console.log(equip);

  if (equip === "Operando") {
    choosedIcon = "text-green-aiko";
  } else if (equip === "Parado") {
    choosedIcon = "text-yellow-aiko";
  } else if (equip === "Manutenção") {
    choosedIcon = "text-red-aiko";
  }

  return choosedIcon;
};

const setEquipPositions = () => {
  const positions = equipamentos.value.map((arr) => {
    const lastPosition =
      arr.posicoesEquipamento[arr.posicoesEquipamento.length - 1];
    return {
      date: lastPosition.date,
      lat: lastPosition.lat,
      log: lastPosition.lon,
      info: arr.nomeEquipamento,
      id: arr.idEquipamento,
      state: arr.historicoEquipamento[0].stateName,
    };
  });

  equipmentsLatLng.value = positions;
};

const getEquipDetails = (equip) => {
  estadoEquipamentoSelecionado.value = equip.state;
  ultimaAtualizacaoEquipamentoSelecionado.value = utils.formatarData(
    equip.date,
    "DD/MM/YYYY HH:MM:SS"
  );
  getEquipamentoDetalhes(equip.id);
  equipDialog.value = true;
  tabEquip.value = "informacoes";
};

const getSpecificGeolocation = async () => {
  utils.showLoadingWithMessage("Centralizando mapa...");
  // const dadosLatLong = await utils.buscaLatLong();
  setEquipPositions();
  if (equipmentsLatLng.value.length > 0) {
    latitude.value = parseFloat(equipmentsLatLng.value[0].lat);
    longitude.value = parseFloat(equipmentsLatLng.value[0].log);
    const position = {
      latitude: parseFloat(equipmentsLatLng.value[0].lat),
      longitude: parseFloat(equipmentsLatLng.value[0].log),
    };
    setPosition(position);
    // getCurrentGeolocation()
  } else {
    errorPosition();
  }
};

const getLoc = () => {
  zoom.value = 11;
  utils.showLoadingWithMessage("Centralizando mapa...");
  setTimeout(() => {
    center.value = new L.LatLng(latitude.value, longitude.value + 0.001);
    utils.hideLoading();
  }, 2000);
};

const setPosition = () => {
  center.value = new L.LatLng(latitude.value, longitude.value + 0.001);
  // markerLatLng.value = [latitude.value, longitude.value];
  // picoleLatLng.value = [
  //   {
  //     lat: latitude.value + 0.0005,
  //     log: longitude.value + 0.0005,
  //     info: "Kibom",
  //   },
  //   {
  //     lat: latitude.value + 0.0008,
  //     log: longitude.value + 0.0008,
  //     info: "Nestle",
  //   },
  //   {
  //     lat: latitude.value + -0.0005,
  //     log: longitude.value + -0.0005,
  //     info: "Magnum",
  //   },
  //   {
  //     lat: latitude.value + 0.001,
  //     log: longitude.value + -0.0013,
  //     info: "Limão",
  //   },
  // ];

  ///////

  // const positions = equipamentos.value
  //   .map((arr) => arr.posicoesEquipamento[arr.posicoesEquipamento.length - 1])
  //   .map((pos) => {
  //     return {
  //       lat: pos.lat,
  //       lon: pos.lon,
  //       info: arr.nomeEquipamento,
  //     };
  //   });

  utils.hideLoading();
  utils.mensagemSucesso("Posição recuperada com sucesso!");
  ready.value = true;
};

const errorPosition = () => {
  utils.mensagemErro("Não foi possível recupera sua posição!");
};

const handleMapClick = (event) => {
  const newMarker = [event.latlng.lat, event.latlng.lng];
  latitude.value = newMarker[0];
  longitude.value = newMarker[1];
  zoom.value = 18;
  utils.showLoadingWithMessage("Carregando nova localização...");
  setTimeout(() => {
    center.value = new L.LatLng(newMarker[0], newMarker[1] + 0.001);
    markerLatLng.value = newMarker;
    utils.hideLoading();
  }, 2000);
};
</script>

<style>
.text-green-aiko {
  color: #2ecc71 !important;
}

.text-yellow-aiko {
  color: #f1c40f !important;
}

.text-red-aiko {
  color: #e74c3c !important;
}
</style>
