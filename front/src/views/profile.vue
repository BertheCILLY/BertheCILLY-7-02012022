<template>
  <div class="container-fluide">
    <div class="container-fluide">
      <NavBar />
    </div>

    <div class="profil">
      <div class="col-7 col-lg-4 col-xl-4 profiluser">
        <ProfilUser />
      </div>

      <!-- CHANGEMENT PROFIL -->

      <div class="col-8 col-lg-5 col-xl-5 bloc">
        <form class="NewProfil">
          <!-- CHANGEMENT username -->

          <div>
            <label for="inputusername">username</label>
            <input
              v-model="username"
              type="texte"
              id="inputusername"
              class="form-control"
              placeholder=" Nouveau Pseudo"
              minlength="3"
              maxlength="10"
              pattern="[A-z-_ çàâéèeîïù]{2,30}"
              required
              autofocus
            />
          </div>

          <!-- CHANGEMENT BIO -->

          <div>
            <label for="inputbio">bio</label>
            <input
              v-model="bio"
              type="texte"
              id="inputbio"
              class="form-control"
              placeholder="Nouvelle bio"
              minlength="5"
              maxlength="40"
              pattern="/[^><%#!$/(){}]{15,400}$/"
              autofocus
            />
          </div>

          <!-- CHANGEMENT email -->

          <div class="mb-3">
            <label for="inputemail">Nouveau email</label>
            <input
              v-model="email"
              type="texte"
              id="inputemail"
              class="form-control"
              placeholder="Nouveau email"
              minlength="3"
              maxlength="10"
              pattern="[A-z-_ çàâéèeîïù]{2,30}"
              autofocus
            />
          </div>
          <input
            type="submit"
            value="Valider les modifications"
            class="valider"
            @click="NewProfil()"
          /><br />
          ou <br />
          <input
            type="submit"
            value="Supprimer mon compt"
            class="supprimer"
            @click="deleteProfil()"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ProfilUser from "../components/ProfilUser.vue";
import NavBar from "../components/NavBar.vue";
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "Profil",
  components: {
    NavBar,
    ProfilUser,
  },

  data() {
    return {
      UserProfile: [],
      username: "",
      bio: "",
    };
  },

  mounted() {},

  methods: {
    //CHANGEMENT PROFIL//

    NewProfil() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.UserId = localstorage.UserId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      let newProfil = {
        username: this.username,
        bio: this.bio,
      };

      axios
        .put(`http://localhost:3000/user/${this.UserId}`, newProfil, config)
        .then((resp) => {
          swal("Compte modifier");
          this.$router.push("/Tchat");
        })
        .catch(function (err) {
          swal("Erreur champs invalides");
          console.log(err + "ERREUR NewProfil");
        });
    },

    //SUPPRESSION COMPTE USER

    deleteProfil() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.UserId = localstorage.UserId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .delete(`http://localhost:3000/user/${this.UserId}`, config)
        .then((resp) => {
          swal({
            title: "Compte Supprimé!",
            text: "Vous pouvez vous réinscrire",
            icon: "success",
            button: "OK",
            position: "top-end",
          });
          this.$router.push("/");
        })
        .catch(function (err) {
          console.log(err + "ERREUR delete profil");
        });
    },
  },
};
</script>

<style scoped>
.profil {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-image: url("../assets/fond2jpg.jpg");
  background-size: cover;
  min-height: calc(100vh - 150px);
}

.profiluser {
  margin-bottom: 3rem;
  margin-top: 2rem;
}

.valider,
.supprimer {
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
}

.valider:hover {
  color: brown;
}

.supprimer:hover {
  color: brown;
}
label {
  opacity: 0;
}

input {
  text-align: center;
}
</style>
