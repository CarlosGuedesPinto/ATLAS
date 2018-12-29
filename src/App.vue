<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import database from "@/store/data.js"

export default {
	methods: {
		...mapActions(["setUsers", "setInstitutions", "userLoggedIn"])
	},
	created() {
		window.addEventListener("beforeunload", () => {
			this.$destroy()
		})

		if (!localStorage.users) {
			localStorage.users = JSON.stringify(database.users)
			this.setUsers(database.users)
		} else {
			this.setUsers(JSON.parse(localStorage.users))
		}

		if (localStorage.loggedUserId) {
			this.userLoggedIn(parseInt(localStorage.loggedUserId))
		}

		if (!localStorage.institutions) {
			localStorage.institutions = JSON.stringify(database.institutions)
			this.setInstitutions(database.institutions)
		} else {
			this.setInstitutions(JSON.parse(localStorage.institutions))
		}

		this.$store.subscribe((mutation, state) => {
			switch (mutation.type) {
				case "USER_LOGGED_IN":
					this.$snotify.success(
						`Bem vindo, ${
							this.getUserById(this.getLoggedUserId).username
						}!`,
						"Sessão iniciada",
						{
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							position: "centerTop"
						}
					)
					break
				case "USER_LOGGED_OUT":
					this.$snotify.success("Até logo!", "Sessão terminada", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						position: "centerTop"
					})
					break
			}
		})
	},
	computed: {
		...mapGetters(["getUsers", "getInstitutions", "getLoggedUserId", "getUserById"])
	},
	destroyed() {
		localStorage.users = JSON.stringify(this.getUsers)
		localStorage.institutions = JSON.stringify(this.getInstitutions)
		localStorage.loggedUserId = JSON.stringify(this.getLoggedUserId)
	}
}
</script>


<style lang="scss">
@import "@/assets/styles/scss/custom-bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "~vue-snotify/styles/material";

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

.vertical-center {
	min-height: 100%; /* Fallback for browsers do NOT support vh unit */
	min-height: 100vh; /* These two lines are counted as one 🙂       */
	display: flex;
	align-items: center;
}
</style>
<!--
computed: {
		...mapGetters(["getLoggedUserId", "getUserById"])
	},
	created() {
		this.$store.subscribe((mutation, state) => {
			switch (mutation.type) {
				case "USER_LOGGED_IN":
					this.$snotify.success(
						`Bem vindo, ${
							this.getUserById(this.getLoggedUserId).username
						}!`,
						"Sessão iniciada",
						{
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							position: "centerTop"
						}
					)
					break
				case "USER_LOGGED_OUT":
					this.$snotify.success("Até logo!", "Sessão terminada", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						position: "centerTop"
					})
					break
			}
		})
	}

	-->