<template>
    <div id="login">
        <div id="container" class="container ">
            <div class="row justify-content-center">
                <div class="col-sm-4 bg-gradient">
                    <form  @submit.prevent="checkForm" class="login">


                        <div class="item login-titulo">
                            <img class="hannah-icon" src="../../assets/Hannah.png">
                        </div>
                        <div class="item">
                            <input type="text" v-model="user.email" autofocus>
                        </div>
                        <div class="item">
                            <input type="text" v-model="user.password">
                        </div>
                        <small class="text-danger">{{error}}</small>
                        <div class="item">
                            <input type="submit" value="INICIAR SESIÓN">
                            <label for="" class="d-block"><span>Olvide mi contraseña</span></label>    
                            
                        </div>
                        
                        
                        
                    </form>
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
           user:{
                email:'',
                password: '',
                numero:null,
                ligas:[]
           },
           error:''
        }
    },
    computed:{
        ...mapState(["login"])
    },
    methods:{
        ...mapActions(["iniciarSesion"]),
         checkForm(){
            //Sí el email está vacio entonces se muestra el mensaje de error
            if (this.user.email == "") {
                this.error = 'El correo electrónico es requerido'
          }else{      
              //Sí el email está en formato correcto entonces se valida la contraseña
                if(this.validEmail(this.user.email)){
                    //Sí la contraseña es vacia
                    if (this.user.password == "")
                        this.error = 'La contraseña es requerida'
                    else{
                        this.error = ''
                        //Se llama el metódo de iniciar sesión
                        this.iniciarSesion(this.user)
                    }
                }else{//Sí el email es incorrecto entonces se muestra el mensaje de error
                    this.error = 'El correo no parece ser valido.'
                }

                
            }
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>
