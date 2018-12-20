<template>
	<div id="app">
		<Navbar></Navbar>
		<div id="main-container" class="container py-4">
			<transition name="fade" mode="out-in">
				<router-view/>
			</transition>
		</div>
		<AtlasFooter></AtlasFooter>
	</div>
</template>

<script>
import { mapActions } from "vuex"

import Navbar from "@/components/Navbar.vue"
import AtlasFooter from "@/components/AtlasFooter.vue"
import database from "@/store/data.js"
export default {
	components: {
		Navbar,
		AtlasFooter
	},
	methods: {
		...mapActions(["setUsers", "setInstitutions"])
	},
	created() {
		if (!localStorage.users) {
			localStorage.users = JSON.stringify(database.users)
			this.setUsers(database.users)
		} else {
			this.setUsers(JSON.parse(localStorage.users))
		}

		if (!localStorage.institutions) {
			localStorage.institutions = JSON.stringify(database.institutions)
			this.setInstitutions(database.institutions)
		} else {
			this.setInstitutions(JSON.parse(localStorage.institutions))
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
	margin-bottom: 100px;
}
.form-control:focus {
	border-color: #008fc1;
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
		0 0 8px rgba(0, 142, 193, 0.6);
}
</style>
