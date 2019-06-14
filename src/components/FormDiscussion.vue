<template>
	<b-form @submit.prevent="!edit ? createDiscussion() : editDiscussion()">
		<b-form-group
			label="Título"
			label-for="name"
			:state="titleState"
			:invalid-feedback="titleInvalidFeedback"
		>
			<b-form-input id="name" v-model="title" type="text" maxlength="50" :state="titleState"></b-form-input>
		</b-form-group>
		<b-form-group label="Categoria">
			<b-form-radio-group
				buttons
				button-variant="outline-atlas2"
				v-model="selectedCategory"
				:options="categories"
				name="categories"
			/>
		</b-form-group>
		<b-form-group
			label="Texto"
			label-for="text"
			:state="textState"
			:invalid-feedback="textInvalidFeedback"
		>
			<b-form-textarea id="text" v-model="text" :rows="3" :max-rows="6" :state="textState"></b-form-textarea>
		</b-form-group>
		<button type="submit" class="btn btn-atlas1 col-12">
			<template v-if="loading">
				<b-spinner variant="atlas" small label="A carregar..."></b-spinner>
			</template>
			<template v-else>{{ !edit ? "Criar discussão" : "Editar discussão" }}</template>
		</button>
	</b-form>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	props: ["eventId", "edit"],
	created() {
		if (this.edit) {
			this.title = this.edit.title
			this.selectedCategory = this.edit.category
			this.text = this.edit.content
		}
		if (this.getLoggedUserId !== -1) {
			if (
				this.getLoggedUserId === this.getEventById(this.eventId).authorId ||
				this.getUserById(this.getLoggedUserId).profileId === 3
			) {
				this.categories.push("Anúncio")
			}
		}
	},
	data() {
		return {
			attemptSubmit: false,
			title: "",
			categories: ["Dúvida", "Sugestão"],
			selectedCategory: "Dúvida",
			text: "",
			loading: false
		}
	},
	methods: {
		async createDiscussion() {
			this.attemptSubmit = true
			if (this.titleState && this.textState) {
				try {
					this.loading = true
					const response = await this.$http.post(
						`/events/ids/${this.$route.params.id}/discussions`,
						{
							category: this.selectedCategory,
							title: this.title,
							content: this.text
						}
					)
					this.$store.commit(
						"ADDED_DISCUSSION",
						response.data.content.discussion
					)
					this.loading = false
					this.$snotify.success("Discussão criada", "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
					this.resetFormCreateDiscussion()
				} catch (err) {}
			} else {
				this.$snotify.error("Preencha todos os campos corretamente", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			}
		},
		async editDiscussion() {
			this.attemptSubmit = true
			if (this.titleState && this.textState) {
				try {
					this.loading = true
					const response = await this.$http.put(
						`/events/ids/${this.$route.params.id}/discussions`,
						{
							category: this.selectedCategory,
							title: this.title,
							content: this.text
						}
					)
					this.$store.commit(
						"EDITED_DISCUSSION",
						response.data.content.discussion
					)
					this.loading = false
					this.$snotify.success("Discussão editada", "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
				} catch (err) {
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
		resetFormCreateDiscussion() {
			this.attemptSubmit = false
			this.title = ""
			this.selectedCategory = "Dúvida"
			this.text = ""
		}
	},
	computed: {
		...mapGetters([
			"getLastDiscussionIdByEventId",
			"getLoggedUserId",
			"getEventById",
			"getUserById"
		]),
		titleState() {
			if (!this.title && !this.attemptSubmit) {
				return null
			} else if (!this.title && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		titleInvalidFeedback() {
			if (!this.title && this.attemptSubmit) {
				return "Introduza o título"
			} else {
				return null
			}
		},
		textState() {
			if (!this.text && !this.attemptSubmit) {
				return null
			} else if (!this.text && this.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		textInvalidFeedback() {
			if (!this.text && this.attemptSubmit) {
				return "Introduza o texto"
			} else {
				return null
			}
		}
	}
}
</script>
