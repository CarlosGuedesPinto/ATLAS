import Vue from "vue"
import Router from "vue-router"
import MainView from "@/views/Main.vue"
/*
import HomeView from "@/views/Home.vue"
import EventsView from "@/views/Events/Events.vue"
import EventInfoView from "@/views/Events/EventInfo.vue"
import EventDiscussionView from "@/views/Events/EventDiscussion.vue"
import LoginView from "@/views/Login.vue"
import SignUpView from "@/views/SignUp.vue"
import ProfileView from "@/views/Profile.vue"
import BackofficeView from "@/views/Backoffice/Backoffice.vue"
import BackofficeHomeView from "@/views/Backoffice/Home.vue"
import BackofficeUsersView from "@/views/Backoffice/Users.vue"
import BackofficeTagsView from "@/views/Backoffice/Tags.vue"
import BackofficeCoursesView from "@/views/Backoffice/Courses.vue"
import BackofficeEventsView from "@/views/Backoffice/Events.vue"
import Notifications from "@/views/Notifications.vue"
*/
const HomeView = () => import("@/views/Home.vue")
const EventsView = () => import("@/views/Events/Events.vue")
const EventInfoView = () => import("@/views/Events/EventInfo.vue")
const EventDiscussionView = () => import("@/views/Events/EventDiscussion.vue")
const LoginView = () => import("@/views/Login.vue")
const SignUpView = () => import("@/views/SignUp.vue")
const ProfileView = () => import("@/views/Profile.vue")
const BackofficeView = () => import("@/views/Backoffice/Backoffice.vue")
const BackofficeHomeView = () => import("@/views/Backoffice/Home.vue")
const BackofficeUsersView = () => import("@/views/Backoffice/Users.vue")
const BackofficeTagsView = () => import("@/views/Backoffice/Tags.vue")
const BackofficeCoursesView = () => import("@/views/Backoffice/Courses.vue")
const BackofficeEventsView = () => import("@/views/Backoffice/Events.vue")
const Notifications = () => import("@/views/Notifications.vue")


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
          path: "evento/:id/discussao/:discussionId",
          name: "eventDiscussion",
          component: EventDiscussionView
        },
        {
          path: "iniciar-sessao",
          name: "login",
          component: LoginView,
          meta: {
            requiresNotAuth: true
          }
        },
        {
          path: "criar-conta",
          name: "signup",
          component: SignUpView,
          meta: {
            requiresNotAuth: true
          }
        },
        {
          path: "perfil/:username",
          name: "profile",
          component: ProfileView
        },
        {
          path: "notificacoes",
          name: "notifications",
          component: Notifications,
          meta: {
            title: "Notificações",
            requiresAuth: true,
            authorizedProfiles: [1, 2, 3]
          }
        },
      ]
    },
    {
      path: "/painel-controlo",
      component: BackofficeView,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          name: "backoffice",
          component: BackofficeHomeView,
          meta: {
            authorizedProfiles: [2, 3]
          }
        },
        {
          path: "utilizadores",
          name: "backofficeUsers",
          component: BackofficeUsersView,
          meta: {
            authorizedProfiles: [3]
          }
        },
        {
          path: "tags",
          name: "backofficeTags",
          component: BackofficeTagsView,
          meta: {
            authorizedProfiles: [3]
          }
        },
        {
          path: "cursos",
          name: "backofficeCourses",
          component: BackofficeCoursesView,
          meta: {
            authorizedProfiles: [3]
          }
        },
        {
          path: "eventos",
          name: "backofficeEvents",
          component: BackofficeEventsView,
          meta: {
            authorizedProfiles: [2, 3]
          }
        }
      ]
    },
    {
      path: "*",
      redirect: { name: 'home' }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

import store from "@/store/store.js"
import axios from "axios"
const http = axios.create({
  baseURL: "https://atlas-server-gustavovasconcelos.c9users.io",
})

router.beforeEach(async (to, from, next) => {
  if (!from.name) {
    store.commit("GET_JWT_COOKIE")
    http.defaults.headers.common["Authorization"] = `Bearer ${
      store.getters.getJwt
      }`
  }
  let loggedUser = ""
  if (to.matched.some(route => route.meta.requiresAuth)) {
    try {
      const jwtResponse = await http.get("/auth/jwt")
      loggedUser = jwtResponse.data
    } catch (err) {
    }


    if (!loggedUser.profileId) {
      next({ name: "home" })
    } else {
      let hasAuthorization = to.matched.some(
        m => m.meta.authorizedProfiles ?
          m.meta.authorizedProfiles.some(
            authorizedProfile => authorizedProfile === loggedUser.profileId
          ) : false
      )

      if (!hasAuthorization && loggedUser.profileId === 1) {
        next({ name: "home" })
      } else if (!hasAuthorization && loggedUser.profileId === 2) {
        next({ name: "backoffice" })
      } else {
        next()
      }
    }
  } /*else if (to.matched.some(m => m.meta.requiresNotAuth) && loggedUser !== undefined) {
    next({ name: "home" })
  }*/
  next()
})

export default router