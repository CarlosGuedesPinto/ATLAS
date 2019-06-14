<template>
	<div class="d-flex event-list-item">
		<router-link
			:to="{ name: 'eventsInfo', params: { id: event._id } }"
			class="p-0 col-xl-3 col-lg-4 col-6"
		>
			<img :src="event.picture.thumbnail" class="card-img-top" style="height: 100%; border-radius: 0;">
		</router-link>
		<div class="bg-atlas2 py-2 col-xl-9 col-lg-8 col-6">
			<router-link :to="{ name: 'eventsInfo', params: { id: event._id } }" class="router-link">
				<h5 class="text-white atlas-bold">
					<b class="text-atlas1">[{{ event.category }}]</b>
					<span class="atlas-semi-bold ml-1">{{ event.name }}</span>
				</h5>
			</router-link>
			<div class="text-atlas3 event-card-body">
				<div class="float-left mb-3">{{ getShortDescription() }}</div>
				<div>
					<div class="float-left">
						<router-link
							class="text-atlas3"
							v-for="eventTag in event.tags"
							:to="{name: 'events', query: {tags: eventTag.name}}"
							:key="'event_' + event._id + 'tag_' + eventTag._id"
						>{{ "#" + eventTag.name + " " }}</router-link>
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
							{{ ($moment(event.dateStart).format("YYYY-MM-DD") + "T" + event.hourStart) | moment("from", "now") }}
						</div>
						<div class="ml-3">
							<i class="fa fa-microphone-alt text-atlas1" aria-hidden="true"></i>
							<router-link
								:to="{name: 'profile', params: { username: event.author.username }}"
								class="text-atlas3"
							>&nbsp;@{{ event.author.username }}</router-link>
						</div>
						<div class="mx-3">
							<i class="fa fa-users text-atlas1" aria-hidden="true"></i>&nbsp;
							<template
								v-if="!event.enrollments.length"
							>{{ $moment(event.dateEnd.substr(0, 10) + ' ' + event.hourEnd).isBefore($moment()) ? 'Sem inscrições' : 'Ainda sem inscrições'}}</template>
							<template
								v-else
							>{{ event.enrollments.length }} {{ $moment(event.dateEnd.substr(0, 10) + ' ' + event.hourEnd).isBefore($moment()) ? (event.enrollments.length === 1 ? 'foi' : 'foram') : (event.enrollments.length === 1 ? 'vai' : 'vão')}}</template>
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
			someDate: "2019-01-13",
			loading: false
		}
	},
	methods: {
		getShortDescription() {
			return this.event.description.length <= 100
				? this.event.description
				: this.event.description.substr(
						0,
						this.event.description.indexOf(" ", 250)
				  ) + "..."
		}
	},
	computed: {
		...mapGetters(["getUserById", "getTagById"])
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