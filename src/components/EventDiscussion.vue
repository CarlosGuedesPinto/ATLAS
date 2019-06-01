<template>
	<div class="bg-atlas2 p-2 text-white">
		<div class="row px-3">
			<div class="mr-3">
				<i
					class="fa fa-arrow-up text-atlas1 upvoteButton"
					aria-hidden="true"
					@click="buttonUpvoteClicked"
				></i>
				<br>
				{{ discussion.upvotes - discussion.downvotes }}
				<br>
				<i
					class="fa fa-arrow-down text-atlas1 downvoteButton"
					aria-hidden="true"
					@click="buttonDownvoteClicked"
				></i>
			</div>
			<div>
				<div>
					<router-link
						:to="{ name: 'eventDiscussion', params: { id: $route.params.id, discussionId: discussion._id } }"
						class="text-white"
					>
						<b
							class="text-atlas3"
							:class="discussion.category === 'Anúncio' ? 'bg-atlas1 p-1 rounded' : ''"
						>[{{ discussion.category }}]</b>
						{{ discussion.title }}
					</router-link>
				</div>
				<div class="row mt-4">
					<div class="ml-3">
						<router-link
							:to="{name: 'profile', params: { username: discussion.author.username } }"
							class="text-white"
						>
							<i class="fa fa-user text-atlas1" aria-hidden="true"></i>
							<small> @{{ discussion.author.username }}</small>
						</router-link>
					</div>
					<div class="ml-3">
						<i class="fa fa-comments text-atlas1" aria-hidden="true"></i>
						<small>&nbsp;{{ discussion.answers }} {{ discussion.answers === 1 ? 'resposta' : 'respostas' }}</small>
					</div>
					<div class="ml-3">
						<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
						<small>&nbsp;{{ $moment(discussion.createdAt).format("LL") }}</small>
					</div>
					<div class="ml-3">
						<i class="fa fa-clock text-atlas1" aria-hidden="true"></i>
						<small>&nbsp;{{ $moment(discussion.createdAt).format("HH:mm") }}</small>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
	props: ["discussion"],
	data() {
		return {
			mouseOverUpvote: false
		}
	},
	methods: {
		...mapActions([
			"upvoteEventDiscussionByEventIdDiscussionId",
			"downvoteEventDiscussionByEventIdDiscussionId"
		]),
		buttonUpvoteClicked() {
			if (this.getLoggedUserId !== -1) {
				if (!this.userAlreadyVoted) {
					this.upvoteEventDiscussionByEventIdDiscussionId({
						eventId: parseInt(this.$route.params.id),
						discussionId: this.discussion.id
					})
				} else {
					this.$snotify.error("Já votou nessa discussão", "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
				}
			} else {
				this.$snotify.error("Faça login para votar", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			}
		},
		buttonDownvoteClicked() {
			if (this.getLoggedUserId !== -1) {
				if (!this.userAlreadyVoted) {
					this.downvoteEventDiscussionByEventIdDiscussionId({
						eventId: parseInt(this.$route.params.id),
						discussionId: this.discussion.id
					})
				} else {
					this.$snotify.error("Já votou nessa discussão", "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
				}
			} else {
				this.$snotify.error("Faça login para votar", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})
			}
		}
	},
	computed: {
		...mapGetters([
			"getEventDiscussionsById",
			"getLoggedUserId",
			"getUserById",
			"getEventUrlByName"
		]),
		userAlreadyVoted() {
			return this.discussion.usersVoted.some(
				userId => userId === this.getLoggedUserId
			)
		}
	}
}
</script>

<style>
.upvoteButton,
.downvoteButton {
	transition: all 0.3s;
	cursor: pointer;
}
.upvoteButton:hover,
.downvoteButton:hover {
	color: white !important;
}
</style>
