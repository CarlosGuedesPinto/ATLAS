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
		...mapActions(["setUsers", "userLoggedIn", "setCourses", "setTags", "setEvents"])
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

		if (!localStorage.courses) {
			localStorage.courses = JSON.stringify(database.courses)
			this.setCourses(database.courses)
		} else {
			this.setCourses(JSON.parse(localStorage.courses))
		}

		if (!localStorage.tags) {
			localStorage.tags = JSON.stringify(database.tags)
			this.setTags(database.tags)
		} else {
			this.setTags(JSON.parse(localStorage.tags))
		}

		if (!localStorage.events) {
			localStorage.events = JSON.stringify(database.events)
			this.setEvents(database.events)
		} else {
			this.setEvents(JSON.parse(localStorage.events))
		}

		this.$store.subscribe(mutation => {
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
				case "SIGNED_UP":
					this.$snotify.info(
						"Faça login com os seus dados.",
						"Conta criada.",
						{
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							position: "centerTop"
						}
					)
					break
			}
		})
	},
	computed: {
		...mapGetters([
			"getUsers",
			"getLoggedUserId",
			"getUserById",
			"getCourses",
			"getTags",
			"getEvents"
		])
	},
	destroyed() {
		localStorage.users = JSON.stringify(this.getUsers)
		localStorage.loggedUserId = JSON.stringify(this.getLoggedUserId)
		localStorage.courses = JSON.stringify(this.getCourses)
		localStorage.tags = JSON.stringify(this.getTags)
		localStorage.events = JSON.stringify(this.getEvents)
	}
}
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
    background-color: #00225B;
}
.atlas-bold {
	font-weight: 600;
}
.atlas-semi-bold {
	font-weight: 500;
}
</style>