<template>
	<div class="d-flex event-list-item">
		<router-link
			:to="{ name: 'eventsInfo', params: { id: event.id } }"
			class="p-0 col-xl-3 col-lg-4 col-6"
		>
			<img :src="event.picture.thumbnail" class="card-img-top" style="height: 100%; border-radius: 0;">
		</router-link>
		<div class="bg-atlas2 py-2 col-xl-9 col-lg-8 col-6">
			<router-link :to="{ name: 'eventsInfo', params: { id: event.id } }" class="router-link">
				<h5 class="text-white">
					<b class="text-atlas1" style="font-weight: bold;">[{{ event.category }}]</b>
					{{ event.name }}
				</h5>
			</router-link>
			<div class="text-atlas3 event-card-body">
				<div class="float-left mb-3">{{ getEventShortDescription(event.id) }}</div>
				<div>
					<div class="float-left">
						<router-link
							class="text-atlas3"
							v-for="eventTag in event.tags"
							:to="{name: 'events', query: {tags: getTagById(eventTag).name}}"
							:key="'event_' + event.id + 'tag_' + eventTag"
						>{{ "#" + getTagById(eventTag).name + " " }}</router-link>
					</div>
					<div class="float-right row">
						<div class="ml-3">
							<i class="fa fa-map-marker-alt text-atlas1" aria-hidden="true"></i>
							<router-link
								class="text-atlas3 ml-1"
								:to="{ name: 'events', query: { sala: event.classroom } }"
							>{{ event.classroom }}</router-link>
						</div>
						<div class="ml-3">
							<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
							{{ (event.dateStart + " " + event.hourStart) | moment("from", "now") }}
						</div>
						<div class="ml-3">
							<i class="fa fa-microphone-alt text-atlas1" aria-hidden="true"></i>
							<router-link
								:to="{name: 'profile', params: { username: getUserById(event.authorId).username }}"
								class="text-atlas3"
							>&nbsp;@{{ getUserById(event.authorId).username }}</router-link>
						</div>
						<div class="mx-3">
							<i class="fa fa-users text-atlas1" aria-hidden="true"></i>
							{{ event.enrollments.length }} {{ $moment(event.dateEnd + ' ' + event.hourEnd).isBefore($moment()) ? 'foram' : (event.enrollments.length === 1 ? 'vai' : 'vão')}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	props: ["event"],
	data() {
		return {
			someDate: "2019-01-13"
		}
	},
	computed: {
		...mapGetters(["getUserById", "getTagById", "getEventShortDescription"])
	}
}
</script>

<style scoped>
a {
	text-decoration: none;
}

.event-card-body {
	font-size: 0.9em;
}

.event-list-item {
	overflow: hidden;
}
.card-img-top {
	transition: all 0.5s;
}
.card-img-top:hover {
	transform: scale(1.05) !important;
}
</style>