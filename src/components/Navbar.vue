<template>
	<div id="nav-container">
		<b-navbar toggleable="md" type="dark" variant="atlas1">
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
						<router-link
							:to="{name: 'about'}"
							class="nav-link"
							:class="{'active-route': isActive('about')}"
						>Sobre</router-link>
					</b-navbar-nav>

					<b-navbar-nav class="ml-auto">
						<span class="nav-link" @click="modalShow = !modalShow">Login</span>
					</b-navbar-nav>
				</b-collapse>
			</div>
		</b-navbar>
		<b-modal v-model="modalShow">Hello From Modal!</b-modal>
	</div>
</template>

<script>
export default {
	name: "Navbar",
	data() {
		return {
			modalShow: false
		}
	},
	methods: {
		isActive(route) {
            switch(route) {
                case "home": return this.$route.name === route; break
                case "events":
                    return this.$route.name === route || this.$route.name === "eventsInfo"
                    break
                case "about": return this.$route.name === route; break
            }
		}
	}
}
</script>

<style scoped>
#nav-container {
	box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.75);
}
.nav-link {
	font-size: 1.05rem;
	color: white !important;
	font-weight: 600;
	cursor: pointer;
}
.nav-link:hover {
	color: #008fc1 !important;
}
.active-route {
	color: #008fc1 !important;
}
</style>
