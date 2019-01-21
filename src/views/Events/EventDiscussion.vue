<template>
	<div>
		<TitleAtlas>
			<router-link
				:to="{name: 'eventsInfo', params: { id: event.id }}"
				class="text-atlas2"
			>{{ event.name }}</router-link>&nbsp;/
			<span class="text-atlas2">[{{ discussion.category }}]</span>
			&nbsp;{{ discussion.title }}
		</TitleAtlas>
		<EventDiscussionAnswer :answer="{authorId: discussion.authorId, content: discussion.content}"/>
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
					<button type="submit" class="btn btn-atlas1 float-right mr-2 col-lg-2 col-md-3 col-5">Responder</button>
				</div>
			</transition>
		</b-form>
	</div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import EventDiscussionAnswer from "@/components/EventDiscussionAnswer.vue"
import { mapGetters } from "vuex"

export default {
	components: { TitleAtlas, EventDiscussionAnswer },
	created() {
		this.event = this.getEventById(parseInt(this.$route.params.id))
		this.discussion = this.getEventDiscussionByEventIdDiscussionId(
			parseInt(this.$route.params.id),
			parseInt(this.$route.params.discussionId)
		)
		this.author = this.getUserById(this.discussion.authorId)
	},
	data() {
		return {
			event: {},
			discussion: {},
			author: {},
			answer: ""
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
		addAnswer() {
			this.$store.dispatch("addDiscussionAnswerByEventIdDiscussionId", {
				eventId: this.event.id,
				discussionId: this.discussion.id,
				answer: {
					id: this.getLastAnswerIdByEventIdDiscussionId(this.event.id, this.discussion.id) + 1,
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
		}
	}
}
</script>

<style>
.discussion {
	min-height: 150px;
}
</style>
