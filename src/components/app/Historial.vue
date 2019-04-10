<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-12 col-md-6">
                <div class="historial">
                    <div class="item historial-titulo">
                        <h4 class="titulo">Historial</h4>
                    </div>
                    
                    <div class="item filtro-fechas">
                        <input type="date" class="fecha-1" v-model="date" format="dd/MM/yyyy" placeholder="--/---/--">
                  
                        <input type="date" class="fecha-2 ml-2" v-model="date2" format="dd/MM/yyyy" placeholder="--/---/--"
                            >
                    </div>
                    


                    <input type="text" class="form-control mt-2" @keyup="filtrarResultados()" v-model="filtro">
                    <paginate :key="filtroLigas"  name="filtroLigas" :list="filtroLigas" :per="5" class="paginador">
                        <div v-for="(liga,index) in paginated('filtroLigas')" :key="index" class="item mensaje">
                            <div class="mensaje-cabecera mt-1">
                                <div class="mensaje-fecha">
                                    <div>
                                        
                                        <span class="texto-mensaje">Fecha</span> 
                                    </div>  
                                    <div>
                                        
                                        <span class="texto-mensaje">{{liga.fecha_formato}}</span> 
                                    </div>
                                </div>
                                <div class="mensaje-texto">
                                    <div>
                                        <span class="texto-mensaje">Mensaje</span> 
                                    </div>  
                                    <div>
                                        <span class="texto-mensaje word-break">{{liga.mensaje}}</span> 
                                    </div>
                                </div>
                            </div>
                            <div class="mensaje-pie mt-1">
                                <div class="mensaje-celular">
                                    <div>
                                    <span class="texto-mensaje"> Celular </span>
                                    </div>  
                                    <div>
                                        <span class="texto-mensaje">{{liga.numero}}</span>
                                    </div>
                                </div>
                                <div class="mensaje-vistas">
                                    <div>
                                        <span class="texto-mensaje">Cantidad</span>
                                    </div>  
                                    <div>
                                        5
                                    </div>
                                </div>
                                <div class="mensaje-opciones">
                                    <div class="mr-1">
                                        <button class="editar bg-danger text-white sin-borde">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    </div>  
                                    <div>
                                        <button class="editar bg-primary text-white sin-borde">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </paginate>
                    <paginate-links for="filtroLigas"></paginate-links>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//Se importa vuex para tener acceso al 'store'
import {mapActions,mapState, mapMutations} from 'vuex'

export default {
    data(){
        return{
             paginate:['filtroLigas'],
             filtro:'',
             date:'',
             date2:'',
             maxDatetime: new Date().toString()
        }
    },
    mounted(){
        //Obtiene las ligas recientes
        let ligas = JSON.parse(localStorage.getItem(this.usuarioEmail));

        this.setLigas(ligas.ligas)

    },
    computed:{
        ...mapState(["login","usuarioEmail","filtroLigas"])
    },
    methods: {
        ...mapActions(["cerrarSesion","guardarNumero","guardarLiga","buscadorLigas","filtrarFechas"]),
        ...mapMutations(["setLigas"]),
        filtrarResultados(){
            this.buscadorLigas(this.filtro)
        },
        validarFechas(){
            if(this.date > this.date2){
                console.log("La fecha no puede ser menor a la final")
            }else if(this.date < this.date2){
                console.log("Se hace el filtrado de las ligas")
                this.filtrarFechas({
                    fecha:this.date,
                    fecha2:this.date2
                })
            }else{
                console.log("Another option")
                this.filtrarFechas({
                    fecha:this.date,
                    fecha2:this.date2
                })
            }
        }
        
    },
    watch:{
        date2(){
            this.validarFechas()
        },
        date(){
            if(this.date2 !== "" || this.date2 !== undefined || this.date2 !== null){
                this.validarFechas()
            }
     
        }
    }
}
</script>