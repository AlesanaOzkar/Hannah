<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-11 col-sm-11 col-md-6">
                <div class="crear_boton text-center ">
                    <div class="item mt-1">
                      
                        <img src="../../assets/Hannah.png">
                        
                    </div>
                    <div class="item">
                            <img src="../../assets/success.png">
                    </div>
                    <div class="item">
                        Se ha copiado la liga con éxito
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//Se importa vuex para tener acceso al 'store'
import {mapActions,mapState} from 'vuex'

export default {
    data(){
        return{
             src: '@src/assets/logo.png'
        }
    },
    mounted(){

    },
    computed:{
        ...mapState(["login","usuarioEmail","ligaReciente","ultimoIndice"])
    },
    methods: {
        ...mapActions(["cerrarSesion","guardarNumero","guardarLiga"])
    }
}
</script>