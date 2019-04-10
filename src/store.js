import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import f from './utils/funciones'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: (localStorage.email) ? true : false, //Sí la sesión ha sido iniciada entonces se asigna el valor 'true'
    usuarios:[
      {
        uid:1,
        email:'admin@admin.com',
        password:'12345',
        numero: null
      },
      {
        uid:2,
        email:'admin2@admin.com',
        password:'123456',
        numero:null
      },
      {
        uid:3,
        email:'admin3@admin.com',
        password:'1234567',
        numero:null
      }
  ],
    usuarioEmail: (localStorage.email) ? localStorage.email : '',
    ligaReciente:null,
    ultimoIndice:0,
    filtroLigas:[]
  },
  mutations: {
    setLogin(state){
      state.login = !state.login;
    },
    setLigaReciente(state,ligaReciente){
      state.ligaReciente = ligaReciente
    },
    setUltimoIndice(state,indice){
      state.ultimoIndice = indice
    },
    setLigas(state, ligas){
      state.filtroLigas = ligas
    },
    setFiltroLigas(state, filtro){
   
      var json_object = JSON.parse(localStorage.getItem(state.usuarioEmail)); // convert string to object
      //Filtra los resultados por liga o por fecha
      state.filtroLigas = json_object.ligas.filter(u => u.liga.toUpperCase().includes(filtro.toUpperCase()) || u.fecha_formato.includes(filtro.toUpperCase()))
    },
    setFiltroFechasLigas(state, fechas){
   
      var json_object = JSON.parse(localStorage.getItem(state.usuarioEmail)); // convert string to object
      //Filtra los resultados por liga o por fecha
      state.filtroLigas = json_object.ligas.filter(
        u => u.fecha_registro >= fechas.fecha 

      && u.fecha_registro <= fechas.fecha2 )
    },
    validarUsuario(state,usuario){
      //Se valida que el usuario exista
      let usuarioActivo = state.usuarios.filter(u => u.email == usuario.email && u.password == usuario.password)
      //Sí se obtuvo un usuario entonces se valida una sesión correcta
      if(usuarioActivo.length == 0){
        state.login = false
      }else{
        state.login = true
        //Sí ya existe un usuario entonces no se guarda 
        if(localStorage.getItem(usuario.email) == null){

          //Crea un nuevo usuario
          let nuevo_usuario = {
            email:usuario.email,
            numero:usuario.numero,
            ligas:[]
          }

          localStorage.setItem(usuario.email,JSON.stringify(nuevo_usuario))
          localStorage.email = usuario.email
          state.usuarioEmail = usuario.email
        }
        router.push({name:'home'})
      }
    },
    guardarNumero(state,numero){
      var json_object = JSON.parse(localStorage.getItem(state.usuarioEmail)); // convert string to object
      json_object["numero"] = numero; // add value
      localStorage.setItem(state.usuarioEmail,JSON.stringify(json_object))
    },
    editarLiga(state,{json_object,liga}){
      //Obtiene el mensaje y lo modifica con el nuevo valor
      json_object.ligas[state.ultimoIndice].mensaje = f.mensajeSinEspacios(liga.mensaje,true),
      //Guarda nuevamente los arreglos
      localStorage.setItem(localStorage.getItem("email"),JSON.stringify(json_object))
    }
  },
  actions: {
    iniciarSesion({commit},user){
      commit('validarUsuario',user);
    },
    cerrarSesion({commit}){
   //   localStorage.clear();
      commit('setLogin');
      router.push({name:'login'})
    },
    guardarNumero({commit},numero){
      commit('guardarNumero',numero)
    },
    guardarLiga({commit},liga){
        //obtiene el correo del usuario
        let obj = localStorage.getItem(localStorage.getItem("email"));
        //Obtiene el 
        var json_object = JSON.parse(obj); // convert string to object


        json_object.ligas.push(
          {
            liga:liga.liga,
            direccion:liga.direccion,
            vistas:0,
            numero:liga.numero,
            mensaje:f.mensajeSinEspacios(liga.mensaje,true),
            fecha_registro:new Date(),
            fecha_formato:f.formatoFecha(new Date())
          }
        )
        //Obtiene el último indice del array
        let ultimoIndice = json_object.ligas.length - 1 ;
        //Guarda nuevamente los arreglos
        localStorage.setItem(localStorage.getItem("email"),JSON.stringify(json_object))
        
        commit("setUltimoIndice",ultimoIndice)


    },
    editarLiga({commit},liga){
      //obtiene el correo del usuario
      let obj = localStorage.getItem(localStorage.getItem("email"));
      //Obtiene el 
      var json_object = JSON.parse(obj); // convert string to object
      commit("editarLiga",{json_object,liga});
    },
    buscadorLigas({commit},filtro){
      commit("setFiltroLigas",filtro);
    },
    filtrarFechas({commit},fechas){
      commit("setFiltroFechasLigas",fechas)
    }
  }
})
