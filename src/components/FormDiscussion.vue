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
		<button type="submit" class="btn btn-atlas1 col-12">{{ !edit ? "Criar discussão" : "Editar discussão" }}</button>
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
	},
	data() {
		return {
			attemptSubmit: false,
			title: "",
			categories: ["Dúvida", "Sugestão"],
			selectedCategory: "Dúvida",
			text: ""
		}
	},
	methods: {
		createDiscussion() {
			this.attemptSubmit = true
			if (this.titleState && this.textState) {
				this.$store.dispatch("createEventDiscussion", {
					eventId: this.eventId,
					discussion: {
						id: this.getLastDiscussionIdByEventId(this.eventId) + 1,
						authorId: this.getLoggedUserId,
                        title: this.title,
						category: this.selectedCategory,                        
						content: this.text,
						upvotes: 0,
						downvotes: 0,
						usersVoted: [],
						moment: this.$moment(),
						answers: []
					}
				})

				this.$snotify.success("Discussão criada", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
				this.resetFormCreateDiscussion()
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
        editDiscussion() {
            this.attemptSubmit = true
			if (this.titleState && this.textState) {
				this.$store.dispatch("editEventDiscussionByEventIdDiscussionId", {
                    eventId: this.eventId,
                    discussionId: this.edit.id,
					discussion: {
						title: this.title,
						category: this.selectedCategory,
						content: this.text,
					}
                })

				this.$snotify.success("Discussão editada", "", {
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
        },
		resetFormCreateDiscussion() {
			this.attemptSubmit = false
			this.title = ""
			this.selectedCategory = "Dúvida"
			this.text = ""
		}
	},
	computed: {
		...mapGetters(["getLastDiscussionIdByEventId", "getLoggedUserId"]),
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
