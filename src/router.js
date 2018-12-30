import Vue from "vue"
import Router from "vue-router"
import MainView from "@/views/Main.vue"
import HomeView from "@/views/Home.vue"
import EventsView from "@/views/Events/Events.vue"
import EventInfoView from "@/views/Events/EventInfo.vue"
import AboutView from "@/views/About.vue"
import LoginView from "@/views/Login.vue"
import SignUpView from "@/views/SignUp.vue"
import BackofficeView from "@/views/Backoffice/Backoffice.vue"
import BackofficeHomeView from "@/views/Backoffice/Home.vue"
import BackofficeUsersView from "@/views/Backoffice/Users.vue"
import NotFound from "@/views/NotFound.vue"

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: MainView,
      meta: {
        title: "Início"
      },
      children: [
        {
          path: "",
          component: HomeView,
          name: "home",
          meta: {
            title: "Início"
          }
        },
        {
          path: "eventos",
          name: "events",
          component: EventsView,
          meta: {
            title: "Eventos"
          }
        },
        {
          path: "evento/:id",
          name: "eventsInfo",
          component: EventInfoView
        },
        {
          path: "sobre",
          name: "about",
          component: AboutView
        },
        {
          path: "iniciar-sessao",
          name: "login",
          component: LoginView
        },
        {
          path: "criar-conta",
          name: "signup",
          component: SignUpView
        }
      ]
    },
    {
      path: "/painel-controlo",
      component: BackofficeView,
      meta: {
        requiresAuth: true,
        authorizedProfiles: [2, 3]
      },
      children: [
        { path: "", name: "backoffice", component: BackofficeHomeView },
        { path: "utilizadores", name: "backofficeUsers", component: BackofficeUsersView }
      ]
    },
    {
      path: "*",
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

import store from "@/store/store.js"

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.loggedUserId === -1) {
      next({ name: "login" })
    } else {
      let hasAuthorization = to.meta.authorizedProfiles.some(
        authorizedProfile => authorizedProfile === store.getters.getUserById(store.state.loggedUserId).profileId
      )
      if (!hasAuthorization) {
        next({ name: "home" })
      } else {
        next()
      }
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router