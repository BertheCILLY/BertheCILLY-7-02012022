<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">A propos</router-link> |
      <router-link to="/login">Se connecter</router-link> |
      <router-link to="/signup">S'inscrire</router-link> |
      <router-link to="/profil">Mon compte</router-link>
    </header>
    <router-view/>
    <footer>
      <p id="copyright">copyright Groupomania ©</p>
    </footer>
  </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #132542;
    }
  }
}

footer{
  background:#132542;
  position:absolute;
  bottom:0;
  width:100%;
  padding-top:50px;
  height:50px;
}

#copyright{
  color: white,
}
</style>
