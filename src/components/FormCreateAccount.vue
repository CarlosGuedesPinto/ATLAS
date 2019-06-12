<template>
	<div>
		<b-form @submit.prevent="submitForm()">
			<template v-if="!editInterests">
				<b-form-group
					label="Nome próprio"
					label-for="firstName"
					:invalid-feedback="firstNameInvalidFeedback"
					:state="firstNameState"
					:class="!editProfile ? 'mt-4' : ''"
				>
					<b-form-input
						id="firstName"
						:state="firstNameState"
						v-model="firstName"
						type="text"
						maxlength="20"
					></b-form-input>
				</b-form-group>
				<b-form-group
					label="Apelido"
					label-for="lastName"
					:invalid-feedback="lastNameInvalidFeedback"
					:state="lastNameState"
				>
					<b-form-input
						id="lastName"
						:state="lastNameState"
						v-model="lastName"
						type="text"
						maxlength="20"
					></b-form-input>
				</b-form-group>
				<b-form-group
					label="Utilizador"
					label-for="username"
					:invalid-feedback="usernameInvalidFeedback"
					:valid-feedback="usernameValidFeedback"
					:state="usernameState"
					class="mt-4"
					v-if="!editProfile || getLoggedUser.profileId === 3"
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
					v-if="!editProfile"
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
					v-if="!backoffice && !editProfile"
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
					v-if="!editProfile || getLoggedUser.profileId === 3"
				>
					<b-form-input id="email" :state="emailState" v-model="email" type="email" ref="password"></b-form-input>
				</b-form-group>
				<b-form-group label-for="picture" :state="pictureState" class="mt-4">
					<template slot="label">
						<span>URL foto -&nbsp;</span>
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
				<template v-if="backoffice || (editProfile && getLoggedUser.profileId === 3)">
					<b-form-group label="Tipo de utilizador" class="mt-4" v-if="getLoggedUser.profileId === 3">
						<b-form-radio-group
							buttons
							:stacked="windowWidth < 595 ? true : false"
							button-variant="outline-atlas2"
							v-model="profileId"
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
				<template v-if="loading.tags && loading.courses" class="row">
					<div class="text-center">
						<b-spinner variant="atlas" label="A carregar..."></b-spinner>
					</div>
				</template>
				<template v-else>
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
			</template>
			<button class="btn btn-atlas1 col-12 mt-2" type="submit">
				<template v-if="loading.submit">
					<b-spinner variant="atlas" small label="A carregar..."></b-spinner>
				</template>
				<template
					v-else
				>{{ !editInterests ? (!editProfile ? (backoffice && !editProfile ? "Adicionar utilizador" : "Criar conta") : "Editar perfil") : "Editar interesses" }}</template>
			</button>
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
			this.firstName = newVal.name
			this.lastName = newVal.lastName
			this.username = newVal.username
			this.password = newVal.password
			this.confirmPassword = newVal.password
			this.email = newVal.email
			this.picture = newVal.picture
			this.selectedGender = newVal.gender
			this.profileId = newVal.profileId
		},
		editInterests: function(newVal, oldVal) {
			this.filterTags = ""
			this.selectedTags = newVal.interests.tags
			this.selectedCourses = newVal.interests.courses
		}
	},
	data() {
		return {
			errors: {
				username: {
					value: "",
					error: false
				},
				email: {
					value: "",
					error: false
				}
			},
			loading: {
				tags: false,
				courses: false,
				submit: false
			},
			firstName: "",
			username: "",
			lastName: "",
			password: "",
			confirmPassword: "",
			email: "",
			picture: "",
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
			profileId: 1,
			tags: [],
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

		this.loadTags()
		this.loadCourses()

		if (this.editProfile) {
			this.firstName = this.editProfile.firstName
			this.lastName = this.editProfile.lastName
			this.username = this.editProfile.username
			this.email = this.editProfile.email
			this.picture = this.editProfile.picture
			this.selectedGender = this.editProfile.gender
			this.profileId = this.editProfile.profileId
		}

		if (this.editInterests) {
			this.filterTags = ""
			this.selectedTags = this.editInterests.interests.tags.map(tag => tag.name)
			this.selectedCourses = this.editInterests.interests.courses.map(
				course => `${course.name} (${course.abbreviation})`
			)
		}
	},
	methods: {
		async loadTags() {
			try {
				this.loading.tags = true
				const response = await this.$http.get("/tags")
				this.tags = response.data.content.tags.map(tag => tag.name)
				this.loading.tags = false
			} catch (err) {}
		},
		async loadCourses() {
			try {
				this.loading.courses = true
				const response = await this.$http.get("/courses")
				this.courses = response.data.content.courses.map(
					course => `${course.name} (${course.abbreviation})`
				)
				this.loading.courses = false
			} catch (err) {}
		},
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
		async signUp() {
			if (
				this.firstNameState &&
				this.lastNameState &&
				this.usernameState &&
				this.passwordState &&
				this.confirmPasswordState &&
				this.emailState
			) {
				try {
					const response = await this.$http.post("/auth/sign-up", {
						username: this.username,
						password: this.password,
						email: this.email,
						firstName: this.firstName,
						lastName: this.lastName,
						picture: this.picture,
						gender: this.selectedGender,
						interests: {
							tags: this.selectedTags,
							courses: this.selectedCourses,
							proponents: []
						}
					})
					this.$snotify.success(response.data.message.pt, "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
					this.$router.push({ name: "login" })
				} catch (err) {
					const errors = err.response.data.content.error
					if (errors.length) {
						errors.forEach(error => {
							if (error.type === "username") {
								this.errors.username.error = true
								this.errors.username.value = error.value
								this.$refs.username.$el.focus()
							}
							if (error.type === "email") {
								this.errors.email.error = true
								this.errors.email.value = error.value
								if (!this.errors.username) this.$refs.email.$el.focus()
							}
						})
						this.$snotify.error(err.response.data.message.pt, "", {
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true
						})
					} else {
						this.$router.push({ name: "home" })
					}
				}
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
					profileId: this.profileId,
					username: this.username,
					password: this.password,
					email: this.email,
					firstName: this.firstName,
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
		async editAccount() {
			if (this.getLoggedUser.profileId !== 3) {
				if (this.firstNameState && this.lastNameState) {
					try {
						this.loading.submit = true
						const response = await this.$http.put(
							`/users/${this.editProfile._id}`,
							{
								firstName: this.firstName,
								lastName: this.lastName,
								picture: this.picture,
								gender: this.gender
							}
						)
						this.$store.commit("EDIT_USER", response.data.content.user)
						this.$snotify.success("Perfil editado", "", {
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true
						})
						this.loading.submit = false
					} catch (err) {}
				} else {
					this.notifyError()
				}
			} else {
				if (
					this.firstNameState &&
					this.lastNameState &&
					this.usernameState &&
					this.emailState
				) {
					try {
						this.loading.submit = true
						const response = await this.$http.put(
							`/users/${this.editProfile._id}`,
							{
								firstName: this.firstName,
								lastName: this.lastName,
								username: this.username,
								email: this.email,
								picture: this.picture,
								gender: this.gender,
								profileId: this.profileId
							}
						)

						if (response.data.success) {
							this.$snotify.success("Perfil editado", "", {
								timeout: 2000,
								showProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true
							})
							this.$store.commit("EDIT_USER", response.data.content.user)
						} else {
							response.data.errors.forEach(error => {
								if (error.type === "username") {
									this.errors.username.error = true
									this.errors.username.value = error.value
									this.$refs.username.$el.focus()
								}
								if (error.type === "email") {
									this.errors.email.error = true
									this.errors.email.value = error.value
									if (!this.errors.username) this.$refs.email.$el.focus()
								}
								this.$snotify.error(response.data.message.pt, "", {
									timeout: 2000,
									showProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true
								})
							})
						}
						this.loading.submit = false
					} catch (err) {}
				} else {
					this.notifyError()
				}
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
			this.firstName = ""
			this.username = ""
			this.password = ""
			this.confirmPassword = ""
			this.email = ""
			this.picture = ""
			this.selectedGender = 1
			this.profileId = 1
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
		...mapGetters(["getApiUrl", "getLastUserId", "getLoggedUser"]),
		firstNameState() {
			if (!this.firstName && !this.attemptSubmit) {
				return null
			} else if (!this.firstName && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		firstNameInvalidFeedback() {
			if (!this.firstName && this.attemptSubmit) {
				return "Introduza o nome próprio"
			} else {
				return null
			}
		},
		lastNameState() {
			if (!this.lastName && !this.attemptSubmit) {
				return null
			} else if (!this.lastName && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		lastNameInvalidFeedback() {
			if (!this.lastName && this.attemptSubmit) {
				return "Introduza o apelido"
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
			} else if (
				this.errors.username.error &&
				this.username === this.errors.username.value
			) {
				return false
			} else {
				return true
			}
		},
		usernameInvalidFeedback() {
			if (this.username !== this.username.replace(/[^a-z0-9]/gi, "")) {
				return "Introduza apenas letras e/ou números"
			} else if (
				this.errors.username &&
				this.username === this.errors.username.value
			) {
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
				} else if (
					this.errors.email.error &&
					this.email === this.errors.email.value
				) {
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
					this.errors.email.error &&
					this.email === this.errors.email.value
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
			} else if (this.errors.email && this.email === this.errors.email.value) {
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
			if (!this.filterTags) {
				return this.tags
			} else {
				return this.tags.filter(tag =>
					tag.toLowerCase().includes(this.filterTags.toLowerCase())
				)
			}
		}
	}
}
</script>
