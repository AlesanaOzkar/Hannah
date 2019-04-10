<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-11 col-sm-11 col-md-6">
                <div class="crear_boton text-center ">
                    <div class="item mt-3">
                        <h5>
                            Crear botón whatsapp
                        </h5>
                    </div>
                    <a :href="ligaReciente.liga" class="mt-5 pointer word-break">
                        {{ligaReciente.liga}}
                    </a>
                    <div class="item form-enviar justify-content-center mt-5">
                        <input class="btn" value="COPIAR LIGA" @click.stop.prevent="copiarLiga">
                    </div>
                    <div>
                        <b-link @click="moverAtras()">
                            Editar
                        </b-link>   
                    </div>
                    <div>
                        <input type="hidden" id="liga_oculta" :value="ligaReciente.liga">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//Se importa vuex para tener acceso al 'store'
import {mapActions,mapState} from 'vuex'
import gmapsInit from '../../utils/gmaps';
import { constants } from 'crypto';
import { error } from 'util';
import router from '../../router';
export default {
    data(){
        return{
            numero:'',
            modoEditar:false,
            error:'',
            mensaje:'',
            center: null, 
            direccion_actual: '',
            testingCode:'Copiado chido'
        }
    },
    mounted(){

        if(!this.ligaReciente){
           router.push({name:'nueva_liga'})
        }

        //Se obtiene el email guardado
        let def_email = localStorage.getItem("email");
        //Se obtienen los datos del usuario
        let def_usuario = JSON.parse(localStorage.getItem(def_email));
        //Sí el número de usuario ya está guardado se obtiene
        if(def_usuario.numero !== null){
            this.modoEditar = true
            this.numero  = def_usuario.numero
        }else{
            this.modoEditar = false
        }


    },
    computed:{
        ...mapState(["login","usuarioEmail","ligaReciente","ultimoIndice"])
    },
    methods: {
        ...mapActions(["cerrarSesion","guardarNumero","guardarLiga"]),
        copiarLiga () {
          let ligaACopiar = document.querySelector('#liga_oculta')
          ligaACopiar.setAttribute('type', 'text')
          ligaACopiar.select()

          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            router.push({
                name:'copiado_exitosamente'
            })
          } catch (err) {
            alert('Oops, unable to copy');
          }
          ligaACopiar.setAttribute('type', 'hidden')
          window.getSelection().removeAllRanges()
        },
        moverAtras(){
            router.push({ name: 'nueva_liga', params: { liga_obj: this.ligaReciente , ultimoIndice:this.ultimoIndice}})
        }
    }
}
</script>