<template>
	<div>
		<b-form @submit.prevent="!editId ? addTag() : editTag()">
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
			<button
				class="btn btn-atlas1 col-12 mt-2"
				type="submit"
			>{{ !editId ? "Adicionar tag" : "Editar tag"}}</button>
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
			attemptSubmit: false
		}
	},
	created() {
		if (this.editId) {
			this.name = this.getTagById(this.editId).name
		}
	},
	methods: {
		addTag() {
			this.attemptSubmit = true
			if (this.nameState) {
				this.$store.dispatch("addTag", {
					id: this.getLastTagId + 1,
					name: this.name
				})

				// clears form
				this.name = ""
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
			"getTags",
			"getTagById",
			"getLastTagId",
			"getTagByName"
		]),
		nameState() {
			if (!this.editId) {
				if (!this.name && !this.attemptSubmit) {
					return null
				} else if ((!this.name || !this.name.trim()) && this.attemptSubmit) {
					return false
				} else if (this.getTagByName(this.name)) {
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
					this.getTagByName(this.name) !==
						this.getTagById(this.editId) &&
					this.getTagByName(this.name)
				) {
					return false
				} else {
					return true
				}
			}
		},
		nameInvalidFeedback() {
			if ((!this.name || !this.name.trim()) && this.attemptSubmit) {
				return "Introduza uma tag"
			} else if (this.getTagByName(this.name)) {
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
