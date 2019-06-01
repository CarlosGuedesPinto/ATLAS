<template>
	<div class="row">
		<Panel title="Iniciar sessão" class="col-md-8 col-sm-9 col-10 mr-auto ml-auto">
			<b-form @submit.prevent="verifyCredentials()">
				<b-form-group
					label="Utilizador"
					label-for="username"
					:invalid-feedback="usernameInvalidFeedback"
					:state="usernameState"
					class="mt-4"
				>
					<b-form-input
						id="username"
						:state="usernameState"
						v-model="username"
						type="text"
						maxlength="15"
						ref="username"
					></b-form-input>
				</b-form-group>
				<b-form-group
					label="Palavra-passe"
					label-for="password"
					:invalid-feedback="passwordInvalidFeedback"
					:state="passwordState"
					class="mt-4"
				>
					<b-form-input
						id="password"
						:state="passwordState"
						v-model="password"
						type="password"
						maxlength="15"
						ref="password"
					></b-form-input>
				</b-form-group>
				<button class="btn btn-atlas1 col-12 mt-2" type="submit">
					<template v-if="loading">
						<b-spinner variant="atlas" small label="A carregar..."></b-spinner>
					</template>
					<template v-else>
						Iniciar sessão
					</template>
				</button>
			</b-form>
			<div class="mt-2">
				<small>Sem conta? Registe-se
					<router-link :to="{name: 'signup'}" class="text-atlas2">aqui</router-link>.
				</small>
			</div>
		</Panel>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import Panel from "@/components/Panel.vue"

export default {
	name: "LoginView",
	components: { Panel },
	data() {
		return {
			loading: false,
			credentialsError: {
				username: {
					error: false,
					value: ""
				},
				password: {
					error: false,
					value: ""
				}
			},
			username: "",
			password: "",
			attemptSubmit: false
		}
	},
	methods: {
		async verifyCredentials() {
			this.attemptSubmit = true
			if (!this.username || !this.password) {
				this.$snotify.error("Preencha todos os campos", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			} else {
				this.loading = true

				const response = await this.$http.post("/auth/sign-in", {
					username: this.username,
					password: this.password
				})

				if(response.data.success) {
					this.$store.commit("SET_JWT_COOKIE", response.data.content.jwt)
					this.$store.dispatch("userLoggedIn", response.data.content.user)
					this.$http.defaults.headers.common["Authorization"] = `Bearer ${this.getJwt}`
					this.$router.push({ name: "home" })
				} else {
					if(response.data.description === "invalidUsername") {
						this.credentialsError.username.error = true
						this.credentialsError.username.value = this.username
						this.$refs.username.$el.focus()
					}
					if(response.data.description === "invalidPassword") {
						this.credentialsError.password.error = true
						this.credentialsError.password.value = this.password
						this.$refs.password.$el.focus()
					}
					
					this.$snotify.error(response.data.message.pt, "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
				}			
				this.loading = false
			}
		}
	},
	computed: {
		...mapGetters(["getUserByUsername"]),
		usernameState() {
			if ((!this.username && this.attemptSubmit) || this.credentialsError.username.error && this.credentialsError.username.value === this.username) {
				return false
			} else {
				return null
			}
		},
		usernameInvalidFeedback() {
			if (!this.username && this.attemptSubmit) {
				return "Introduza o nome de utilizador"
			} else {
				return null
			}
		},
		passwordState() {
			if ((!this.password && this.attemptSubmit) || this.credentialsError.password.error && this.credentialsError.password.value === this.password) {
				return false
			} else {
				return null
			}
		},
		passwordInvalidFeedback() {
			if (!this.password && this.attemptSubmit) {
				return "Introduza a palavra-passe"
			} else {
				return null
			}
		}
	}
}
</script>

<style>
</style>
