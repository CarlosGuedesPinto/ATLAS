<template>
	<div class="row">
		<h2 class="text-center col-12">Iniciar sessão (provisório)</h2>
		<div class="col-12 col-sm-6 mr-auto ml-auto">
			<div>
				<label for="username">Utilizador</label>
				<input type="text" id="username" class="form-control" v-model="username">
			</div>
			<div class="mt-4">
				<label for="password">Password</label>
				<input type="password" id="password" class="form-control" v-model="password">
			</div>
			<button class="btn btn-atlas1 col-12 mt-4" @click="verifyCredentials()">Login</button>
			<div class="mt-2">
				<small>
					Sem conta? Registe-se
					<a href>aqui</a>.
				</small>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "LoginView",
	data() {
		return {
			username: "",
			password: ""
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
		...mapGetters(["getUserByUsername"])
	}
}
</script>
