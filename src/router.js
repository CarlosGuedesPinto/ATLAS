import Vue from "vue"
import Router from "vue-router"
import Home from "@/views/Home.vue"
import NewsView from "@/views/News/News.vue"
import NewsInfoView from "@/views/News/NewsInfo.vue"
import EventsView from "@/views/Events/Events.vue"
import EventInfoView from "@/views/Events/EventInfo.vue"
import ForumView from "@/views/Forum/Forum.vue"
import NotFound from "@/views/NotFound.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/noticias",
      name: "news",
      component: NewsView,
    },
    
    {
      path: "/noticia/:id",
      name: "newsInfo",
      component: NewsInfoView
    },
    {
      path: "/eventos",
      name: "events",
      component: EventsView
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
      path: "*",
      component: NotFound
    }
  ]
})
