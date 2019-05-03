<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <vue-snotify></vue-snotify>
    <!--<Chat v-if="getLoggedUserId !== -1"></Chat>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//import Chat from "@/components/Chat.vue";

export default {
  methods: {
    ...mapActions([
      "userLoggedIn"
    ])
  },
  async created() {
    this.$store.subscribe(mutation => {
      switch (mutation.type) {
        case "USER_LOGGED_IN":
          this.$snotify.success(
            `Bem vindo, ${this.getUserById(this.getLoggedUserId).username}!`,
            "Sessão iniciada",
            {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              position: "centerTop"
            }
          );
          break;
        case "USER_LOGGED_OUT":
          this.$snotify.success("Até logo!", "Sessão terminada", {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            position: "centerTop"
          });
          break;
        case "SIGNED_UP":
          this.$snotify.info("Faça login com os seus dados.", "Conta criada.", {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            position: "centerTop"
          });
          break;
      }
    });
  },
  computed: {
    ...mapGetters([
      "getUsers",
      "getLoggedUserId",
      "getUserById",
      "getCourses",
      "getTags",
      "getEvents",
      "getMedals"
    ])
  }
};
</script>


<style lang="scss">
@import "@/assets/styles/scss/custom-bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "~vue-snotify/styles/material";
#app {
  font-family: Exo, sans-serif;
  background: #f1f1f1;
}

.form-control:focus {
  border-color: #008fc1;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(0, 142, 193, 0.6);
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #00225b;
}
.atlas-bold {
  font-weight: 600;
}
.atlas-semi-bold {
  font-weight: 500;
}
</style>