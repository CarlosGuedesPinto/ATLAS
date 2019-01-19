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

		<div class="discussion">
			<div class="row">
				<div class="col-xl-3 col-md-3 col-12 text-center">
					<img :src="author.picture" alt class="rounded-circle img-fluid">
					<br>
					<p class="mt-2">{{ author.name }}</p>
				</div>
				<div class="col-xl-9 col-md-9 col-12">
					<div class="bg-white border rounded pl-3 pr-1 py-2" style="height: 100%;">
						<div class="row px-3 py-1">{{ discussion.content }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import { mapGetters } from "vuex"

export default {
	components: { TitleAtlas },
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
			author: {}
		}
	},
	computed: {
		...mapGetters([
			"getEventById",
			"getEventDiscussionByEventIdDiscussionId",
			"getUserById"
		])
	}
}
</script>

<style>
.discussion {
	min-height: 200px;
}
</style>
