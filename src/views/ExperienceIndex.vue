<template>
  <div class="experience-index">
    <!-- <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul> -->
    <section class="page-section" id="services">
      <div class="container-one my-6">
        <div class="text-center">
          <h1 class="section-heading text-uppercase" id="it-is-big">...it's a BIG island.</h1>
          <h3 class="section-subheading" id="section">find experiences by district and category</h3>
        </div>
        <div class="center">
          <div class="row center">
            <div class="col-md-2">
              <div id="district">
                <h2>{{ district }}</h2>
              </div>
            </div>
            <div class="col-md-4">
              <img src="../assets/big-island-regional.png" usemap="#big-isle-map" id="image" />
              <map name="big-isle-map">
                <area
                  target=""
                  id="hamakua"
                  shape="poly"
                  coords="“93,32,116,48,180,70,159,102,153,103,143,121,145,127,138,132,123,180,108,162,88,144,106,125,107,107,111,108,107,102,118,86,112,59,103,60,99,55,101,50,90,46”"
                  @mouseover="hamakuaImage()"
                  @mouseout="hawaiiImage()"
                  v-on:click="filterByHamakua()"
                  alt="hamakua"
                  href="#section"
                />
                <area
                  target=""
                  id="kohala"
                  shape="poly"
                  coords="“53,16,63,15,77,19,86,25,92,32,90,46,101,50,99,55,103,60,112,59,118,86,105,102,108,107,107,111,106,125,88,144,86,132,64,102,51,94,61,80,65,79,66,68,52,47,50,24”"
                  @mouseover="kohalaImage()"
                  @mouseout="hawaiiImage()"
                  v-on:click="filterByKohala()"
                  alt="kohala"
                  href="#section"
                />
                <area
                  target=""
                  id="hilo"
                  shape="poly"
                  coords="“180,70,220,108,220,135,243,140,184,177,170,171,169,180,178,195,151,171,140,168,123,180,138,132,145,127,143,121,153,103,159,102”"
                  @mouseover="hiloImage()"
                  @mouseout="hawaiiImage()"
                  v-on:click="filterByHilo()"
                  alt="hilo"
                  value="hilo"
                  href="#section"
                />
                <area
                  target=""
                  id="puna"
                  shape="poly"
                  coords="“243,140,245,157,278,181,277,191,222,230,189,209,192,204,178,195,169,180,170,171,184,177”"
                  @mouseover="punaImage()"
                  @mouseout="hawaiiImage()"
                  v-on:click="filterByPuna()"
                  alt="puna"
                  href="#section"
                />
                <area
                  target=""
                  id="Kau"
                  shape="poly"
                  coords="“222,230,194,239,185,235,122,274,99,314,48,278,86,249,86,236,110,201,104,199,114,182,123,180,140,168,151,171,178,195,192,204,189,209”"
                  @mouseover="kauImage()"
                  @mouseout="hawaiiImage()"
                  v-on:click="filterByKau()"
                  alt="Kau"
                  href="#section"
                />
                <area
                  target=""
                  id="kona"
                  shape="poly"
                  coords="“51,94,64,102,86,132,88,144,87,158,100,165,114,182,104,199,110,201,86,236,86,249,48,278,55,224,32,155,23,150,19,125,37,109,45,109”"
                  @mouseover="konaImage()"
                  @mouseout="hawaiiImage()"
                  v-on:click="filterByKona()"
                  alt="kona"
                  href="#section"
                />
              </map>
            </div>
            <div class="col-md-4" id="tags">
              <div v-for="tag in tags" :key="tag.id">
                <input type="checkbox" id="toggle" :value="tag" v-model="selectedTags" />
                <label for="tag">{{ tag.name }}</label>
              </div>
            </div>
            <div id="tag-display" class="buttons my-5">
              <h4 v-if="location.length > 0 || selectedTags.length > 0">
                {{ selectedTagName }}
                <span v-if="location.length > 0 && selectedTags.length > 0">in</span>
                {{ location | capitalize }}
              </h4>
              <button class="btn bg-warning" v-if="location || selectedTags.length > 0" v-on:click="clearFilter()">
                Clear Filter
              </button>
            </div>
          </div>
        </div>

        <div class="row">
          <div
            class="col-lg-4 col-sm-6 mb-4"
            v-for="experience in filterBy(filteredByTag, location)"
            v-bind:key="experience.id"
          >
            <!-- Portfolio item 3-->
            <div class="portfolio-item">
              <a
                class="portfolio-link"
                data-bs-toggle="modal"
                href="#portfolioModal3"
                v-on:click="showExperience(experience)"
              >
                <div class="experience-image">
                  <img v-bind:src="experience.image_url" v-bind:alt="experience.name" class="card-img-top" />
                </div>
              </a>
              <div class="portfolio-caption">
                <div class="portfolio-caption-heading my-8 same-row">
                  <h4>{{ experience.name }}</h4>
                  <a
                    class="portfolio-link"
                    data-bs-toggle="modal"
                    href="#portfolioModal3"
                    v-on:click="showExperience(experience)"
                  >
                    <div class="portfolio-hover">
                      <div class="portfolio-hover-content"><i class="fas fa-plus fa-2x float-right"></i></div>
                    </div>
                  </a>
                </div>
                <div class="portfolio-caption-subheading text-muted">{{ experience.location }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- MODAL -->
        <div class="portfolio-modal modal fade" id="portfolioModal3" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="close-modal" data-bs-dismiss="modal">
                <img src="assets/img/close-icon.svg" alt="Close modal" />
              </div>
              <div class="container">
                <div class="row justify-content-center">
                  <div class="modal-body container-one">
                    <!-- Project details-->
                    <h2 class="text-uppercase">{{ currentExperience.name }}</h2>
                    <img
                      class="img-fluid d-block mx-auto my-8"
                      v-bind:src="currentExperience.image_url"
                      v-bind:alt="experience.name"
                    />
                    <div class="TextWrap">
                      <div id="map"></div>
                    </div>
                    <div class="text-muted">
                      <p>
                        <span style="font-weight: bold">Description:</span>
                        {{ currentExperience.description }}
                      </p>
                      <p>
                        <span style="font-weight: bold">Recommended Length of Stay:</span>
                        {{ currentExperience.length }}
                      </p>
                      <p>
                        <span style="font-weight: bold">Important Information:</span>
                        {{ currentExperience.info }}
                      </p>
                    </div>
                    <div class="buttons my-6">
                      <button class="btn btn-warning" v-on:click="createListItem()" data-bs-dismiss="modal">
                        Add Experience to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* global mapboxgl */

import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  data: function () {
    return {
      experiences: [],
      experience: "",
      errors: [],
      currentExperience: {},
      location: "",
      experiencesByLocation: [],
      tags: [],
      selectedTags: [],
      selectedTagName: "",
      search: "",
      district: "",
      kohala: require("../assets/big-island-regional-kohala.png"),
      hamakua: require("../assets/big-island-regional-hamakua.png"),
      hilo: require("../assets/big-island-regional-hilo.png"),
      puna: require("../assets/big-island-regional-puna.png"),
      kau: require("../assets/big-island-regional-kau.png"),
      kona: require("../assets/big-island-regional-kona.png"),
      hawaii: require("../assets/big-island-regional.png"),
    };
  },
  created: function () {
    this.indexExperiences();
    this.indexTags();
  },
  computed: {
    filteredByTag() {
      return this.getByTag(this.experiences, this.selectedTags);
    },
    // searchExperiences() {
    //   return this.experiences.filter((experience) => {
    //     return experience.name.match(this.search);
    //   });
    // },
  },
  methods: {
    indexExperiences: function () {
      axios.get("api/experiences").then((response) => {
        console.log(response.data);
        this.experiences = response.data;
      });
    },
    indexTags: function () {
      axios.get("api/tags").then((response) => {
        this.tags = response.data;
      });
    },
    filterByHilo: function () {
      console.log(document.querySelector("#hilo").id);
      this.location = document.querySelector("#hilo").id;
    },
    filterByHamakua: function () {
      console.log(document.querySelector("#hamakua").id);
      this.location = document.querySelector("#hamakua").id;
    },
    filterByPuna: function () {
      console.log(document.querySelector("#puna").id);
      this.location = document.querySelector("#puna").id;
      console.log(this.location);
    },
    filterByKau: function () {
      console.log(document.querySelector("#Kau").id.substring(0, 2) + "ʻū");
      this.location = document.querySelector("#Kau").id;
    },
    filterByKona: function () {
      console.log(document.querySelector("#kona").id);
      this.location = document.querySelector("#kona").id;
    },
    filterByKohala: function () {
      console.log(document.querySelector("#kohala").id);
      this.location = document.querySelector("#kohala").id;
    },
    clearFilter: function () {
      this.location = "";
      this.selectedTags = [];
      this.selectedTagName = "";
    },
    getByTag: function (experiences, selectedTags) {
      if (selectedTags.length === 0) {
        return experiences;
      }
      selectedTags.forEach((tag) => {
        experiences = this.filterBy(experiences, tag.name);
      });
      this.selectTagNames();
      return experiences;
    },
    selectTagNames: function () {
      if (this.selectedTags.length === 0) {
        this.selectedTagName = "";
      } else {
        for (var i = 0, names = []; names.length < this.selectedTags.length; i++) {
          names.push(this.selectedTags[i]);
        }
        for (var index = 0; index < names.length; index++) {
          console.log(names[index].name);
          this.selectedTagName = names[index].name;
        }
        return this.selectedTagName;
      }
    },
    showExperience: function (experience) {
      console.log(experience);
      this.currentExperience = experience;
      // document.querySelector("#experience-show").showModal();
      localStorage.setItem("experience_id", experience.id) === true;
      this.setUpMap();
    },
    setUpMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-155.5383, 19.6329], // starting position [lng, lat]
        zoom: 6.8, // starting zoom
      });
      console.log(map);
      var marker = new mapboxgl.Marker().setLngLat([this.currentExperience.lat, this.currentExperience.lng]).addTo(map);
      // console.log(popup);
      console.log(marker);
      // var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 35 })
      //   .setLngLat([this.currentExperience.lat, this.currentExperience.lng])
      //   .setHTML(this.currentExperience.name)
      //   .addTo(map);
    },
    createListItem: function () {
      console.log("adding experience as a list item");
      var params = {
        user_id: localStorage.getItem("user_id"),
        experience_id: localStorage.getItem("experience_id"),
        date: localStorage.getItem("date"),
      };
      axios
        .post("/api/list_items", params)
        .then(() => {
          localStorage.removeItem("date");
          localStorage.removeItem("experience_id");
          this.$router.push("/calendar");
        })
        .catch((error) => console.log(error.response));
    },
    kohalaImage: function () {
      document.querySelector("#image").src = this.kohala;
      this.district = "Kohala";
    },
    hamakuaImage: function () {
      document.querySelector("#image").src = this.hamakua;
      this.district = "Hamakua";
    },
    hiloImage: function () {
      document.querySelector("#image").src = this.hilo;
      this.district = "Hilo";
    },
    punaImage: function () {
      document.querySelector("#image").src = this.puna;
      this.district = "Puna";
    },
    kauImage: function () {
      document.querySelector("#image").src = this.kau;
      this.district = "Ka'u";
    },
    konaImage: function () {
      document.querySelector("#image").src = this.kona;
      this.district = "Kona";
    },
    hawaiiImage: function () {
      document.querySelector("#image").src = this.hawaii;
      this.district = "";
    },
  },
};
</script>

<style scoped>
#image {
  max-width: 300px;
}

#map {
  width: 300px;
}
</style>
