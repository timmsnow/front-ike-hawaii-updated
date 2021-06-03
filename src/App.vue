<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="#page-top">
          <!-- <img src="assets/img/ikelogo-small.jpg" alt="..." /> -->
          'Ike Hawaii
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars ms-1"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ml-auto">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="/about"><span class="color">About</span></a>
            </li>
            <li class="nav-item" v-if="!ifLoggedIn()">
              <a class="nav-link js-scroll-trigger" href="/login">Login</a>
            </li>
            <li class="nav-item" v-if="ifLoggedIn()">
              <a class="nav-link js-scroll-trigger" href="/logout">Logout</a>
            </li>
            <li class="nav-item" v-if="ifLoggedIn()">
              <a class="nav-link js-scroll-trigger" href="/calendar">Trip Calendar</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
    <footer class="footer py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4 text-lg-start">
            Copyright &copy; 'ike hawaii'
            <!-- This script automatically adds the current year to your website footer-->
            <!-- (credit: https://updateyourfooter.com/)-->
          </div>
          <div class="col-lg-4 my-3 my-lg-0">
            <!-- <a class="btn btn-warning btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-warning btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-warning btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a> -->
          </div>
          <div class="col-lg-4 text-lg-end">
            <a class="link-warning text-decoration-none me-3" href="#!">Privacy Policy</a>
            <a class="link-warning text-decoration-none" href="#!">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.container-one {
  background: rgb(255, 255, 255, 0.9);
  padding: 3%;
  margin-left: 7%;
  margin-right: 7%;
}
.margin {
  margin: 2%;
}

.slimming-margin {
  margin-left: 10%;
  margin-right: 10%;
}

.buttons {
  display: flex;
  gap: 2%;
  justify-content: center;
}

.same-row {
  display: flex;
  gap: 2%;
  /* justify-content: center; */
}

.float-right {
  text-align: right;
}

.gap {
  margin-left: 1%;
  margin-right: 1%;
}

.center {
  justify-content: center;
}
#oval {
  width: 40%;
  height: auto;
  background: #fff;
  border-radius: 300px / 150px;
  box-shadow: 1px 1px 4px gray;
  margin-left: auto;
  margin-right: auto;
}

.TextWrap {
  float: left;
  margin: 0 4% 2% 0;
  max-height: 300px;
}

/* .small-pic {
  max-width: 400px;
} */

.text-shadow {
  text-shadow: 1px 4px 5px black;
}

.yellow-shadow {
  text-shadow: 1px 2px 4px black;
  color: rgb(253, 208, 5);
}

.experience-image {
  box-shadow: 1px 1px 4px gray;
}
.experience-image:hover {
  border: 4px solid rgb(253, 208, 5);
}

.background {
  border: 4px solid rgb(253, 208, 5);
  background-image: url("./assets/kilauea.jpg");
}

.italic {
  font-style: italic;
  color: rgb(196, 192, 192);
}

.max-width {
  max-width: 70%;
}
#map {
  box-shadow: 1px 1px 4px gray;
  height: 300px;
  width: 300px;
}

@media (max-width: 768px) {
  #map {
    margin: auto;
    height: 280px;
    width: 280px;
  }

  .TextWrap {
    float: left;
    margin: 0 0 12% 0;
    max-height: 300px;
  }

  #tags {
    text-align: center;
  }

  #time {
    margin: auto;
  }
}

footer {
  min-height: 12vh;
}

.page-section {
  min-height: 88vh;
  background-size: cover;
}

.masthead {
  min-height: 88vh;
}
</style>

<script>
export default {
  methods: {
    ifLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
