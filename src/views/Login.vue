<template>
	<div class="row">
		<h2 class="text-center col-12">Iniciar sessão (provisório)</h2>
		<div class="col-12 col-sm-6 mr-auto ml-auto ">
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
					></b-form-input>
				</b-form-group>
				<button class="btn btn-atlas1 col-12 mt-2" type="submit">Iniciar sessão</button>
			</b-form>
			<div class="mt-2">
				<small>Sem conta? Registe-se
					<router-link :to="{name: 'signup'}">aqui</router-link>.
				</small>
			</div>
		</div>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "LoginView",
	data() {
		return {
			username: "",
			password: "",
			attemptSubmit: false
		}
	},
	methods: {
		verifyCredentials() {
			this.attemptSubmit = true
			let user = this.getUserByUsername(this.username)
			if (user && user.password === this.password) {
				this.$store.dispatch("userLoggedIn", user.id)
				this.$router.push({ name: "home" })
			} else if (!this.username || !this.password) {
				this.$snotify.error("Preencha todos os campos", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			} else {
				this.$snotify.error("Dados de autenticação incorretos", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			}
		}
	},
	computed: {
		...mapGetters(["getUserByUsername"]),
		usernameState() {
			if (!this.username && this.attemptSubmit) {
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
			if (!this.password && this.attemptSubmit) {
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
