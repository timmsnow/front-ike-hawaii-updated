<template>
  <div class="login">
    <header class="masthead">
      <div class="welcome">
        <div class="masthead-subheading">'Ike'</div>
        <p class="text-muted" style="color: white !important">to see, experience, know, and understand</p>
        <div class="row justify-content-center">
          <form class="col-lg-8">
            <ul>
              <li class="text-danger" v-for="error in errors" v-bind:key="error">
                {{ error }}
              </li>
            </ul>
            <div class="form-group">
              <input type="email" class="form-control" v-model="email" placeholder="email" />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" v-model="password" placeholder="password" />
            </div>
            <!-- <input type="submit" class="btn-primary" value="Submit" /> -->
            <button v-on:click="submit()" class="btn btn-primary btn-xl text-uppercase" type="button">Log In</button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          console.log("you logged in!");
          this.$router.push("/calendar");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
