<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">Accueil |</router-link>
      <router-link to="/about"> A propos |</router-link>
      <router-link to="/login"> Se connecter |</router-link>
      <router-link to="/profil"> Mon Profil <v-icon class="icon" name="regular/user"/></router-link>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default{
    name: 'Main',
      data () {
        return {
          groupName : 'Groupomania',
        }
      },
    }
</script>


<style scoped lang="scss">
$primary: #283A59 !default;

body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 2em;
  background-color: $primary;

  a {
    color: #ffffff;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
  
  .icon{
    color:#ffffff;
  }
}
</style>
