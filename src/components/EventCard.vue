<template>
	<div>
		<div class="card">
			<router-link :to="to">
				<img :src="event.picture.thumbnail" class="card-img-top">
			</router-link>
			<div class="bg-atlas2 px-3 py-2">
				<router-link :to="to" class="router-link">
					<h5 class="text-white m-0">{{ event.name }}</h5>
				</router-link>
				<div class="text-atlas3 event-card-body">
					<div class="mb-2">
						<template v-for="eventTag in event.tags">{{ "#" + getTagById(eventTag).name + " " }}</template>
					</div>
					<div class="row">
						<div class="col-6">
							<i class="fa fa-map-marker-alt text-atlas1" aria-hidden="true"></i>
							{{ event.classroom }}
						</div>
						<div class="col-6">
							<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
							daqui a 3 dias
						</div>
					</div>
					<div>
						<i class="fa fa-microphone-alt text-atlas1" aria-hidden="true"></i>
						{{ getUserById(event.authorId).name }}
					</div>
					<div>
						<i class="fa fa-users text-atlas1" aria-hidden="true"></i>
						21 vão
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
	font-size: 0.8em;
}
</style>
