<template>
  <div class="container-fluide">
    <div class="container-fluide">
      <NavBar />
    </div>

    <div class="container-fluide row">
      <div class="col-xl-3 col-lg-3 col-md-3 Profil">
        <ProfilUser />
      </div>

      <div class="col">
        <Message />
      </div>
    </div>
  </div>
</template>

<script>

// IMPORT COMPONENTS

import ProfilUser from "../components/ProfilUser.vue";
import NavBar from "../components/NavBar.vue";


export default {
  name: "TCHAT",
  components: {
    ProfilUser,
    NavBar,
    Message,
    Comment,
  },
  mounted() {},
};
</script>

<style scoped>
.Profil {
  padding-left: 3rem;
  padding-top: 4rem;
  background-image: url("../assets/fond.jpg");
}
</style>