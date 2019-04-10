<template>
    <div class="barra_navegacion">
        <b-navbar toggleable="lg"  fixed="true" class="barra">
            

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            
                 <img class="hannah-icon" src="../../assets/Hannah.png">
            
            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-if="login" :to="{name:'home'}">Principal</b-nav-item>
                <b-nav-item v-if="login" :to="{name:'nueva_liga'}">Crear una liga</b-nav-item>

                <b-nav-item v-if="login" :to="{name:'historial'}">Historial</b-nav-item>
                <b-nav-item v-if="false" :to="{name:'login'}">Iniciar sesión</b-nav-item>
                <b-nav-item v-if="login" @click="cerrarSesion">Cerrar sesión</b-nav-item>
                
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
//Se importa vuex para tener acceso al 'store'
import {mapActions,mapState} from 'vuex'
export default {
    computed:{
        ...mapState(["login","usuarioEmail"])
    },
    methods: {
        ...mapActions(["cerrarSesion"])
    }
}
</script>