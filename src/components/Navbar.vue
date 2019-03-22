<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="atlas1" fixed="top">
      <div class="container">
        <router-link :to="{name: 'home'}" class="navbar-brand">
          <img src="@/assets/img/logo.png" alt="ATLAS" height="50">
        </router-link>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <router-link
              :to="{name: 'home'}"
              class="nav-link"
              :class="{'active-route': isActive('home')}"
            >Início</router-link>
            <router-link
              :to="{name: 'events'}"
              class="nav-link"
              :class="{'active-route': isActive('events')}"
            >Eventos</router-link>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <router-link
              :to="{name: 'login'}"
              class="nav-link"
              :class="{'active-route': isActive('login')}"
              v-if="getLoggedUserId === -1"
            >Iniciar sessão</router-link>
            <div v-else>
              <b-dropdown variant="link" id="nav-user-logged">
                <template slot="button-content">
                  <b-img
                    rounded="circle"
                    height="35"
                    width="35"
                    fluid
                    :src="getUserById(getLoggedUserId).picture"
                    :alt="getUserById(getLoggedUserId).username"
                  />
                  <span
                    class="ml-2"
                    style="color: white;"
                  >@{{ getUserById(getLoggedUserId).username }}</span>
                </template>
                <template v-if="getUserById(getLoggedUserId).profileId !== 1">
                  <router-link :to="{name: 'backoffice'}" class="dropdown-item">Painel de controlo</router-link>
                  <b-dropdown-divider></b-dropdown-divider>
                </template>
                <router-link
                  :to="{name: 'notifications', params: { username: getUserById(getLoggedUserId).id }}"
                  class="dropdown-item"
                >Notificações</router-link>
                <router-link
                  :to="{name: 'profile', params: { username: getUserById(getLoggedUserId).username }}"
                  class="dropdown-item"
                >Perfil</router-link>
                <b-dropdown-item-button @click="userLoggedOut">Terminar sessão</b-dropdown-item-button>
              </b-dropdown>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  methods: {
    isActive(route) {
      return this.$route.name === route;
    },
    ...mapActions(["userLoggedOut"])
  },
  computed: {
    ...mapGetters(["getLoggedUserId", "getUserById"])
  }
};
</script>

<style scoped>
.navbar-brand:hover {
  transform: scale(1.05);
}
.nav-link {
  font-size: 1.05rem;
  color: white !important;
  font-weight: 600;
  cursor: pointer;
}
.nav-link:hover {
  color: #0087ca !important;
}
.active-route {
  color: #0087ca !important;
}
#nav-user-logged:hover {
  text-decoration: none !important;
}
.dropdown-item:active {
  background-color: #00225b;
}
</style>