<template>
	<div id="app">
		<Navbar></Navbar>
		<div id="main-container" class="container mt-4">
			<router-view/>
		</div>
		<AtlasFooter></AtlasFooter>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import AtlasFooter from "@/components/AtlasFooter.vue"
import database from "@/store/data.js"
export default {
	components: {
		Navbar,
		AtlasFooter
	},
	created() {
		if (!localStorage.users) {
			localStorage.users = JSON.stringify(database.users)
			this.$store.dispatch("setUsers", database.users)
		} else {
			this.$store.dispatch("setUsers", JSON.parse(localStorage.users))
		}
	}
}
</script>


<style lang="scss">
@import "@/assets/styles/scss/custom-bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";


#app {
	font-family: Exo, sans-serif;
	background-color: #f1f1f1;
}

#main-container {
	height: 2000px;
}
</style>
