<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-11 col-sm-11 col-md-6">
                <div class="crear_boton ">
                        <div class="item text-center">
                            <h5>
                                Crear botón whatsapp
                            </h5>
                        </div>
                        <div class="item text-center">
                            Ingresa el número y el mensaje que deseas enviar
                        </div>

                        <form @submit.prevent="guardar">
                            <div class="item">
                                Tu número
                            </div>
                            <div class="item form-enviar">
                                <input type="text" :class="{ editText: modoEditar}" v-model="numero" :disabled="modoEditar">
                                <input class="btn btn-guardar" v-if="!modoEditar" type="submit" value="GUARDAR">
                                
                                <button class="editar"  v-if="modoEditar" type="submit">
                                    <i class="fa fa-edit"></i>
                                </button>
                             
                                <button type="button" v-if="!modoEditar" class="close" aria-label="Close" @click.prevent="borrarNumero">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <small class="text-danger">{{error}}</small>
                        </form>
                       
                       <form @submit.prevent="generarLiga">
                            <div class="item mt-2">
                                Tu mensaje
                            </div>
                            <div class="item">
                                <textarea v-model="mensaje" name="" id="" cols="20" rows="4"></textarea>
                            </div>
                            <div class="item">
                                <input type="submit"   class="btn" :value="nombre_boton">
                            </div>
                       </form>
                </div>
            </div>
        </div>
        <div class="App"/>
    </div>
</template>

<script>
//Se importa vuex para tener acceso al 'store'
import {mapActions,mapState,mapMutations} from 'vuex'
import gmapsInit from '@/utils/gmaps';
import { constants } from 'crypto';
import { error } from 'util';
import router from '@/router'
import f from '../../utils/funciones'
export default {
    data(){
        return{
            numero:'',
            modoEditar:false,
            error:'',
            mensaje:'',
            center: null, 
            direccion_actual: '',
            nombre_boton:null
        }
    },
    beforeMount(){
        //Se verifica que no haya un parametro dentro de la ruta
        if(this.$route.params.liga_obj === undefined){
            this.nombre_boton = 'Generar Liga'
        } 
        else{
            this.nombre_boton = 'Editar Liga'
            this.mensaje = f.mensajeSinEspacios(this.$route.params.liga_obj.mensaje,true)
        }
 

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(p =>{
                this.crearMapa(p.coords)
            });
        }else{
            console.log("No position")
        }
    },
    mounted(){
       console.log(this.$route.params.ultimoIndice)
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
        ...mapState(["login","usuarioEmail","ultimoIndice"])
    },
    methods: {
        ...mapActions(["cerrarSesion","guardarNumero","guardarLiga","editarLiga"]),
        ...mapMutations(["setLigaReciente"]),
        guardar(){
            //Sí es el modo de editar entonces 
            if(this.modoEditar){
                this.modoEditar = false
            }else{
                //Sí el número está vacio se muestra un error
                if(this.numero != ""){
                    //Validar que sea un número
                    if(f.validarSiEsNumero(this.numero)){
                        this.guardarNumero(this.numero)
                        this.modoEditar = true
                        //Se elimina el error
                        this.error = ''
                    }else{
                                            
                        //Se muestra el mensaje de error
                        this.error = 'Debe de ser un número entero de 10 digitos'
                    }

                    
                }else{
                    
                    //Se muestra el mensaje de error
                    this.error = 'El número es requerido'
                }
            }

            
        },
        borrarNumero(){
            this.numero = ''
        },
        generarLiga(){
            //Se construye la liga que se guardará
            let liga = `https://wa.me/521${this.numero}?text=${f.mensajeSinEspacios(this.mensaje)}`;


            let liga_obj = {
                liga,direccion:this.direccion_actual,
                mensaje:f.mensajeSinEspacios(this.mensaje),
                numero:this.numero
            };

            //Sí el nombre de la liga no ha sido definida
            if(this.$route.params.liga_obj === undefined){
                //Se llama la función que guardará la liga
                this.guardarLiga(liga_obj)  
            }else{
                this.editarLiga(liga_obj)
            }
            //Se muestra la vista de los detalles de la liga
            router.push({name:'vista_previa'})
            //Se agrega la liga reciente
            this.setLigaReciente(liga_obj)
            
   
            
        },
        async crearMapa(p){
             try {
                const google = await gmapsInit();
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({'location':{lat: p.latitude, lng: p.longitude}}, (results, status) => {
                if (status !== 'OK' || !results[0]) {
                    this.direccion_actual = 'México'
                }
                    this.direccion_actual = results[0].formatted_address;
                });
            } catch (error) {
                console.error(error);
            }
        }

    }
}
</script>