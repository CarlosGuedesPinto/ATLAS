import Vue from "vue"
import Router from "vue-router"
import HomeView from "@/views/Home.vue"
import NewsView from "@/views/News/News.vue"
import NewsInfoView from "@/views/News/NewsInfo.vue"
import EventsView from "@/views/Events/Events.vue"
import EventInfoView from "@/views/Events/EventInfo.vue"
import ForumView from "@/views/Forum/Forum.vue"
import ForumTitlesView from "@/views/Forum/ForumTitles.vue"
import ForumTitleView from "@/views/Forum/ForumTitle.vue"
import TopicView from "@/views/Forum/Topic.vue"
import AboutView from "@/views/About.vue"




import NotFound from "@/views/NotFound.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
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
      path: "*",
      component: NotFound
    }
  ]
})
