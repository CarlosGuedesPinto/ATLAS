<template>
  <div class="mt-5">
    <div v-if="getNotifications.length">
      <TitleAtlas>As Minhas Notificações</TitleAtlas>
    </div>
  </div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue";
import Panel from "@/components/Panel.vue";
import Carousel from "vue-owl-carousel";
import EventCard from "@/components/EventCard.vue";
import EventListItem from "@/components/EventListItem.vue";

import { mapGetters } from "vuex";

export default {
  components: { TitleAtlas, Panel, Carousel, EventCard, EventListItem },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  computed: {
    ...mapGetters(["getNotificationsByUserId"]),

    getNotifications() {
      return this.getNotificationsByUserId;
    }
  }
};
</script>

