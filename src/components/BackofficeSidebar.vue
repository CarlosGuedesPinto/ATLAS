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
			default-index="1"
			color="primary"
			class="sidebar"
			:staticPosition="true"
			v-show="sidebarActive"
			:hidden-background="true"
			:reduce="sidebarReduced"
		>
			<vs-sidebar-item index="1" icon="question_answer" :to="{name: 'backoffice'}">Início</vs-sidebar-item>
			<vs-sidebar-item index="2" icon="person" :to="{name: 'backofficeUsers'}">Utilizadores</vs-sidebar-item>
			<vs-sidebar-group title="Eventos">
				<vs-sidebar-item index="3" icon="question_answer">Meus eventos</vs-sidebar-item>
				<vs-sidebar-item index="4" icon="question_answer">Criar evento</vs-sidebar-item>
				<vs-sidebar-group title="Store">
					<vs-sidebar-item index="2.1" icon="store">Store</vs-sidebar-item>
					<vs-sidebar-item index="2.2" icon="nature_people">Nature</vs-sidebar-item>
					<vs-sidebar-item index="2.3" icon="style">Style</vs-sidebar-item>
				</vs-sidebar-group>
				<vs-sidebar-item index="2" icon="gavel">History</vs-sidebar-item>
				<vs-sidebar-item index="3" icon="https">security</vs-sidebar-item>
				<vs-sidebar-item index="4" icon="help">Help</vs-sidebar-item>
			</vs-sidebar-group>
		</vs-sidebar>
	</div>
</template>

<script>
import { mapActions } from "vuex"

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
		sidebarReduced() {
			return this.windowWidth <= 768 ? true : false
		}
	}
}
</script>

<style>
.sidebar {
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	width: 250px;
	height: 100%;
	overflow-x: hidden;
	margin-top: 75px;
}
</style>
