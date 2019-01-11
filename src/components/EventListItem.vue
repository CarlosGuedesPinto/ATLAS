<template>
	<div class="d-flex">
		<router-link :to="to" class="p-0 col-md-3 col-5">
			<img :src="event.picture.thumbnail" class="card-img-top" style="height: 100%; border-radius: 0;">
		</router-link>
		<div class="bg-atlas2 py-2 col-md-9 col-7">
			<router-link :to="to" class="router-link">
				<h5 class="text-white">{{ event.name }}</h5>
			</router-link>
			<div class="text-atlas3 event-card-body d-flex">
				<div class="col-lg-3">
					<i class="fa fa-map-marker-alt text-atlas1" aria-hidden="true"></i>
					{{ event.classroom }}
				</div>
				<div class="col-lg-3">
					<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
					daqui a 3 dias
				</div>
				<div class="col-lg-3">
					<i class="fa fa-microphone-alt text-atlas1" aria-hidden="true"></i>
					{{ getUserById(event.authorId).name }}
				</div>
				<div class="col-lg-3">
					<i class="fa fa-users text-atlas1" aria-hidden="true"></i>
					21 foram
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
		...mapGetters(["getUserById"])
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
</style>