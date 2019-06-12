<template>
	<div>
		<b-form @submit.prevent="!edit ? addTag() : editTag()">
			<b-form-group
				label="Tag"
				label-for="name"
				:invalid-feedback="nameInvalidFeedback"
				:valid-feedback="nameValidFeedback"
				:state="nameState"
				:class="!editId ? 'mt-4' : ''"
			>
				<b-form-input id="name" :state="nameState" v-model="name" type="text" maxlength="15"></b-form-input>
			</b-form-group>
			<button class="btn btn-atlas1 col-12 mt-2" type="submit">
				<template v-if="loadingSubmit">
					<b-spinner variant="atlas" small label="A carregar..."></b-spinner>
				</template>
				<template v-else>{{ !editId ? "Adicionar tag" : "Editar tag"}}</template>
			</button>
		</b-form>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	props: ["edit"],
	data() {
		return {
			name: "",
			loadingSubmit: false,
			attemptSubmit: false,
			errors: {
				name: {
					error: false,
					value: ""
				}
			}
		}
	},
	created() {
		if (this.edit) {
			this.name = this.getTagById(this.editId).name
		}
	},
	methods: {
		async addTag() {
			this.attemptSubmit = true
			if (this.nameState) {
				try {
					const response = await this.$http.post("/tags", {
						name: this.name
					})

					// clears form
					this.name = ""
					this.attemptSubmit = false
				} catch (err) {
					const response = err.response.data
					if (response.error.type === "name") {
						console.log(true)
						this.errors.name.error = true
						this.errors.name.value = response.error.value

						this.$snotify.error(response.message.pt, "", {
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true
						})
					}
				}
			} else {
				this.$snotify.error("Preencha todos os campos corretamente", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			}
		},
		editTag() {
			this.attemptSubmit = true
			if (this.nameState) {
				this.$store.dispatch("editTag", {
					id: this.editId,
					name: this.name
				})

				// clears form
				this.name = ""
				this.attemptSubmit = false

				this.$snotify.success("Tag editada", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			} else {
				this.$snotify.error("Preencha todos os campos corretamente", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			}
		}
	},
	computed: {
		...mapGetters(["getTags", "getTagById", "getLastTagId", "getTagByName"]),
		nameState() {
			if (!this.name && !this.attemptSubmit) {
				return null
			} else if ((!this.name || !this.name.trim()) && this.attemptSubmit) {
				return false
			} else if (
				this.errors.name.error &&
				this.name === this.errors.name.value
			) {
				return false
			} else {
				return true
			}
		},
		nameInvalidFeedback() {
			if ((!this.name || !this.name.trim()) && this.attemptSubmit) {
				return "Introduza uma tag"
			} else if (
				this.errors.name.error &&
				this.name === this.errors.name.value
			) {
				return "Tag em uso"
			} else {
				return null
			}
		},
		nameValidFeedback() {
			if (this.name.length === 15) {
				return "Máximo 15 caracteres"
			} else {
				return null
			}
		}
	}
}
</script>
