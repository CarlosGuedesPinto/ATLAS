<template>
	<div>
		<div v-if="loading.page" class="text-center">
			<p class="mb-5">&nbsp;</p>
			<b-spinner variant="atlas" label="A carregar..." style="width: 8rem; height: 8rem;" class="mt-5"></b-spinner>
		</div>
		<div v-else>
			<TitleAtlas class="mb-0">
				<router-link :to="{name: 'eventsInfo', params: { id: event._id }}" class="text-atlas2">
					<b>[{{ event.category }}]</b>
					{{ event.name }}
				</router-link>&nbsp;/
				<b
					class="text-atlas3"
					:class="discussion.category === 'Anúncio' ? 'bg-atlas2 p-1 rounded' : ''"
				>[{{ discussion.category }}]</b>
				{{ discussion.title }}
				<button
					class="btn btn-atlas2"
					@click="modal = true"
					v-if="btnConditions()"
				>
					<i class="fa fa-edit" aria-hidden="true"></i>
				</button>
				<button class="btn btn-danger ml-2" @click="btnRemoveClicked()" v-if="btnConditions()">
					<i class="fa fa-times" aria-hidden="true"></i>
				</button>
			</TitleAtlas>
			<div class="bg-white p-2 border-bottom border-left border-right rounded-bottom mb-3">
				<div class="row">
					<div class="ml-3">
						<router-link
							:to="{name: 'profile', params: { username: discussion.author.username } }"
							class="text-atlas2"
						>
							<i class="fa fa-user text-atlas1" aria-hidden="true"></i>
							<small>&nbsp;@{{ discussion.author.username }}</small>
						</router-link>
					</div>
					<div class="ml-3">
						<i class="fa fa-comments text-atlas1" aria-hidden="true"></i>
						<small>&nbsp;{{ discussion.answers.length }} {{ discussion.answers.length === 1 ? 'resposta' : 'respostas' }}</small>
					</div>
					<div class="ml-3">
						<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
						<small>&nbsp;{{ $moment(discussion.moment).format("LL") }}</small>
					</div>
					<div class="ml-3">
						<i class="fa fa-clock text-atlas1" aria-hidden="true"></i>
						<small>&nbsp;{{ $moment(discussion.moment).format("HH:mm") }}</small>
					</div>
				</div>
			</div>
			<EventDiscussionAnswer
				:answer="{id: 0, author: discussion.author, content: discussion.content}"
			/>
			<EventDiscussionAnswer v-for="answer in discussion.answers" :key="answer.id" :answer="answer"/>
			<b-form @submit.prevent="addAnswer()">
				<b-form-group label="Responder" class="mt-4">
					<b-form-textarea
						id="description"
						v-model="answer"
						placeholder="Escreva aqui a sua resposta..."
						:rows="3"
					/>
				</b-form-group>
				<transition name="fade" mode="out-in">
					<div v-if="answer">
						<input
							type="reset"
							class="btn float-right col-lg-2 col-md-3 col-5"
							value="Cancelar"
							@click="answer = ''"
							:disabled="btnsAnswerDisabled"
						>
						<button
							type="submit"
							class="btn btn-atlas1 float-right mr-2 col-lg-2 col-md-3 col-5"
							:disabled="btnsAnswerDisabled"
						>
							<template v-if="loading.answer">
								<b-spinner variant="atlas" small label="A carregar..."></b-spinner>
							</template>
							<template v-else>Responder</template>
						</button>
					</div>
				</transition>
			</b-form>
			<b-modal
				title="Editar discussão"
				header-bg-variant="atlas1"
				header-text-variant="white"
				:centered="true"
				v-model="modal"
				:hide-footer="true"
			>
				<FormDiscussion :eventId="event.id" :edit="discussion"/>
			</b-modal>
		</div>
	</div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import EventDiscussionAnswer from "@/components/EventDiscussionAnswer.vue"
import FormDiscussion from "@/components/FormDiscussion.vue"
import { mapGetters } from "vuex"

export default {
	components: { TitleAtlas, EventDiscussionAnswer, FormDiscussion },
	created() {
		this.loadPage()
		this.$store.subscribe(mutation => {
			if (mutation.type === "EDITED_DISCUSSION") {
				this.modal = false
				const { title, category, content } = mutation.payload
				this.discussion.title = title
				this.discussion.category = category
				this.discussion.content = content
			}
			if (mutation.type === "REMOVED_ANSWER") {
				const answerIndex = this.discussion.answers.findIndex(answer => answer._id === mutation.payload)
				this.discussion.answers.splice(answerIndex, 1)
			}
		})
	},
	data() {
		return {
			loading: {
				page: false,
				answer: false
			},
			btnsAnswerDisabled: false,
			event: {},
			discussion: {},
			answer: "",
			modal: false,
			totalPages: 1,
			currentPage: 1,
			answersPerPage: 10
		}
	},
	computed: {
		...mapGetters(["getLoggedUser"])
	},
	methods: {
		async loadPage() {
			try {
				this.loading.page = true
				const response = await this.$http.get(
					`/events/ids/${this.$route.params.id}/discussions/${
						this.$route.params.discussionId
					}`
				)
				this.event = response.data.content.event
				this.discussion = response.data.content.discussion
			} catch (err) {}
			this.loading.page = false
		},
		async addAnswer() {
			this.btnsAnswerDisabled = true
			this.loading.answer = true
			try {
				const response = await this.$http.post(
					`/events/ids/${this.$route.params.id}/discussions/${
						this.$route.params.discussionId
					}/answers`,
					{
						content: this.answer
					}
				)
				this.$snotify.success("Resposta adicionada", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
				this.discussion.answers.push(response.data.content.answer)
				this.answer = ""
			} catch (err) {
				this.$snotify.error("Não foi possível adicionar a resposta", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			}
			this.loading.answer = false
			this.btnsAnswerDisabled = false
		},
		btnConditions() {
			if (this.getLoggedUser.username) {
				if (
					this.getLoggedUser.profileId === 3 ||
					this.getLoggedUser._id === this.event.author._id ||
					this.getLoggedUser._id === this.discussion.author._id
				) {
					return true
				}
			}
			return false
		},
		btnRemoveClicked() {
			this.$vs.dialog({
				type: "confirm",
				color: "danger",
				title: "Remover discussão?",
				acceptText: "Remover",
				cancelText: "Cancelar",
				text: "Esta discussão será removida para sempre.",
				accept: async () => {
					try {
						this.loading.page = true
						const response = await this.$http.delete(
							`/events/ids/${this.event._id}/discussions/${this.discussion._id}`
						)
						if (response.data.success) {
							this.$router.replace({
								name: "eventsInfo",
								params: { id: this.event._id }
							})
							this.$snotify.success("Discussão removida", "", {
								timeout: 2000,
								showProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true
							})
						}
					} catch (err) {
						this.$snotify.error("Erro ao remover discussão", "", {
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true
						})
						this.loading.page = false
					}
				}
			})
		}
	}
}
</script>

<style>
.discussion {
	min-height: 150px;
}
</style>
