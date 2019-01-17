<template>
	<div class="d-flex event-list-item">
		<router-link
			:to="{ name: 'eventsInfo', params: { name: this.getEventUrlByName(event.name), id: event.id } }"
			class="p-0 col-lg-3 col-md-5 col-5"
		>
			<img :src="event.picture.thumbnail" class="card-img-top" style="height: 100%; border-radius: 0;">
		</router-link>
		<div class="bg-atlas2 py-2 col-lg-9 col-md-7 col-7">
			<router-link :to="{ name: 'eventsInfo', params: { name: this.getEventUrlByName(event.name), id: event.id } }" class="router-link">
				<h5 class="text-white">{{ event.name }}</h5>
			</router-link>
			<div class="text-atlas3 event-card-body">
				<div class="float-left mb-3">{{ getEventShortDescription(event.id) }}</div>
				<div>
					<div class="float-left">
						<template v-for="eventTag in event.tags">{{ "#" + getTagById(eventTag).name + " " }}</template>
					</div>
					<div class="float-right row">
						<div class="ml-3">
							<i class="fa fa-map-marker-alt text-atlas1" aria-hidden="true"></i>
							{{ event.classroom }}
						</div>
						<div class="ml-3">
							<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
							{{ event.dateEnd | moment("from", "now") }}
						</div>
						<div class="ml-3">
							<i class="fa fa-microphone-alt text-atlas1" aria-hidden="true"></i>
							{{ getUserById(event.authorId).name }}
						</div>
						<div class="mx-3">
							<i class="fa fa-users text-atlas1" aria-hidden="true"></i>
							53 foram
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
	props: ["to", "event"],
	data() {
		return {
			someDate: "2019-01-13"
		}
	},
	computed: {
		...mapGetters(["getUserById", "getTagById", "getEventShortDescription", "getEventUrlByName"])
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