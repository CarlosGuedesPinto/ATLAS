<template>
	<vs-sidebar
		:parent="$refs.backofficeContainer"
		default-index="1"
		color="primary"
		spacer
		v-model="active"
		:hidden-background="true"
		click-not-close
		:reduce="sidebarReduced"
	>
		<vs-sidebar-item index="1" icon="question_answer">Dashboard</vs-sidebar-item>

		<vs-sidebar-item index="2" icon="gavel">History</vs-sidebar-item>

		<vs-sidebar-item index="3" icon="verified_user">Configurations</vs-sidebar-item>
		<vs-sidebar-item index="4" icon="account_box">Perfile</vs-sidebar-item>
		<vs-sidebar-item index="5">Card</vs-sidebar-item>
	</vs-sidebar>
</template>

<script>
export default {
	name: "BackofficeSidebar",
	data() {
		return {
			active: true,
			windowWidth: 0
		}
	},
	created() {
		window.addEventListener("resize", this.handleResize)
		this.handleResize()
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		}
	},
	computed: {
		sidebarReduced() {
			return this.windowWidth <= 990 ? true : false
		}
	}
}
</script>

<style>
</style>
