<template>
	<div class="row">
		<div class="col-12 col-sm-6 ml-auto mr-auto">
			<h1 class="text-center">Login provisório</h1>
			<div>
				<label for="username">Username</label>
				<input type="text" id="username" class="form-control" v-model="username">
			</div>
			<div class="mt-4">
				<label for="password">Password</label>
				<input type="password" id="password" class="form-control" v-model="password">
			</div>
			<button class="btn btn-atlas1 col-12 mt-4" @click="verifyCredentials()">Login</button>
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
                console.log("logged")
			} else {
				console.log("no!")
			}
		},
		showMessage() {
			const toast = Swal.mixin({})

			toast({})
		}
	},
	computed: {
		...mapGetters({
			getUserByUsername: "userByUsername"
		})
	}
}




</script>
