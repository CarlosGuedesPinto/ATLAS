<template>
	<div>
		<b-form @submit.prevent="createAccount()">
			<b-form-group
				label="Nome"
				label-for="name"
				:invalid-feedback="nameInvalidFeedback"
				:valid-feedback="nameValidFeedback"
				:state="nameState"
				:class="!edit ? 'mt-4' : ''"
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
					buttons
					button-variant="outline-atlas2"
					v-model="selectedGender"
					:options="genders"
					name="genders"
				/>
			</b-form-group>
			<template v-if="backoffice || (edit && getLoggedUserId !== -1)">
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
			<hr>
			<h5>
				Interesses -
				<span style="font-style: italic; color: #eee; color: rgb(80, 80, 80);">opcional</span>
			</h5>
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
			<button
				class="btn btn-atlas1 col-12 mt-2"
				type="submit"
			>{{ !edit ? (backoffice && !edit ? "Adicionar utilizador" : "Criar conta") : "Editar perfil" }}</button>
		</b-form>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "FormCreateAccount",
	props: ["backoffice", "edit"],
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

		if (this.edit) {
			this.name = this.edit.name
			this.username = this.edit.username
			this.password = this.edit.password
			this.confirmPassword = this.edit.password
			this.email = this.edit.email
			this.picture = this.edit.picture
			this.selectedGender = this.edit.gender
			this.selectedUserType = this.edit.profileId
			this.filterTags = ""
			this.selectedTags = this.edit.interests.tags
			this.selectedCourses = this.edit.interests.courses
		}
	},
	methods: {
		createAccount() {
			this.attemptSubmit = true
			if (
				this.nameState &&
				this.usernameState &&
				this.passwordState &&
				((this.confirmPasswordState && !this.backoffice) ||
					this.backoffice) &&
				this.emailState
			) {
				if (!this.backoffice && !this.edit) {
					this.$store.dispatch("signUp", {
						id: this.getLastUserId + 1,
						profileId: 1,
						username: this.username,
						password: this.password,
						email: this.email,
						name: this.name,
						picture: !this.picture
							? "https://imgix.ranker.com/user_node_img/50025/1000492230/original/brandon-stark-tv-characters-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces"
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
				} else if (!this.edit) {
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
				} else {
					this.$store.dispatch("editUserById", {
						id: this.edit.id,
						profileId: this.selectedUserType,
						username: this.username,
						password: this.password,
						email: this.email,
						name: this.name,
						picture: !this.picture
							? "https://imgix.ranker.com/user_node_img/50025/1000492230/original/brandon-stark-tv-characters-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces"
							: this.picture,
						gender: this.selectedGender,
						accountCreation: {
							date: this.edit.accountCreation.date,
							hour: this.edit.accountCreation.hour
						},
						interests: {
							tags: this.selectedTags,
							courses: this.selectedCourses
						}
					})

					this.$snotify.success("Perfil editado", "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
				}

				// clears form
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
		handleResize() {
			this.windowWidth = window.innerWidth
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
			if (!this.edit) {
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
						this.getUserById(this.edit.id) &&
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
			if (!this.edit) {
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
						this.getUserById(this.edit.id) &&
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
