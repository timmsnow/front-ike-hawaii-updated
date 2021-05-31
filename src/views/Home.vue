<template>
  <div class="home">
    <header class="masthead">
      <div class="container">
        <div class="masthead-subheading">Welcome...</div>
        <div class="masthead-heading text-uppercase">'ike Hawaii</div>
        <div class="buttons">
          <a
            class="portfolio-link btn btn-primary btn-xl text-uppercase"
            data-bs-toggle="modal"
            href="#portfolioModal1"
          >
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">Sign Up</div>
            </div>
          </a>
          <a class="btn btn-info btn-xl text-uppercase" href="/login">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">Log In</div>
            </div>
          </a>
        </div>
      </div>
    </header>

    <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
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
                  <h2 class="text-uppercase">'ike hawaii'</h2>
                  <p class="item-intro text-muted">IKE: to see, to know, to understand...</p>
                  <form id="myDIV">
                    <ul>
                      <li class="text-danger" v-for="error in errors" v-bind:key="error">
                        {{ error }}
                      </li>
                    </ul>
                    <div class="margin">
                      <!-- <label>Name:</label> -->
                      <input type="text" class="form-control" v-model="name" placeholder="name" />
                    </div>
                    <div class="margin">
                      <!-- <label>Email:</label> -->
                      <input type="email" class="form-control" v-model="email" placeholder="email" />
                    </div>
                    <div class="margin">
                      <!-- <label>Password:</label> -->
                      <input type="password" class="form-control" v-model="password" placeholder="password" />
                    </div>
                    <div class="margin">
                      <!-- <label>Password confirmation:</label> -->
                      <input
                        type="password"
                        class="form-control"
                        v-model="passwordConfirmation"
                        placeholder="re-enter password"
                      />
                    </div>
                    <div class="buttons">
                      <button
                        v-on:click="submit()"
                        class="btn btn-primary btn-xl text-uppercase"
                        data-bs-dismiss="modal"
                        type="button"
                      >
                        Sign Up
                      </button>
                      <button class="btn btn-secondary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                        <i class="fas fa-times me-1"></i>
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to 'IKE HAWAII'",
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  created: function () {},
  methods: {
    submit: function () {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showForm: function () {
      console.log(this.x);
      return (this.x = "x");
    },
  },
};
</script>
