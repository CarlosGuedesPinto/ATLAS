<template>
	<div class="row">
		<h2 class="text-center col-12">Criar conta (provisório)</h2>
		<div class="col-12 col-sm-6 mr-auto ml-auto">
			<b-form-group
				label="Utilizador"
				label-for="username"
				:invalid-feedback="invalidFeedback"
				:valid-feedback="validFeedback"
				:state="usernameState"
			>
				<b-form-input id="username" :state="usernameState" v-model.trim="username"></b-form-input>
			</b-form-group>
			<div class="mt-4">
				<label for="password">Password</label>
				<input type="password" id="password" class="form-control" v-model="password">
			</div>
			<button class="btn btn-atlas1 col-12 mt-4" @click="verifyCredentials()">Iniciar sessão</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "SignUpView",
	data() {
		return {
			username: "",
			password: "",
			attemptSubmit: false
		}
	},
	methods: {
		verifyCredentials() {
			let user = this.getUserByUsername(this.username)
			if (user && user.password === this.password) {
				this.$store.dispatch("userLoggedIn", user.id)
				this.$router.push({ name: "home" })
			} else {
				console.log("no!")
			}
		}
	},
	computed: {
		...mapGetters(["getUserByUsername"]),
		usernameState() {
			if (!this.username && !this.attemptSubmit) {
				return null
			} else if (this.attemptSubmit) {
			} else if (this.username) {
				return this.getUserByUsername(this.username) ? false : true
			}
		},
		invalidFeedback() {
			if (this.username.length > 4) {
				return ""
			} else if (this.username.length > 0) {
				return "Enter at least 4 characters"
			} else {
				return "Please enter something"
			}
		},
		validFeedback() {
			return this.usernameState === true ? "Thank you" : ""
		}
	}
}
</script>
