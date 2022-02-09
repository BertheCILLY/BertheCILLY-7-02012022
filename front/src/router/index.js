
import Home from '../views/Home';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
 
  {
    path: '/tchat',
    name: 'Tchat',
    component:() => import ('../views/Tchat.vue'),
    meta: {
      requireAuth: true,
    },
    props:true
  },
  {
    path: '/profil',
    name: 'Profil',
    component:() => import ('../views/Profil.vue')
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// router.beforeEach((to, from, next) => {
//   if (to.matched.some((route) => route.meta.requireAuth)) {
//     if (localStorage.getItem('User')) {

//       axios.get('...', data{
//         token:l
//       })
//       next()
//     } else {
//       next('/')
//     }
//   } else {
//     next()
//   }
// })


export default router