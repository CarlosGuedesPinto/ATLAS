<template>
	<div>
		<b-form @submit.prevent="submitForm()">
			<template v-if="!editInterests">
				<b-form-group
					label="Nome"
					label-for="name"
					:invalid-feedback="nameInvalidFeedback"
					:valid-feedback="nameValidFeedback"
					:state="nameState"
					:class="!editProfile ? 'mt-4' : ''"
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
					v-if="!backoffice"
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
				<b-form-group label-for="picture" :state="pictureState" class="mt-4">
					<template slot="label">
						<span>URL foto -</span>
						<span style="font-style: italic; color: #eee; color: rgb(80, 80, 80);">opcional</span>
					</template>
					<b-form-input id="picture" :state="pictureState" v-model="picture" type="url"></b-form-input>
				</b-form-group>
				<b-form-group label="Género" class="mt-4">
					<b-form-radio-group
						buttons
						button-variant="outline-atlas2"
						v-model="selectedGender"
						:options="genders"
						name="genders"
					/>
				</b-form-group>
				<template v-if="backoffice || (editProfile && getLoggedUserId !== -1)">
					<b-form-group
						label="Tipo de utilizador"
						class="mt-4"
						v-if="getUserById(getLoggedUserId).profileId === 3"
					>
						<b-form-radio-group
							buttons
							:stacked="windowWidth < 595 ? true : false"
							button-variant="outline-atlas2"
							v-model="selectedUserType"
							:options="userTypes"
							name="userTypes"
						/>
					</b-form-group>
				</template>
			</template>
			<template v-if="!editProfile">
				<template v-if="!editProfile && !editInterests">
					<hr>
					<h5>
						Interesses -
						<span style="font-style: italic; color: #eee; color: rgb(80, 80, 80);">opcional</span>
					</h5>
				</template>
				<b-form-group label="Tags" label-for="filterTag">
					<b-form-input
						id="filterTag"
						v-model="filterTags"
						type="text"
						maxlength="50"
						placeholder="Filtrar tags..."
					></b-form-input>
					<b-form-checkbox-group
						v-model="selectedTags"
						name="tags"
						:options="getFilteredTags"
						:stacked="true"
						style="overflow-y: scroll; max-height: 200px;"
						class="mt-2 px-1"
					></b-form-checkbox-group>
				</b-form-group>
				<b-form-group label="Cursos" class="mt-4">
					<b-form-checkbox-group
						v-model="selectedCourses"
						name="courses"
						:options="courses"
						:stacked="true"
						class="px-1"
					></b-form-checkbox-group>
				</b-form-group>
			</template>
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

export default {
	name: "FormCreateAccount",
	props: ["backoffice", "editProfile", "editInterests"],
	watch: {
		editProfile: function(newVal, oldVal) {
			this.name = newVal.name
			this.username = newVal.username
			this.password = newVal.password
			this.confirmPassword = newVal.password
			this.email = newVal.email
			this.picture = newVal.picture
			this.selectedGender = newVal.gender
			this.selectedUserType = newVal.profileId
		},
		editInterests: function(newVal, oldVal) {
			this.filterTags = ""
			this.selectedTags = newVal.interests.tags
			this.selectedCourses = newVal.interests.courses
		}
	},
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
			userTypes: [
				{ text: "Aluno", value: 1 },
				{ text: "Proponente de evento", value: 2 },
				{ text: "Administrador", value: 3 }
			],
			selectedUserType: 1,
			filterTags: "",
			selectedTags: [],
			selectedCourses: [],
			courses: [],
			attemptSubmit: false,
			windowWidth: 0
		}
	},
	created() {
		if (this.backoffice) {
			window.addEventListener("resize", this.handleResize)
			this.handleResize()
		}

		this.getCourses.forEach(course => {
			this.courses.push({
				text: course.name,
				value: course.id
			})
		})

		if (this.editProfile) {
			this.name = this.editProfile.name
			this.username = this.editProfile.username
			this.password = this.editProfile.password
			this.confirmPassword = this.editProfile.password
			this.email = this.editProfile.email
			this.picture = this.editProfile.picture
			this.selectedGender = this.editProfile.gender
			this.selectedUserType = this.editProfile.profileId
		}

		if (this.editInterests) {
			this.filterTags = ""
			this.selectedTags = this.editInterests.interests.tags
			this.selectedCourses = this.editInterests.interests.courses
		}
	},
	methods: {
		submitForm() {
			this.attemptSubmit = true
			if (!this.backoffice && !this.editProfile && !this.editInterests) {
				this.signUp()
			} else if (!this.editProfile && !this.editInterests) {
				this.createAccount()
			} else if (!this.editInterests) {
				this.editAccount()
			} else {
				this.methodEditInterests()
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
