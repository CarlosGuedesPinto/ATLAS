<template>
	<div>
		<div v-if="loading" class="text-center">
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
						:placeholder="getLoggedUserId === -1 ? 'Inicie sessão para poder responder.' : 'Escreva aqui a sua resposta...'"
						:rows="3"
						:disabled="getLoggedUserId === -1"
					/>
				</b-form-group>
				<transition name="fade" mode="out-in">
					<div v-if="answer">
						<input
							type="reset"
							class="btn float-right col-lg-2 col-md-3 col-5"
							value="Cancelar"
							@click="answer = ''"
						>
						<button
							type="submit"
							class="btn btn-atlas1 float-right mr-2 col-lg-2 col-md-3 col-5"
						>Responder</button>
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
		this.author = this.getUserById(this.discussion.authorId)

		this.$store.subscribe(mutation => {
			if (mutation.type === "EDIT_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID") {
				this.modal = false
			}
		})
	},
	data() {
		return {
			loading: false,
			event: {},
			discussion: {},
			author: {},
			answer: "",
			modal: false,
			totalPages: 1,
			currentPage: 1,
			answersPerPage: 10
		}
	},
	computed: {
		...mapGetters([
			"getEventById",
			"getEventDiscussionByEventIdDiscussionId",
			"getUserById",
			"getLoggedUserId",
			"getLastAnswerIdByEventIdDiscussionId"
		])
	},
	methods: {
		async loadPage() {
			try {
				this.loading = true
				const response = await this.$http.get(
					`/events/ids/${this.$route.params.id}/discussions/${
						this.$route.params.discussionId
					}`
				)
				this.event = response.data.event
				this.discussion = response.data.discussion
			} catch (err) {}
			this.loading = false
		},
		addAnswer() {
			this.$store.dispatch("addDiscussionAnswerByEventIdDiscussionId", {
				eventId: this.event.id,
				discussionId: this.discussion.id,
				answer: {
					id:
						this.getLastAnswerIdByEventIdDiscussionId(
							this.event.id,
							this.discussion.id
						) + 1,
					authorId: this.getLoggedUserId,
					content: this.answer,
					moment: this.$moment()
				}
			})
			this.answer = ""
			this.$snotify.success("Resposta adicionada", "", {
				timeout: 2000,
				showProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true
			})
		},
		btnConditions() {
			if (this.getLoggedUserId !== -1) {
				if (
					this.getUserById(this.getLoggedUserId).profileId === 3 ||
					this.getLoggedUserId === this.author.id ||
					this.getLoggedUserId === this.event.authorId
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
				accept: () => {
					this.$store.dispatch("removeDiscussionByEventIdDiscussionId", {
						eventId: this.event.id,
						discussionId: this.discussion.id
					})
					this.$snotify.success("Discussão removida", "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
					this.$router.replace({
						name: "eventsInfo",
						params: { id: this.event.id }
					})
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
