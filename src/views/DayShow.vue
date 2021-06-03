<template>
  <div class="day-show page-section">
    <div class="container-one my-5">
      <div>
        <div class="my-7">
          <div id="oval">
            <h1 class="text-center">{{ date }}</h1>
          </div>
        </div>
      </div>
      <div class="item-container my-5" v-for="(experience, index) in experiences" v-bind:key="index">
        <div class="filter slimming-margin">
          <div class="container" id="list-item-container">
            <h2>{{ experience.name }}</h2>
            <!-- <div class="col-md-6"> -->
            <img v-bind:src="experience.image_url" v-bind:alt="experience.name" class="img-fluid small-pic TextWrap" />
            <!-- </div> -->
            <!-- <div class="col-md-6"> -->
            <p>
              Where?
              <br />
              <span style="font-weight: bold">{{ experience.location }} District</span>
            </p>
            <p>
              How Long?
              <br />
              <span style="font-weight: bold">{{ experience.length }}</span>
            </p>
            <p>
              Best Time to Visit?
              <br />
              <span style="font-weight: bold">{{ experience.time }}</span>
            </p>
            <p>
              Important Information:
              <br />
              <span style="font-weight: bold">{{ experience.info }}</span>
            </p>
            <p>
              <span style="font-weight: bold">{{ experience.description }}</span>
            </p>
          </div>

          <!-- <button v-on:click="destroyListItem(experience)">Remove Experience</button> -->
          <div class="text-center">
            <div v-if="drivingTimes[index] != null" class="text">
              <hr />
              Approximate driving time between {{ experiences[index].name }} and {{ experiences[index + 1].name }} is
              {{ drivingTimes[index] }} minutes
              <hr />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <hr />

        <h2 class="text-center my-5">Time Tracker</h2>
        <div class="row my-5">
          <div class="col-lg-3 col-sm-6 mb-4" id="time">
            <div class="sm" id="map"></div>
          </div>
          <div class="col-lg-2 col-sm-6 mb-4"></div>

          <div class="col-lg-7 col-sm-6 mb-4">
            <h3 class="text-center">Your Info</h3>
            <form class="form-group my-4" v-on:submit.prevent="updateUser()">
              <div class="form-row margin">
                <label class="flex-sm-column gap">From where will you start?</label>
                <input
                  class="flex-sm-column gap"
                  type="text"
                  placeholder="Hotel Name or Address"
                  v-model="hotel_start"
                />
              </div>
              <div class="form-row margin my-4">
                <label class="flex-sm-column gap">Where are you sleeping?</label>
                <input class="flex-sm-column gap" type="text" placeholder="Hotel Name or Address" v-model="hotel_end" />
                <button class="btn-info btn-sm flex-sm-column gap" v-on:click.prevent="autoPopulateHotel()">
                  Same Place?
                </button>
              </div>
              <div class="my-4 buttons">
                <input type="submit" class="btn btn-warning" />
              </div>
            </form>
          </div>
        </div>
        <div class="text-center">
          <div class="row" id="time" ref="document">
            <h3>Approximate Driving Times</h3>
            <p v-if="hotel_start !== ''">
              Driving time between {{ hotel_start }} and {{ experiences[index].name }} is
              <span style="font-weight: bold">{{ updatedDrivingTimes[index] }} minutes.</span>
            </p>
            <p v-for="(time, index) in drivingTimes" :key="index">
              {{ experiences[index].name }} to {{ experiences[index + 1].name }} will take
              <span style="font-weight: bold">{{ drivingTimes[index] }} minutes</span>
            </p>
            <p v-if="hotel_end != ''">
              {{ experiences[experiences.length - 1].name }} and {{ hotel_end }} is
              <span style="font-weight: bold">{{ updatedDrivingTimes[updatedDrivingTimes.length - 1] }} minutes.</span>
            </p>
          </div>
          <div class="no-margin" v-if="totalDrivingTime !== ''">
            <h3 class="no-marg">Total Driving Time: {{ totalDrivingTime }} minutes</h3>
            <p class="text-center" style="font-style: italic">({{ drivingHours }} hours)</p>
          </div>
        </div>
        <hr />
      </div>

      <div class="text-center buttons my-6">
        <router-link to="/calendar">
          <button ref="button" class="btn btn-warning" v-on:click="removeDate(date)">Return to Calendar</button>
        </router-link>
        <button ref="button" class="btn btn-info" v-on:click="createPDF()">Save Day Info</button>
      </div>
    </div>
  </div>
</template>

<script>
/* global mapboxgl */

import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      errors: [],
      user_id: localStorage.getItem("user_id"),
      date: localStorage.getItem("date"),
      list_items: [],
      experiences: [],
      durations: [],
      updatedDurations: [],
      drivingTimes: [],
      updatedDrivingTimes: [],
      index: 0,
      hotel_start_coords: [],
      hotel_end_coords: [],
      hotel_start_coordinates: [],
      hotel_end_coordinates: [],
      input_times: [],
      hotel_start: "",
      hotel_end: "",
      totalDrivingTime: "",
      drivingHours: "",
    };
  },
  created: function () {
    axios.get("api/list_items").then((response) => {
      this.list_items = response.data;
      var currentDate = localStorage.getItem("date");
      var currentUser = localStorage.getItem("user_id");
      this.list_items.map((item) => {
        if (item.date == currentDate && item.user_id == currentUser) {
          this.experiences.push(item.experience_info);
        }
      });
      this.setUpMap();
    });
  },
  mounted: function () {
    this.setUpMap();
    this.getDriveTime();
  },
  methods: {
    removeDate: function () {
      localStorage.removeItem("date");
    },
    setUpMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-155.5765, 19.5364], // starting position [lng, lat]
        zoom: 6.8, // starting zoom
      });
      for (var i = 0; i < this.experiences.length; i++) {
        var marker = new mapboxgl.Marker().setLngLat([this.experiences[i].lat, this.experiences[i].lng]).addTo(map);
        console.log(marker);
        console.log(popup);
        var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 35 })
          .setLngLat([this.experiences[i].lat, this.experiences[i].lng])
          .setHTML(this.experiences[i].name)
          .addTo(map);
      }
      this.getDriveTime();
    },
    getDriveTime: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var coordinates = [];
      for (var i = 0; i < this.experiences.length; i++) {
        coordinates.push(this.experiences[i].lat, this.experiences[i].lng);
      }
      for (var k = 0, j = 1; j < coordinates.length; k = k + 2, j = j + 2) {
        coordinates.join(",");
        coordinates[k] = coordinates[k] + ",";
        coordinates[j] = coordinates[j] + ";";
      }
      var coordinateString = coordinates.join("").slice(0, -1);
      if (coordinates.length >= 4) {
        axios
          .get(
            "https://api.mapbox.com/directions-matrix/v1/mapbox/driving/" +
              `${coordinateString}` +
              "?access_token=" +
              `${mapboxgl.accessToken}`
          )
          .then((response) => {
            this.durations = response.data;
            var matrix = this.durations.durations;
            for (var i = 0, j = 1; j < this.experiences.length; i++, j++) {
              this.drivingTimes.push((matrix[i][j] / 60) | 0);
            }
            this.drivingTimes;
          });
      }
    },
    updateUser: function () {
      console.log("updating user trip info");
      var params = {
        hotel_start: this.hotel_start,
        hotel_end: this.hotel_end,
      };
      // console.log(this.user);
      axios.patch("/api/users/" + this.user_id, params).catch((error) => console.log(error.response));
      this.getCoordinates();
      console.log("whaaaat");
      // this.$router.go();
    },
    getCoordinates: function () {
      var start = this.hotel_start;
      var startingUrl = encodeURIComponent(start);
      var end = this.hotel_end;
      var endingUrl = encodeURIComponent(end);
      // console.log(hotel_coordinates);
      axios
        .get(
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            `${startingUrl}` +
            ".json" +
            "?access_token=" +
            `${mapboxgl.accessToken}` +
            "&limit=1"
        )
        .then((response) => {
          this.hotel_start_coords.push(response.data);
          this.hotel_start_coordinates = this.hotel_start_coords[0].features[0].center;
          axios
            .get(
              "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                `${endingUrl}` +
                ".json" +
                "?access_token=" +
                `${mapboxgl.accessToken}` +
                "&limit=1"
            )
            .then((response) => {
              this.hotel_end_coords.push(response.data);
              this.hotel_end_coordinates = this.hotel_end_coords[0].features[0].center;
              console.log(this.hotel_end_coordinates);
              var newCoordinates = [];
              for (var x = 0; x < this.hotel_start_coordinates.length; x++) {
                newCoordinates.push(String(this.hotel_start_coordinates[x]));
              }
              for (var i = 0; i < this.experiences.length; i++) {
                newCoordinates.push(this.experiences[i].lat, this.experiences[i].lng);
              }
              for (var y = 0; y < this.hotel_end_coordinates.length; y++) {
                newCoordinates.push(String(this.hotel_end_coordinates[y]));
              }
              for (var k = 0, j = 1; j < newCoordinates.length; k = k + 2, j = j + 2) {
                newCoordinates.join(",");
                newCoordinates[k] = newCoordinates[k] + ",";
                newCoordinates[j] = newCoordinates[j] + ";";
              }
              var newCoordinateString = newCoordinates.join("").slice(0, -1);
              if (newCoordinates.length >= 4) {
                axios
                  .get(
                    "https://api.mapbox.com/directions-matrix/v1/mapbox/driving/" +
                      `${newCoordinateString}` +
                      "?access_token=" +
                      `${mapboxgl.accessToken}`
                  )
                  .then((response) => {
                    this.updatedDurations = response.data;
                    var matrix = this.updatedDurations.durations;
                    for (var i = 0, j = 1; j < newCoordinates.length / 2; i++, j++) {
                      this.updatedDrivingTimes.push((matrix[i][j] / 60) | 0);
                    }
                    this.updatedDrivingTimes;
                    console.log(this.updatedDrivingTimes);
                    for (var z = 0, time = 0; z < this.updatedDrivingTimes.length; z++) {
                      time += this.updatedDrivingTimes[z];
                    }
                    this.totalDrivingTime = time;
                    const roundToHundredth = (value) => {
                      return Number(value.toFixed(2));
                    };
                    this.drivingHours = roundToHundredth(time / 60);
                  });
              }
            });
        });

      // mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
    },
    autoPopulateHotel: function () {
      this.hotel_end = this.hotel_start;
    },
  },
};
</script>
