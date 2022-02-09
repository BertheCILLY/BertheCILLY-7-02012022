
<template>
  <div>
    <div class="bloc profil">
      <ul class="list-group text-center">
        <li class="list-group-item">Bonjour {{ username }}</li>
        <li class="list-group-item">{{ email }}</li>
        <li class="list-group-item">{{ job }}</li>
        <li class="list-group-item">{{ bio }}</li>
        <li class="list-group-item" v-if="isAdmin === true">
         * COMPTE ADMINISTRATEUR *
        </li>
      </ul>
    </div>
  </div>
</template>

   <script>
const axios = require("axios");
export default {
  name: "ProfilUser",

  data() {
    return {
      UserProfile: [],
      userId: "",
      token: "",
      email: "",
      username: "",
      bio: "",
      isAdmin: "",
      UserId: "",
    };
  },

  methods: {
    //AFFICHAGE PROFIL STOCKER DANS LE LOCALSTORAGE

    Profil() {
      this.UserProfile = JSON.parse(localStorage.getItem("User"));
      this.UserId = this.UserProfile.UserId;
      this.token = this.UserProfile.token;

      axios
        .get("http://localhost:3000/user/" + this.UserId)
        .then((res) => {
          let User = res.data;
          this.email = User.email;
          this.bio = User.bio;
          this.job = User.job;
          this.username = User.username;
        })
        .catch(function (err) {
          console.log(err + "ERREUR PROFIL");
        });
    },
  },
  mounted() {
    this.Profil();
  },
};
</script>
   <style scoped >
.bloc {
  width: 80%;
  margin: auto;
}
</style>
      
