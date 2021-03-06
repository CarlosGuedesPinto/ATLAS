<template>
	<div>
		<b-form @submit.prevent="submitForm()">
			<template v-if="!editInterests">
				<b-form-group
					label="Título"
					label-for="title"
					:invalid-feedback="titleInvalidFeedback"
					:valid-feedback="titleValidFeedback"
					:state="titleState"
					:class="!editMedal ? 'mt-4' : ''"
				>
					<b-form-input id="title" :state="titleState" v-model="title" type="text" maxlength="50"></b-form-input>
				</b-form-group>
				<b-form-group
					label="Detalhes"
					label-for="details"
					:invalid-feedback="detailsInvalidFeedback"
					:valid-feedback="detailsValidFeedback"
					:state="detailsState"
				>
					<b-form-input id="details" :state="detailsState" v-model="details" type="text" maxlength="50"></b-form-input>
				</b-form-group>

				<b-form-group label-for="picture" :state="pictureState" class="mt-4">
					<template slot="label">
						<span>URL foto -</span>
						<span style="font-style: italic; color: #eee; color: rgb(80, 80, 80);">opcional</span>
					</template>
					<b-form-input id="picture" :state="pictureState" v-model="picture" type="url"></b-form-input>
				</b-form-group>
				<template v-if="backoffice || (editMedal && getLoggedUserId !== -1)">
					<b-form-group
						label="Tipo de Medalha"
						class="mt-4"
						v-if="getUserById(getLoggedUserId).profileId === 3"
					>
						<b-form-radio-group
							buttons
							:stacked="windowWidth < 595 ? true : false"
							button-variant="outline-atlas2"
							v-model="selectedMedalType"
							:options="medalTypes"
							name="medalTypes"
						/>
					</b-form-group>
				</template>
			</template>

			<b-form-group
					label="Restrinção"
					label-for="constrain"
					:invalid-feedback="constrainInvalidFeedback"
					:valid-feedback="constrainValidFeedback"
					:state="constrainState"
				>
					<b-form-input id="constrain" :state="constrainState" v-model="constrain" type="text" maxlength="50"></b-form-input>
				</b-form-group>
			<button
				class="btn btn-atlas1 col-12 mt-2"
				type="submit"
			>{{ !editInterests ? (!editProfile ? (backoffice && !editProfile ? "Adicionar utilizador" : "Criar conta") : "Editar perfil") : "Editar interesses" }}</button>
		</b-form>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import axios from "axios"

export default {
	name: "FormCreateAccount",
	props: ["backoffice", "editMedals"],
	watch: {
		editMedal: function(newVal, oldVal) {
			this.title = newVal.title
			this.details = newVal.details
			this.picture = newVal.picture
			this.type = newVal.type
			this.constrain = newVal.constrain
		},
	},
	data() {
		return {
			title: "",
			details: "",
			picture: "",
			pictureLoaded: false,
			type: 1,
			medalTypes: [
				{ text: "Evento", value: 1 },
			],
			constrain: "",
			attemptSubmit: false,
			windowWidth: 0
		}
	},
	created() {
		if (this.backoffice) {
			window.addEventListener("resize", this.handleResize)
			this.handleResize()
		}

		if (this.editMedal) {
			this.title = this.editMedal.title
			this.details = this.editMedal.details
			this.picture = this.editMedal.picture
			this.type = this.editMedal.type
			this.constrain = this.editMedal.constrain
		}
	},
	methods: {
		submitForm() {
			this.attemptSubmit = true
			if (!this.backoffice && !this.editMedal) {
				this.signUp()
			} else if (!this.editMedals) {
				this.createAccount()
			}
		},
		signUp() {
			if (
				this.nameState &&
				this.usernameState &&
				this.passwordState &&
				this.confirmPasswordState &&
				this.emailState
			) {
				this.$store.dispatch("signUp", {
					id: this.getLastUserId + 1,
					profileId: 1,
					username: this.username,
					password: this.password,
					email: this.email,
					name: this.name,
					picture: !this.picture
						? this.selectedGender === 1
							? "https://i.imgur.com/uUbH9go.png"
							: "https://i.imgur.com/moL2juW.png"
						: this.picture,
					gender: this.selectedGender,
					accountCreation: {
						date: this.$moment().format("YYYY-MM-DD"),
						hour: this.$moment().format("HH:mm")
					},
					interests: {
						tags: this.selectedTags,
						courses: this.selectedCourses
					}
				})
				this.$router.push({ name: "login" })
			} else {
				this.notifyError()
			}
		},
		createAccount() {
			if (
				this.nameState &&
				this.usernameState &&
				this.passwordState &&
				this.emailState
			) {
				this.$store.dispatch("createAccount", {
					id: this.getLastUserId + 1,
					profileId: this.selectedUserType,
					username: this.username,
					password: this.password,
					email: this.email,
					name: this.name,
					picture: !this.picture
						? this.selectedGender === 1
							? "https://i.imgur.com/uUbH9go.png"
							: "https://i.imgur.com/moL2juW.png"
						: this.picture,
					gender: this.selectedGender,
					accountCreation: {
						date: this.$moment().format("YYYY-MM-DD"),
						hour: this.$moment().format("HH:mm")
					},
					interests: {
						tags: this.selectedTags,
						courses: this.selectedCourses
					}
				})

				this.$snotify.success("Utilizador adicionado", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
				this.clearForm()
			} else {
				this.notifyError()
			}
		},
		editAccount() {
			if (
				this.nameState &&
				this.usernameState &&
				this.passwordState &&
				this.confirmPasswordState &&
				this.emailState
			) {
				this.$router.replace({
					name: "profile",
					params: { username: this.username }
				})
				this.$store.dispatch("editUserById", {
					id: this.editProfile.id,
					profileId: this.selectedUserType,
					username: this.username,
					password: this.password,
					email: this.email,
					name: this.name,
					picture: !this.picture
						? this.selectedGender === 1
							? "https://i.imgur.com/uUbH9go.png"
							: "https://i.imgur.com/moL2juW.png"
						: this.picture,
					gender: this.selectedGender
				})

				this.$snotify.success("Perfil editado", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			} else {
				this.notifyError()
			}
		},
		methodEditInterests() {
			this.$store.dispatch("editUserInterestsById", {
				id: this.editInterests.id,
				interests: {
					tags: this.selectedTags,
					courses: this.selectedCourses
				}
			})

			this.$snotify.success("Interesses editados", "", {
				timeout: 2000,
				showProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true
			})
			this.filterTags = ""
		},
		notifyError() {
			this.$snotify.error("Preencha todos os campos corretamente", "", {
				timeout: 2000,
				showProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true
			})
		},
		clearForm() {
			this.attemptSubmit = false
			this.name = ""
			this.username = ""
			this.password = ""
			this.confirmPassword = ""
			this.email = ""
			this.picture = ""
			this.selectedGender = 1
			this.selectedUserType = 1
			this.attemptSubmit = false
			this.filterTags = ""
			this.selectedTags = []
			this.selectedCourses = []
		},
		handleResize() {
			this.windowWidth = window.innerWidth
		}
	},
	computed: {
		...mapGetters([
			"getApiUrl",
			"getUserByUsername",
			"getUserByEmail",
			"getLastUserId",
			"getTags",
			"getCourses",
			"getLoggedUserId",
			"getUserById"
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
		surnameState() {
			if (!this.surname && !this.attemptSubmit) {
				return null
			} else if (!this.surname && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		surnameInvalidFeedback() {
			if (!this.surname && this.attemptSubmit) {
				return "Introduza o nome"
			} else {
				return null
			}
		},
		surnameValidFeedback() {
			if (this.surname.length === 50) {
				return "Máximo 50 caracteres"
			} else {
				return null
			}
		},
		usernameState() {
			if (!this.editProfile) {
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
			} else {
				if (!this.username && !this.attemptSubmit) {
					return null
				} else if (!this.username && this.attemptSubmit) {
					return false
				} else if (
					this.username !== this.username.replace(/[^a-z0-9]/gi, "")
				) {
					return false
				} else if (
					this.getUserByUsername(this.username) !==
						this.getUserById(this.editProfile.id) &&
					this.getUserByUsername(this.username)
				) {
					return false
				} else {
					return true
				}
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
			if (!this.editProfile) {
				if (!this.email && !this.attemptSubmit) {
					return null
				} else if (!this.email && this.attemptSubmit) {
					return false
				} else if (this.getUserByEmail(this.email)) {
					return false
				} else {
					return true
				}
			} else {
				if (!this.email && !this.attemptSubmit) {
					return null
				} else if (!this.email && this.attemptSubmit) {
					return false
				} else if (
					this.getUserByEmail(this.email) !==
						this.getUserById(this.editProfile.id) &&
					this.getUserByEmail(this.email)
				) {
					return false
				} else {
					return true
				}
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
			if (!this.picture) {
				return null
			} else {
				return true
			}
		},
		getFilteredTags() {
			let tags = []
			this.getTags.forEach(tag => {
				tags.push({
					text: tag.name,
					value: tag.id
				})
			})

			// alphabetical order
			tags.sort((a, b) => {
				if (a.name > b.name) {
					return 1
				} else if (a.name < b.name) {
					return -1
				}
				return 0
			})

			if (!this.filterTags) {
				return tags
			} else {
				return tags.filter(tag =>
					tag.text
						.toLowerCase()
						.includes(this.filterTags.toLowerCase())
				)
			}
		}
	}
}
</script>
