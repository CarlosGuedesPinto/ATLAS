<template>
	<div>
		<b-form @submit.prevent="!editId ? addCourse() : editCourse()">
			<b-form-group
				label="Nome"
				label-for="name"
				:invalid-feedback="nameInvalidFeedback"
				:valid-feedback="nameValidFeedback"
				:state="nameState"
				:class="!editId ? 'mt-4' : ''"
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
					maxlength="6"
				></b-form-input>
			</b-form-group>
			<button
				class="btn btn-atlas1 col-12 mt-2"
				type="submit"
			>{{ !editId ? "Adicionar curso" : "Editar curso"}}</button>
		</b-form>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	props: ["editId"],
	data() {
		return {
			name: "",
			abbreviation: "",
			attemptSubmit: false
		}
	},
	created() {
		if (this.editId) {
			let course = this.getCourseById(this.editId)
			this.name = course.name
			this.abbreviation = course.abbreviation
		}
	},
	methods: {
		addCourse() {
			this.attemptSubmit = true
			if (this.nameState && this.abbreviationState) {
				this.$store.dispatch("addCourse", {
					id: this.getLastCourseId + 1,
					name: this.name,
					abbreviation: this.abbreviation
				})

				// clears form
				this.name = ""
				this.abbreviation = ""
				this.attemptSubmit = false
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
		editCourse() {
			this.attemptSubmit = true
			if (this.nameState && this.abbreviationState) {
				this.$store.dispatch("editCourse", {
					id: this.editId,
					name: this.name,
					abbreviation: this.abbreviation
				})

				// clears form
				this.name = ""
				this.abbreviation = ""
				this.attemptSubmit = false

				this.$snotify.success("Curso editado", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
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
			"getCourses",
			"getCourseById",
			"getLastCourseId",
			"getCourseByName",
			"getCourseByAbbreviation"
		]),
		nameState() {
			if (!this.editId) {
				if (!this.name && !this.attemptSubmit) {
					return null
				} else if (!this.name && this.attemptSubmit) {
					return false
				} else if (this.getCourseByName(this.name)) {
					return false
				} else {
					return true
				}
			} else {
				if (!this.name && !this.attemptSubmit) {
					return null
				} else if (!this.name && this.attemptSubmit) {
					return false
				} else if (
					this.getCourseByName(this.name) !==
						this.getCourseById(this.editId) &&
					this.getCourseByName(this.name)
				) {
					return false
				} else {
					return true
				}
			}
		},
		nameInvalidFeedback() {
			if (!this.name && this.attemptSubmit) {
				return "Introduza o nome do curso"
			} else if (this.getCourseByName(this.name)) {
				return "Nome de curso em uso"
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
		abbreviationState() {
			if (!this.editId) {
				if (!this.abbreviation && !this.attemptSubmit) {
					return null
				} else if (!this.abbreviation && this.attemptSubmit) {
					return false
				} else if (
					this.abbreviation !==
					this.abbreviation.replace(/[^a-z0-9]/gi, "")
				) {
					return false
				} else if (this.getCourseByAbbreviation(this.abbreviation)) {
					return false
				} else {
					return true
				}
			} else {
				if (!this.abbreviation && !this.attemptSubmit) {
					return null
				} else if (!this.abbreviation && this.attemptSubmit) {
					return false
				} else if (
					this.abbreviation !==
					this.abbreviation.replace(/[^a-z0-9]/gi, "")
				) {
					return false
				} else if (
					this.getCourseByAbbreviation(this.abbreviation) !==
						this.getCourseById(this.editId) &&
					this.getCourseByAbbreviation(this.abbreviation)
				) {
					return false
				} else {
					return true
				}
			}
		},
		abbreviationInvalidFeedback() {
			if (
				this.abbreviation !==
				this.abbreviation.replace(/[^a-z0-9]/gi, "")
			) {
				return "Introduza apenas letras e/ou números"
			} else if (this.getCourseByAbbreviation(this.abbreviation)) {
				return "Abreviação em uso"
			} else {
				return "Introduza a abreviação"
			}
		},
		abbreviationValidFeedback() {
			if (this.abbreviation.length === 6) {
				return "Máximo 6 caracteres"
			} else {
				return null
			}
		}
	}
}
</script>
