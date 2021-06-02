<template>
  <div class="calendar-page">
    <section class="page-section" id="services">
      <div class="dates" id="kilauea" v-if="noDates()">
        <form class="container my-6" v-on:submit.prevent="updateUser(user)">
          <h1 class="text-center yellow-shadow">When will you be coming to our island?</h1>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <div class="slimming-margin my-5">
            <label for="example-datepicker">Arrival</label>
            <b-form-datepicker id="example-datepicker" v-model="inputTripStart" class="mb-2"></b-form-datepicker>
            <div>
              <label for="example-datepicker">Departure</label>
              <b-form-datepicker id="example-datepicker-2" v-model="inputTripEnd" class="mb-2"></b-form-datepicker>
            </div>
            <div class="text-center margin">
              <input type="submit" class="btn btn-warning" value="Submit" />
            </div>
          </div>
        </form>
      </div>

      <div class="container">
        <div class="row">
          <div class="calendar" v-if="!noDates()">
            <div class="text-center">
              <img id="surf" class="img-fluid" src="../assets/surf3.png" />
              <h3 class="section-subheading text-white text-shadow">the Big Island... as you want to see it</h3>
            </div>
            <div class="slider">
              <div class="full hide-scroll">
                <ul class="hs">
                  <div class="container" v-for="(date, index) in dates" v-bind:key="`vfor-${index}`">
                    <li class="item">
                      <h5 class="date text-center" ref="date">
                        {{ date }}
                      </h5>
                      <div
                        class="item-container my-8"
                        v-for="list_item in filterByUserAndDate"
                        v-bind:key="list_item.id"
                      >
                        <div class="filter" v-if="list_item.date == date">
                          <div class="row align-items-stretch mb-5">
                            <div class="col-md-6">
                              <h6>{{ list_item.experience_info.name }}</h6>
                              <p>({{ list_item.experience_info.location }})</p>
                            </div>
                            <div class="col-md-6 float-right">
                              <button class="btn-sm bg-warning" v-on:click="destroyListItem(list_item)">Remove</button>
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                      <div class="buttons">
                        <router-link to="/experiences">
                          <button class="btn btn-info" ref="button" v-on:click="storeDate(date)">Add Experience</button>
                        </router-link>
                        <router-link to="/day-show">
                          <button class="btn btn-secondary" ref="button" v-on:click="storeDate(date)">
                            Show Full Day Details
                          </button>
                        </router-link>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer-margin" class="my-4 buttons">
        <a class="portfolio-link text-uppercase" data-bs-toggle="modal" href="#portfolioModal2">
          <div class="portfolio-hover">
            <button v-if="!noDates()" v-on:click="editDates()" class="btn bg-warning">Edit Trip Dates</button>
          </div>
        </a>
      </div>
    </section>

    <div class="portfolio-modal modal fade" id="portfolioModal2" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-bs-dismiss="modal">
            <img src="assets/img/close-icon.svg" alt="Close modal" />
          </div>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <div class="modal-body">
                  <!-- Project details-->
                  <h3>When will you be coming to our island?</h3>
                  <ul>
                    <li class="text-danger" v-for="error in errors" v-bind:key="error">
                      {{ error }}
                    </li>
                  </ul>
                  <div>
                    <label for="example-datepicker">Arrival</label>
                    <b-form-datepicker
                      id="example-datepicker"
                      v-model="inputTripStart"
                      class="mb-2"
                    ></b-form-datepicker>
                  </div>
                  <div>
                    <label for="example-datepicker">Departure</label>
                    <b-form-datepicker
                      id="example-datepicker-2"
                      v-model="inputTripEnd"
                      class="mb-2"
                    ></b-form-datepicker>
                  </div>
                  <div class="buttons">
                    <div class="inline">
                      <button type="submit" class="btn btn-warning" v-on:click="updateUser(user)">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slider {
  padding: var(--gutter) 0;
  display: grid;
  grid-gap: var(--gutter) 0;
  grid-template-columns: var(--gutter) 1fr var(--gutter);
  align-content: start;
  width: auto;
  height: auto;
  background: rgb(209, 209, 209, 0.8);
  border: 4px solid rgb(247, 200, 46);
  border-radius: 2%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-y: scroll;
  box-shadow: 1px 1px 4px gray;
}

.slider > * {
  grid-column: 2 / -2;
}

.slider > .full {
  grid-column: 1 / -1;
}

.hs {
  display: grid;
  grid-gap: calc(var(--gutter) / 2);
  grid-template-columns: repeat(6, auto);
  grid-template-rows: minmax(50px, 1fr);
  /* grid-template-columns: 10px repeat(6, auto) 10px; */
  /* grid-template-rows: minmax(300px, 1fr); */
  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(0.75 * var(--gutter));
  margin-bottom: calc(-0.5 * var(--gutter));
}

.hs > li,
.item {
  margin: 2%;
  padding: 3%;
  list-style-type: none;
  justify-content: start;
  align-items: center;
  background: white;
  border: 2px solid rgb(254, 207, 52);
  border-radius: 8px;
  height: auto;
  width: auto;
  min-width: 300px;
  font-size: 12px;
  box-shadow: 1px 1px 4px gray;
}

/* .hs::before, */
.hs::after {
  content: "";
}

.hide-scroll {
  overflow-y: hidden;
  margin-bottom: calc(-0.1 * var(--gutter));
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
      errors: [],
      user_id: localStorage.getItem("user_id"),
      list_items: [],
      experiences: [],
      inputTripStart: "",
      inputTripEnd: "",
      dates: [],
      list_item: {},
      selectedListItem: {},
      userListItems: [],
    };
  },
  created: function () {
    axios.get(`/api/users/${this.user_id}`).then((response) => {
      this.user = response.data;
    });
    this.indexListItems();
  },
  mounted: function () {
    axios.get(`/api/users/${this.user_id}`).then((response) => {
      this.user = response.data;
      let initialDate = new Date(this.user.trip_start),
        endDate = new Date(this.user.trip_end);
      for (let q = initialDate; q <= endDate; q.setDate(q.getDate() + 1)) {
        var d = q.toUTCString();
        var array = d.split(" ");
        var e = array[1];
        var h = array[0];
        var f = array[2];
        var g = array[3];
        var a = h + " " + e + " " + f + " " + g;
        this.dates.push(a);
      }
    });
  },
  computed: {
    filterByUserAndDate: function () {
      var current_user = localStorage.getItem("user_id");
      //add logic to filter by date?
      return this.list_items.filter((list_item) => list_item.user_id == current_user);
    },
  },
  methods: {
    updateUser: function () {
      console.log("updating user trip info");
      var params = {
        trip_start: this.inputTripStart,
        trip_end: this.inputTripEnd,
      };
      console.log(this.user);
      axios.patch("/api/users/" + this.user_id, params).catch((error) => console.log(error.response));
      this.$router.go();
      this.trashOldListItems();
    },
    indexListItems: function () {
      axios.get("api/list_items").then((response) => {
        this.list_items = response.data;
      });
    },
    noDates: function () {
      if (this.user.trip_start === null) {
        return true;
      }
    },
    editDates: function () {
      if (
        confirm("Are you sure? Changing dates can result in deleted experiences if original dates arent included...")
      ) {
        document.querySelector(".edit-dates").showModal();
      }
    },
    storeDate: function (date) {
      localStorage.setItem("date", date) === true;
    },
    destroyListItem: function (list_item) {
      axios.delete("/api/list_items/" + list_item.id).then(() => {
        console.log("destroyed!");
        this.indexListItems();
      });
    },
    trashOldListItems: function () {
      var userListItems = this.list_items.filter((list_item) => list_item.user_id == this.user_id);
      for (let i of userListItems) {
        if (this.dates.includes(i.date)) {
          console.log(i);
        } else {
          this.destroyListItem(i);
        }
      }
    },
  },
};
</script>
