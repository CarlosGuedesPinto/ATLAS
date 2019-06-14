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
							<small>@{{ discussion.author.username }}</small>
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
		async buttonUpvoteClicked() {
			if (this.getLoggedUser.username) {
				if (!this.userAlreadyVoted) {
					try {
						const response = await this.$http.post(
							`/events/ids/${this.$route.params.id}/discussions/${
								this.discussion._id
							}/votes`,
							{
								type: "upvote"
							}
						)
						if (response.status === 200) {
							this.discussion.upvotes++
							this.discussion.usersVoted.push(this.getLoggedUser._id)
						}
					} catch (err) {
						if (err.response.message.pt) {
							this.$snotify.error(err.response.message.pt, "", {
								timeout: 2000,
								showProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true
							})
						}
					}
				} else {
					this.$snotify.error("Já votou nesta discussão", "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
				}
			} else {
				this.$store.commit("REDIRECT_AFTER_LOGIN", this.$route.path)
				this.$router.push({ name: "login" })
			}
		},
		async buttonDownvoteClicked() {
			if (this.getLoggedUser.username) {
				if (!this.userAlreadyVoted) {
					try {
						const response = await this.$http.post(
							`/events/ids/${this.$route.params.id}/discussions/${
								this.discussion._id
							}/votes`,
							{
								type: "downvote"
							}
						)
						if (response.status === 200) {
							this.discussion.downvotes++
							this.discussion.usersVoted.push(this.getLoggedUser._id)
						}
					} catch (err) {
						if (err.response.message.pt) {
							this.$snotify.error(err.response.message.pt, "", {
								timeout: 2000,
								showProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true
							})
						}
					}
				} else {
					this.$snotify.error("Já votou nessa discussão", "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
				}
			} else {
				this.$store.commit("REDIRECT_AFTER_LOGIN", this.$route.path)
				this.$router.push({ name: "login" })
			}
		}
	},
	computed: {
		...mapGetters(["getLoggedUser"]),
		userAlreadyVoted() {
			return this.discussion.usersVoted.some(
				userId => userId === this.getLoggedUser._id
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
