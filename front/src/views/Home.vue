<template>
  <div class="container-fluidh-100">
    <div class="row no-gutter">
      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
      <div class="col-md-8 col-lg-6 blocp">
        <img src="../assets/logo2.png" class="logo" alt="logo groupomania" />
        <h1 class="login-heading mb-4">Discutons, Partageons, Avançons...</h1>
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-9 mx-auto bloc">
                <h2 class="login-heading mb-4" v-if="mode == 'login'">
                  S'identifier
                </h2>
                <h2 class="login-heading mb-4" v-else>S'inscrire</h2>
                <p v-if="mode == 'login'">
                  Pas encore inscrit ?
                  <button class="switche" @click="switchToCreateAccount()">
                    Je m'inscris
                  </button>
                </p>

                <p v-else>
                  Deja inscrit ?
                  <button class="switche" @click="switchToLogin()">
                    Je m identifie
                  </button>
                </p>

                <form class="SignupLogin">
                  <div
                    class="form-label-group .has-warning.has-error.has-success"
                  >
                    <input
                      v-model="username"
                      type="texte"
                      id="inputtexte"
                      class="form-control"
                      v-if="mode == 'create'"
                      placeholder="Pseudo"
                      minlength="3"
                      maxlength="10"
                      pattern="[A-z-_ çàâéèeîïù]{2,30}"
                      required
                      autofocus
                    />
                    <label for="inputtexte">Username *</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      v-model="email"
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email address"
                      required
                      autofocus
                    />
                    <label for="inputEmail">Email *</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      v-model="password"
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      placeholder="Password"
                      title="Veuillez écrire un mail valide"
                      pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}.[a-zA-Z]{2,4}$"
                      required
                      autofocus
                    />
                    <label for="inputPassword">Password *</label>
                  </div>

                  <div class="form-label-group" v-if="mode == 'create'">
                    <input
                      v-model="bio"
                      type="text"
                      id="inputbio"
                      class="form-control"
                      placeholder="bio"
                      autofocus
                      minlength="5"
                      maxlength="40"
                      pattern="/[^><%#!$/(){}]{15,400}$/"
                    />
                    <label for="inputbio">Bio</label>
                  </div>

                  <div class="form-label-group" v-if="mode == 'create'">
                    <input
                      v-model="job"
                      type="text"
                      id="inputjob"
                      class="form-control"
                      placeholder="job"
                      minlength="5"
                      maxlength="15"
                      pattern="/[^><%#!$/(){}]{15,400}$/"
                      autofocus
                    />
                    <label for="inputjob">Job</label>
                  </div>

                  <button
                    v-if="mode == 'login'"
                    @click.prevent="loginAccount()"
                    class="btn btn-lg btn-block btn-login text-uppercase font-weight-bold mb-2 button--disabled"
                    type="submit"
                  >
                    Connexion
                  </button>
                  <button
                    v-else
                    @click.prevent="createAccount()"
                    class="btn btn-lg btn-block btn-login text-uppercase font-weight-bold mb-2"
                    :class="{ 'button--disabled': !validateFields }"
                    type="submit"
                  >
                    Créer un compte
                  </button>
                  * Champs requis
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const axios = require("axios");
import swal from "sweetalert";
export default {
  name: "Home",
  data() {
    return {
      mode: "login",
      email: "",
      username: "",
      password: "",
      job: "",
      bio: "",
    };
  },
  computed: {
    validateFields: function () {
      if (this.mode == "create") {
        if (
          this.email != "" &&
          this.username != "" &&
          this.password != "" &&
          this.bio != ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {

    // SWITCH ENTRE LOGIN ET SIGNUP

    switchToCreateAccount() {
      this.mode = "create";
    },
    switchToLogin() {
      this.mode = "login";
    },

    // SIGNUP

    createAccount() {
      let newUser = {
        email: this.email,
        username: this.username,
        password: this.password,
        bio: this.bio,
      };
      axios
        .post("http://localhost:3000/user/signup", newUser)
        .then((res) => {
          console.log(res.data);
          swal("ok compte");
          if (res === 201) {
            this.loginAccount();
          }
          swal({
            title: "Compte Créer!",
            text: "Vous pouvez maintenant vous identifier",
            icon: "success",
            button: "OK",
            position: "top-end",
          });
        })
        .catch(function (err) {
          swal({
            title: "Aïe!",
            text: "Compte déja existant ou champs invalides!",
            icon: "warning",
            button: "ok",
          });
          console.log(err);
        });
    },

    //LOGIN +  ENVOIE TOKEN + ID DANS LOCALSTORAGE

    loginAccount() {
      let User = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/user/login", User)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("User", JSON.stringify(res.data));
            this.$router.push("/Tchat");
          }
        })
        .catch(function (err) {
          swal({
            title: "Aïe!",
            text: "Champs invalides !",
            icon: "warning",
            button: "ok",
          });

          console.log(err + "login hs");
        });
    },
  },
};
</script>

<style>
.container {
  min-height: 100vh;
}
p {
  text-align: center;
}
.bloc {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #c6c6c4;
  border: 2px solid brown;
  box-shadow: 2px 2px 2px#ababa9;
  opacity: 0.8;
  border-radius: 20px;
}

.blocp {
  background-color: #b0b0af;
}

button {
  background-color: #b0b0af;
}

:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}
button {
  border-radius: 18px;
  padding-left: 1rem;
  padding-right: 1rem;
}
.bg-image {
  background-image: url("../assets/photo.jpg");
  background-size: cover;
  background-position: center;
}

.logo {
 
  height: 18%;
  width: 50%;
  text-align: center;
  margin: auto;
  padding-top: 2rem;
  display: flex;
}

.login-heading {
  font-weight: 300;
  text-align: center;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: auto;
  border-radius: 2rem;
  text-align: center;
  border: 1px solid #3b3b3b;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  cursor: text;
  /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}
*/ .form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }

  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }

  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>
