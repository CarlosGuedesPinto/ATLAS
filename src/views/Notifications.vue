<template>
  <div class="mt-5">
    <div v-if="getNotifications.length">
      <TitleAtlas>As Minhas Notificações</TitleAtlas>
      <template>
          <NotificationCard
            v-for="not in getNotifications"
            :key="not.eventId"
            :event="getEventById(not.eventId)"
            class="mb-1"
          />
      </template>
    </div>
  </div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue";
import Panel from "@/components/Panel.vue";
//fimport Carousel from "vue-owl-carousel";
import NotificationCard from "@/components/NotificationCard.vue";
//import EventListItem from "@/components/EventListItem.vue";

import { mapGetters } from "vuex";

export default {
  components: { TitleAtlas, Panel, NotificationCard },
  data() {
    return {
    };
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  computed: {
    ...mapGetters(["getNotificationsByUserId", "getEventById", "getLoggedUserId"]),

    getNotifications() {
      return this.getNotificationsByUserId(this.getLoggedUserId); //userLogged
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    console.log(this.getNotifications)
  }
};
</script>

