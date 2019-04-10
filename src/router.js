import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      meta:{
        requiresAuth:true
      },
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './components/app/Main.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './components/login/Login.vue')
    },
    {
      path: '/nueva_liga',
      name: 'nueva_liga',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/app/CrearBoton.vue')
    },
    {
      path: '/vista_previa',
      name: 'vista_previa',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/app/VistaPrevia.vue')
    }
    ,
    {
      path: '/copiado_exitosamente',
      name: 'copiado_exitosamente',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/app/LigaExitosa.vue')
    }
    ,
    {
      path: '/historial',
      name: 'historial',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/app/Historial.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {

  const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);

  const user = (localStorage.email)


  if (rutaProtegida === true && user === undefined) {
    next({
      path: '/login'
    })
  } else {
   next()
  }
})

export default router