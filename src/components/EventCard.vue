<template>
	<div>
		<div class="card">
			<router-link :to="{ name: 'eventsInfo', params: { id: event.id } }">
				<img :src="event.picture.thumbnail" class="card-img-top">
			</router-link>
			<div
				class="bg-atlas2 px-3 py-2 body-card"
				:style="(windowWidth >= 768 && windowWidth <= 991) ? 'min-height: 150px' : ''"
			>
				<router-link :to="{ name: 'eventsInfo', params: { id: event.id } }" class="router-link">
					<h5 class="text-white m-0">
						<b class="text-atlas1">[{{ event.category }}]</b>
						{{ event.name }}
					</h5>
				</router-link>
				<div class="text-atlas3 event-card-body">
					<div class="mb-2">
						<template v-for="(eventTag, index) in event.tags">
							<router-link
								class="text-atlas3"
								v-if="index <= 2"
								:key="'event_' + event.id + 'tag_' + eventTag"
								:to="{name: 'events', query: {tags: getTagById(eventTag).name}}"
							>{{ "#" + getTagById(eventTag).name + " " }}</router-link>
							<span v-else-if="index === 3" :key="index">e mais {{ event.tags.length - 3 }} [...]</span>
						</template>
						<div v-if="ended">{{ getEventShortDescription(event.id) }}</div>
					</div>
					<div class="row">
						<div class="col-6">
							<i class="fa fa-map-marker-alt text-atlas1" aria-hidden="true"></i>
							<router-link
								class="text-atlas3 ml-1"
								:to="{ name: 'events', query: { sala: event.classroom } }"
							>{{ event.classroom }}</router-link>
						</div>
						<div class="col-6">
							<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
							{{ (event.dateStart + " " + event.hourStart) | moment("from", "now") }}
						</div>
					</div>
					<div>
						<i class="fa fa-microphone-alt text-atlas1" aria-hidden="true"></i>
						<router-link
							:to="{name: 'profile', params: { username: getUserById(event.authorId).username }}"
							class="text-atlas3"
						>&nbsp;@{{ getUserById(event.authorId).username }}</router-link>
					</div>
					<div>
						<i class="fa fa-users text-atlas1" aria-hidden="true"></i>
						{{ event.enrollments.length }} {{ $moment(event.dateEnd + ' ' + event.hourEnd).isBefore($moment()) ? 'foram' : (event.enrollments.length === 1 ? 'vai' : 'vão')}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	props: ["event", "ended"],
	created() {
		window.addEventListener("resize", this.handleResize)
		this.handleResize()
	},
	data() {
		return {
			windowWidth: 0
		}
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
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
	font-size: 0.8em;
}
.card {
	overflow: hidden;
}

.card-img-top {
	overflow: hidden;
	transition: all 0.5s;
}
.card-img-top:hover {
	transform: scale(1.05) !important;
}
.body-card {
	z-index: 2;
}
</style>
