import Vue from "vue"
import Router from "vue-router"
import HomeView from "@/views/Home.vue"
import EventsView from "@/views/Events/Events.vue"
import EventInfoView from "@/views/Events/EventInfo.vue"
import ForumView from "@/views/Forum/Forum.vue"
import ForumTitlesView from "@/views/Forum/ForumTitles.vue"
import ForumTitleView from "@/views/Forum/ForumTitle.vue"
import TopicView from "@/views/Forum/Topic.vue"
import AboutView from "@/views/About.vue"
import LoginView from "@/views/Login.vue"
import SignUpView from "@/views/SignUp.vue"
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
      name: "home",
      component: HomeView,
      meta: {
        title: "Início"
      }
    },
    {
      path: "/eventos",
      name: "events",
      component: EventsView,
      meta: {
        title: "Eventos"
      }
    },
    {
      path: "/evento/:id",
      name: "eventsInfo",
      component: EventInfoView
    },
    {
      path: "/forum",
      name: "forum",
      component: ForumView
    },
    {
      path: "/forum/f",
      name: "forumTitles",
      component: ForumTitlesView
    },
    {
      path: "/forum/f/:forumTitle",
      name: "forumTitle",
      component: ForumTitleView
    },
    {
      path: "/forum/f/:forumTitle/:id",
      name: "topic",
      component: TopicView
    },
    {
      path: "/sobre",
      name: "about",
      component: AboutView
    },
    {
      path: "/iniciar-sessao",
      name: "login",
      component: LoginView
    },
    {
      path: "/criar-conta",
      name: "signup",
      component: SignUpView
    },
    {
      path: "/painel-controlo",
      name: "backoffice",
      component: BackofficeHomeView,
      meta: {
        requiresAuth: true,
        authorizedProfiles: [2, 3]
      },
      children: [
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