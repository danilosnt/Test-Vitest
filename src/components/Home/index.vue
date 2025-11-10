<template>
  <div class="h-100 w-100">
    <v-row>
      <v-col cols="12">
        <v-img
          eager
          cover
          class="w-100"
          src="../../assets/img/iniciodapagina.png"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-img eager src="../../assets/img/finaldepáginafundobranco.png">
          <v-carousel
            height="100%"
            show-arrows="hover"
            cycle
            interval="3000"
            hide-delimiters
          >
            <v-carousel-item
              eager
              cover
              src="../../assets/img/carrossel1.png"
            ></v-carousel-item>
            <v-carousel-item
              cover
              eager
              src="../../assets/img/carrossel2.png"
            ></v-carousel-item>
            <v-carousel-item
              eager
              cover
              src="../../assets/img/carrossel3.png"
            ></v-carousel-item>
            <v-carousel-item
              eager
              cover
              src="../../assets/img/carrossel4.png"
            ></v-carousel-item>
            <v-carousel-item
              eager
              cover
              src="../../assets/img/carrossel5.png"
            ></v-carousel-item>
            <v-carousel-item
              eager
              cover
              src="../../assets/img/carrossel6.png"
            ></v-carousel-item>
            <v-carousel-item
              eager
              cover
              src="../../assets/img/carrossel7.png"
            ></v-carousel-item>
          </v-carousel>
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0" cols="12">
        <v-img
          eager
          cover
          class="w-100 h-100"
          src="../../assets/img/horariodefuncionamentofundo.png"
        >
          <v-row class="my-10">
            <v-col class="pr-0 pt-0 pb-0" cols="4">
              <v-img
                cover
                eager
                class="h-100 mt-4 w-100"
                height="2000"
                src="../../assets/img/coringahorario.png"
              >
              </v-img>
            </v-col>
            <v-col class="flex-column pt-0 pl-0 pb-0" cols="8">
              <v-img eager src="../../assets/img/horariotitulo.png" />
              <v-img
                eager
                class="mx-auto"
                src="../../assets/img/horáriosedias.png"
              />
              <v-img
                eager
                class="justify-end"
                src="../../assets/img/duvidastitulo.png"
              />
              <v-img
                eager
                class="justify-end"
                src="../../assets/img/duvidas.png"
              />
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col class="pa-0 d-flex justify-end" cols="2">
        <v-img
          width="220"
          eager
          class="position-arrow-left"
          src="../../assets/img/cantoporquereservar.png"
        />
      </v-col>
      <v-col class="pa-0" cols="8">
        <v-img eager src="../../assets/img/reservatitulo.png" />
        <v-img eager src="../../assets/img/precisareservar_texto.png" />
      </v-col>
      <v-col class="pa-0 d-flex justify-end" cols="2">
        <v-img
          width="220"
          eager
          class="position-arrow-right"
          src="../../assets/img/precisareservarcanto.png"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-img width="100%" src="../../assets/img/sobrenostitulo.png" />
      </v-col>
      <v-col cols="12">
        <v-img eager src="../../assets/img/sobreajoksquadros.png" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-img eager src="../../assets/img/botaoporquevir.png" />
      </v-col>
      <v-col cols="12">
        <v-img eager src="../../assets/img/motivos.png" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-img eager src="../../assets/img/feedback.png" />
      </v-col>
      <v-col cols="12">
        <v-img eager src="../../assets/img/feedbackcliente1.png" />
      </v-col>
      <v-col cols="12">
        <v-img eager src="../../assets/img/feedbackcliente3.png" />
      </v-col>
      <v-col cols="12">
        <v-img eager src="../../assets/img/feedbackcliente2.png" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-img eager cover src="../../assets/img/localizaçãobotao.png" />
      </v-col>
      <v-col cols="12">
        <div id="map">
        </div>
      </v-col>
      <v-col cols="12">
        <v-img eager src="../../assets/img/endereçopromapa.png" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0" cols="12">
        <v-img
          cover
          eager
          class="align-center"
          src="../../assets/img/fundofaçasuareserva.png"
        >
          <v-row justify="center">
            <v-col class="d-flex" cols="12 pt-10 pb-4">
              <v-img
                cover
                class="justify-center"
                eager
                src="../../assets/img/façasuareservatitulo.png"
              />
            </v-col>
            <v-col class="d-flex justify-center" cols="8 pa-0">
              <v-img
                eager
                @click="initReserve(true)"
                class="justify-center reserve-button"
                height="100"
                width="200"
                src="../../assets/img/botao-reserve-aqui-NOVOArtboard-25.png"
              />
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
    <v-dialog
      :model-value="isActive"
      @click:outside="isActive = false"
      max-width="750"
    >
      <FormReserve @init-reserve="initReserve" :isActive="isActive" />
    </v-dialog>
    <v-row>
      <v-col class="pa-0" cols="12">
        <v-img
          class="d-flex align-center"
          cover
          src="../../assets/img/finaldepáginafundobranco.png"
        >
          <v-col
            class="d-flex justify-center appear-item justify-space-evenly"
            cols="12"
          >
            <v-col class="pa-0 my-auto disable-item" cols="3">
              <v-img
                eager
                cover
                src="../../assets/img/finaldepaginaperfiljoks.png"
              />
            </v-col>
            <v-col
              class="my-auto pb-16"
              cols="6"
              sm="3"
              md="3"
              lg="3"
              xl="3"
              xxl="3"
            >
              <v-img
                cover
                width="300"
                eager
                class="margins-end-prahses align-center"
                src="../../assets/img/finaldepaginajokstitulo.png"
              />
              <v-img
                cover
                eager
                class="mt-7 margins-end-prahses"
                width="200"
                src="../../assets/img/finaldepaginanos.png"
              />
              <v-img
                cover
                width="300"
                eager
                class="margins-end-prahses"
                src="../../assets/img/finaldepagianhorário.png"
              />
              <v-img
                width="200"
                cover
                eager
                class="margins-end-prahses"
                src="../../assets/img/finaldepaginafeedback.png"
              />
              <v-img
                width="250"
                eager
                cover
                class="margins-end-prahses"
                src="../../assets/img/finaldepaginalocal.png"
              />
              <div class="disable-instagram-end">
                <v-img
                  cover
                  eager
                  width="300"
                  src="../../assets/img/finaldepaginainsta.png"
                />
              </div>
            </v-col>
            <v-col class="my-auto disable-item" cols="3">
              <v-img
                cover
                eager
                src="../../assets/img/finaldepaginainsta.png"
              />
            </v-col>
          </v-col>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ref } from "vue";
import FormReserve from "@/components/Form-Reserve/Form.vue";
const isActive = ref(false);

const initReserve = (param: boolean) => {
  isActive.value = param;
};

let map: any = null;

const createMap = () => {
  map = L.map("map").setView([-12.990328492281018, -38.45695696113678], 25);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.marker([-12.98995518060895, -38.45681316447221],).addTo(
    map
  );

};


onMounted(() => {
  createMap();
});
onBeforeMount(() => {
  if (map) {
    map.remove;
  }
});
</script>
<style>
@media (max-width: 600px) {
  .disable-item {
    display: none;
  }
  .margins-end-prahses {
    margin-bottom: 3vh;
  }

  .size-init-title {
    margin-top: 18vh;
  }

  #map {
    margin-left: auto;
    margin-right: auto;
    width: 35vh;
    height: 20vh;
  }

  .change-direction {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}

@media (min-width: 600px) {
  .disable-instagram-end {
    display: none;
  }

  #map {
    margin-left: auto;
    margin-right: auto;
    width: 140vh;
    height: 60vh;
  }

  .size-init-title {
    margin-top: 75vh;
  }

  .margins-end-prahses {
    margin-bottom: 6vh;
  }

  .change-direction {
    flex-direction: row;
  }
}

.reserve-button:hover {
  cursor: pointer;
}

.center {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
