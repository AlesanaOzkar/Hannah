<template>
  <div id="app">  
    <!--Carga la barra de navegación-->
    <navbar v-if="login"></navbar>
    
    <router-view/>
  </div>
</template>
<script>
//Importa el componente de la barra de navegación
import navbar from './components/partials/Navbar'
//Se importa vuex para tener acceso al 'store'
import {mapState} from 'vuex'
export default {
  components:{
    navbar
  },
  computed:{
    ...mapState(["login"])
  }
}
</script>
<style lang="scss" src="./scss/main.scss"></style>
