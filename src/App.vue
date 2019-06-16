<template>
	<div id="app">
		<div v-if="loading" class="row">
			<div class="ml-auto mr-auto">
				<p class="mb-5">&nbsp;</p>
				<b-spinner
					variant="atlas"
					label="A carregar..."
					style="width: 8rem; height: 8rem;"
					class="mt-5"
				></b-spinner>
			</div>
		</div>
		<div v-else>
			<transition name="fade" mode="out-in">
				<router-view/>
			</transition>
			<vue-snotify></vue-snotify>
			<!--<Chat v-if="getLoggedUserId !== -1"></Chat>-->
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
//import Chat from "@/components/Chat.vue";

export default {
	watch: {
		$route(to, from) {
			if (to.name === "events" && from.name !== "events") {
			}
		}
	},
	data() {
		return {
			loading: false
		}
	},
	methods: {
		...mapActions(["userLoggedIn", "loadUsers", "loadTags"]),
		async loadLoggedUser() {
			this.loading = true
			try {
				const response = await this.$http.get("/auth/jwt")
				this.$store.commit("REFRESHED_PAGE", response.data)
				this.loading = false
			} catch (err) {
				if (err.response.status === 401) {
					// removes jwt cookie, as it isn't valid
					document.cookie = "jwt" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
				}
				if (err.response.status !== 503) {
					this.loading = false
				}
			}
		}
	},
	created() {
		this.$store.commit("GET_JWT_COOKIE")
		if (this.getJwt) {
			this.$http.defaults.headers.common["Authorization"] = `Bearer ${
				this.getJwt
			}`
			this.loadLoggedUser()
		}

		this.$store.subscribe(mutation => {
			switch (mutation.type) {
				case "USER_LOGGED_IN":
					this.$snotify.success(
						`Bem vindo, ${this.getLoggedUser.username}!`,
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
					this.$snotify.info("Faça login com os seus dados.", "Conta criada.", {
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
		...mapGetters([
			"getJwt",
			"getLoggedUser"
		])
	}
}
</script>


<style lang="scss">
@import "@/assets/styles/scss/custom-bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "~vue-snotify/styles/material";
html, body {
    max-width: 100%;
    overflow-x: hidden;
}

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