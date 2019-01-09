<template>
	<div refs="backoffice">
		<b-navbar toggleable="sm" type="dark" variant="atlas1" fixed="top">
			<div class="container">
				<router-link :to="{name: 'home'}" class="navbar-brand ml-auto mr-auto">
					<img src="@/assets/img/logo.png" alt="ATLAS" height="50">
				</router-link>
			</div>
		</b-navbar>

		<vs-sidebar
			:parent="$refs.backoffice"
			:default-index="getIndex"
			color="primary"
			class="sidebar"
			:staticPosition="true"
			v-show="sidebarActive"
			:hidden-background="true"
			:reduce="sidebarReduced"
		>
			<vs-sidebar-item index="1" icon="question_answer" :to="{ name: 'backoffice' }">Início</vs-sidebar-item>
			<vs-sidebar-item
				index="2"
				icon="person"
				:to="{name: 'backofficeUsers'}"
				v-if="getUserById(getLoggedUserId).profileId === 3"
			>Utilizadores</vs-sidebar-item>
			<vs-sidebar-item
				index="3"
				icon="local_offer"
				:to="{name: 'backofficeTags'}"
				v-if="getUserById(getLoggedUserId).profileId === 3"
			>Tags</vs-sidebar-item>
			<vs-sidebar-item
				index="4"
				icon="school"
				:to="{name: 'backofficeCourses'}"
				v-if="getUserById(getLoggedUserId).profileId === 3"
			>Cursos</vs-sidebar-item>
			<vs-sidebar-item
				index="5"
				icon="event"
				:to="{ name: 'backofficeEvents' }"
			>{{ getUserById(getLoggedUserId).profileId === 2 ? "Meus eventos" : "Eventos" }}</vs-sidebar-item>
		</vs-sidebar>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
	name: "BackofficeSidebar",
	data() {
		return {
			sidebarActive: true,
			active: false,
			windowWidth: 0,
			windowHeight: 0
		}
	},
	created() {
		window.addEventListener("resize", this.handleResize)
		this.handleResize()
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
			this.windowHeight = window.innerHeight
		},
		toggleSidebar() {
			this.sidebarActive = !this.sidebarActive
			this.toggleBackofficeSidebar(this.sidebarActive)
		},
		...mapActions(["toggleBackofficeSidebar"])
	},
	computed: {
		...mapGetters(["getUserById", "getLoggedUserId"]),
		sidebarReduced() {
			return this.windowWidth <= 768 ? true : false
		},
		getIndex() {
			switch (this.$route.name) {
				case "backoffice":
					return 1
				case "backofficeUsers":
					return 2
				case "backofficeTags":
					return 3
				case "backofficeCourses":
					return 4
				case "backofficeEvents":
					return 5
			}
		}
	}
}
</script>

<style>
.sidebar {
	position: fixed;
	z-index: 2;
	top: 0;
	left: 0;
	width: 250px;
	height: 100%;
	overflow-x: hidden;
	margin-top: 75px;
}
</style>
