<template>
	<div class="row">
		<h2 class="text-center col-12">Criar conta (provisório)</h2>
		<div class="col-12 col-sm-6 mr-auto ml-auto">
			<b-form @submit.prevent="createAccount()">
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
					label="Utilizador"
					label-for="username"
					:invalid-feedback="usernameInvalidFeedback"
					:valid-feedback="usernameValidFeedback"
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
				<b-form-group
					label="Confirmar palavra-passe"
					label-for="confirmPassword"
					:invalid-feedback="confirmPasswordInvalidFeedback"
					:state="confirmPasswordState"
					class="mt-4"
				>
					<b-form-input
						id="confirmPassword"
						:state="confirmPasswordState"
						v-model="confirmPassword"
						type="password"
						maxlength="15"
					></b-form-input>
				</b-form-group>
				<b-form-group
					label="Email"
					label-for="email"
					:invalid-feedback="emailInvalidFeedback"
					:state="emailState"
					class="mt-4"
				>
					<b-form-input id="email" :state="emailState" v-model="email" type="email"></b-form-input>
				</b-form-group>
				<b-form-group
					label-for="picture"
					:invalid-feedback="pictureInvalidFeedback"
					:state="pictureState"
					class="mt-4"
				>
					<template slot="label">
						<span>URL foto -</span>
						<span style="font-style: italic; color: #eee; color: rgb(80, 80, 80);">opcional</span>
					</template>
					<b-form-input id="picture" :state="pictureState" v-model="picture" type="url"></b-form-input>
				</b-form-group>
				<b-form-group label="Género" class="mt-4">
					<b-form-radio-group
						id="btnradios1"
						buttons
						button-variant="outline-atlas2"
						v-model="selectedGender"
						:options="genders"
						name="radiosBtnDefault"
					/>
				</b-form-group>
				<b-form-group label="Instituição de ensino" class="mt-4">
					<b-form-radio-group
						id="btnradios2"
						buttons
						button-variant="outline-atlas2"
						v-model="selectedInstitution"
						:options="institutions"
						name="radiosBtnDefault"
					/>
				</b-form-group>
				<button class="btn btn-atlas1 col-12 mt-2" type="submit">Criar conta</button>
			</b-form>
		</div>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "SignUpView",
	data() {
		return {
			name: "",
			username: "",
			password: "",
			confirmPassword: "",
			email: "",
			picture: "",
			pictureLoaded: false,
			genders: [
				{ text: "Masculino", value: 1 },
				{ text: "Feminino", value: 2 }
			],
			selectedGender: 1,
			institutions: [],
			selectedInstitution: "",
			attemptSubmit: false
		}
	},
	created() {
		this.getInstitutions.forEach(institution => {
			this.institutions.push({
				text: institution.name,
				value: institution.id
			})
		})
		this.selectedInstitution = this.institutions[0].value
	},
	methods: {
		createAccount() {
			this.attemptSubmit = true
			if (
				this.nameState &&
				this.usernameState &&
				this.passwordState &&
				this.confirmPasswordState &&
				this.emailState
			) {
				this.$store.dispatch("createdAccount", {
					id: this.getLastUserId + 1,
					profileId: 1,
					username: this.username,
					password: this.password,
					name: this.name,
					picture: !this.picture
						? "https://imgix.ranker.com/user_node_img/50025/1000492230/original/brandon-stark-tv-characters-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces"
						: this.picture,
					gender: this.selectedGender,
					institution: this.selectedInstitution
				})
				this.$router.push({ name: "login" })
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
		},
		verifyImgExists(url, callback) {
			let img = new Image()
			img.onerror = function() {
				callback(false)
			}
			img.onload = function() {
				callback(true)
			}
			img.src = url
		}
	},
	computed: {
		...mapGetters([
			"getUserByUsername",
			"getUserByEmail",
			"getLastUserId",
			"getInstitutions"
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
			} else if (
				this.username !== this.username.replace(/[^a-z0-9]/gi, "")
			) {
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
		},
		passwordState() {
			if (!this.password && !this.attemptSubmit) {
				return null
			} else if (!this.password && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		passwordInvalidFeedback() {
			if (!this.passwordState) {
				return "Introduza a palavra-passe"
			} else {
				return null
			}
		},
		confirmPasswordState() {
			if (!this.confirmPassword && !this.attemptSubmit) {
				return null
			} else if (
				!this.confirmPassword &&
				this.attemptSubmit &&
				!this.password
			) {
				return null
			} else if (this.confirmPassword !== this.password) {
				return false
			} else {
				return true
			}
		},
		confirmPasswordInvalidFeedback() {
			if (!this.confirmPassword && this.attemptSubmit && this.password) {
				return "As passwords devem ser iguais"
			} else if (this.confirmPassword !== this.password) {
				return "As passwords devem ser iguais"
			} else {
				return null
			}
		},
		emailState() {
			if (!this.email && !this.attemptSubmit) {
				return null
			} else if (!this.email && this.attemptSubmit) {
				return false
			} else if (this.getUserByEmail(this.email)) {
				return false
			} else {
				return true
			}
		},
		emailInvalidFeedback() {
			if (!this.email && this.attemptSubmit) {
				return "Introduza o email"
			} else if (this.getUserByEmail(this.email)) {
				return "Email em uso"
			} else {
				return null
			}
		},
		pictureState() {
			/*
			if (!this.picture) {
				return null
			} else if (this.picture) {
				let pictureLoaded = false
				this.verifyImgExists(this.picture, result => {
					pictureLoaded = result
				})
				return pictureLoaded
			} else {
				return true
			}
			*/
			return true
		},
		pictureInvalidFeedback() {
			if (this.picture && !this.pictureLoaded) {
				return "Imagem inválida"
			} else {
				return null
			}
		}
	}
}
</script>
