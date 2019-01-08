<template>
	<div>
		<b-form @submit.prevent="addCourse()">
			<b-form-group
				label="Nome"
				label-for="name"
				:invalid-feedback="nameInvalidFeedback"
				:valid-feedback="nameValidFeedback"
				:state="nameState"
				class="mt-4"
			>
				<b-form-input id="name" :state="nameState" v-model="name" type="text" maxlength="50"></b-form-input>
			</b-form-group>
			<b-form-group
				label="Abreviatura"
				label-for="abbreviation"
				:invalid-feedback="abbreviationInvalidFeedback"
				:valid-feedback="abbreviationValidFeedback"
				:state="abbreviationState"
				class="mt-4"
			>
				<b-form-input
					id="abbreviation"
					:state="abbreviationState"
					v-model="abbreviation"
					type="text"
					maxlength="15"
				></b-form-input>
			</b-form-group>
			<button class="btn btn-atlas1 col-12 mt-2" type="submit">Adicionar curso</button>
		</b-form>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	data() {
		return {
			name: "",
			abbreviation: "",
			attemptSubmit: false,
		}
	},
	methods: {
		addCourse() {
			this.attemptSubmit = true
			if (this.nameState && this.abbreviationState) {
                this.$store.dispatch("createAccount", {
                    id: this.getLastUserId + 1,
                    profileId: this.selectedUserType,
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    name: this.name,
                    picture: !this.picture
                        ? "https://imgix.ranker.com/user_node_img/50025/1000492230/original/brandon-stark-tv-characters-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces"
                        : this.picture,
                    gender: this.selectedGender
                })
            } else {
				this.$snotify.error(
					"Preencha todos os campos corretamente",
					"",
					{
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					}
				)
			}
		}
	},
	computed: {
		...mapGetters([
			"getUserByUsername",
			"getUserByEmail",
			"getLastUserId"
		]),
		nameState() {
			if (!this.name && !this.attemptSubmit) {
				return null
			} else if (!this.name && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		nameInvalidFeedback() {
			if (!this.name && this.attemptSubmit) {
				return "Introduza o nome"
			} else {
				return null
			}
		},
		nameValidFeedback() {
			if (this.name.length === 50) {
				return "Máximo 50 caracteres"
			} else {
				return null
			}
		},
		usernameState() {
			if (!this.username && !this.attemptSubmit) {
				return null
			} else if (!this.username && this.attemptSubmit) {
				return false
			} else if (this.username !== this.username.replace(/[^a-z0-9]/gi, "")) {
				return false
			} else if (this.getUserByUsername(this.username)) {
				return false
			} else {
				return true
			}
		},
		usernameInvalidFeedback() {
			if (this.username !== this.username.replace(/[^a-z0-9]/gi, "")) {
				return "Introduza apenas letras e/ou números"
			} else if (this.getUserByUsername(this.username)) {
				return "Nome de utilizador em uso"
			} else {
				return "Introduza o nome de utilizador"
			}
		},
		usernameValidFeedback() {
			if (this.username.length === 15) {
				return "Máximo 15 caracteres"
			} else {
				return null
			}
		}
	}
}
</script>
