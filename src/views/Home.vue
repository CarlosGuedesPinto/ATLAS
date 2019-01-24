<template>
	<div>
		<div v-if="getTodayEvents.length">
			<TitleAtlas>Eventos hoje</TitleAtlas>
			<template v-if="windowWidth >= 768">
				<EventListItem v-for="event in getTodayEvents" :key="event.id" :event="event" class="mb-1"/>
			</template>
			<template v-else>
				<Carousel :margin="30" :nav="false" :responsive="carouselResponsivity">
					<EventCard v-for="event in getTodayEvents" :key="event.id" :event="event"/>
				</Carousel>
			</template>
		</div>
		<div v-if="getLoggedUserId !== -1" :class="getTodayEvents.length ? 'mt-5' : ''">
			<template
				v-if="getNextEventsByIdsTagsIdsCourses(getUserById(getLoggedUserId).interests.tags, getUserById(getLoggedUserId).interests.courses).length"
			>
				<TitleAtlas>Próximos eventos que poderá gostar</TitleAtlas>
				<template
					v-for="event in getNextEventsByIdsTagsIdsCourses(getUserById(getLoggedUserId).interests.tags, getUserById(getLoggedUserId).interests.courses)"
				>
					<template v-if="$moment(event.dateStart).isAfter($moment())">
						<template v-if="windowWidth >= 768">
							<EventListItem :key="event.id" :event="event"/>
						</template>
						<template v-else>
							<EventCard :key="event.id" :event="event" class="mb-1"/>
						</template>
					</template>
				</template>
			</template>
			<template v-else>
				<TitleAtlas>Próximos eventos</TitleAtlas>
				<template v-for="event in getNextEvents">
					<template v-if="$moment(event.dateStart).isAfter($moment())">
						<template v-if="windowWidth >= 768">
							<EventListItem :key="event.id" :event="event"/>
						</template>
						<template v-else>
							<EventCard :key="event.id" :event="event" class="mb-1"/>
						</template>
					</template>
				</template>
			</template>
		</div>
		<div :class="getTodayEvents.length ? 'mt-5' : ''" v-else>
			<TitleAtlas>Próximos eventos</TitleAtlas>
			<template v-for="event in getNextEvents">
				<template v-if="$moment(event.dateStart).isAfter($moment())">
					<template v-if="windowWidth >= 768">
						<EventListItem :key="event.id" :event="event"/>
					</template>
					<template v-else>
						<EventCard :key="event.id" :event="event" class="mb-1"/>
					</template>
				</template>
			</template>
		</div>
		<div class="mt-5" v-if="getTopUsersEnrolledEvents.length">
			<TitleAtlas>TOP {{ getTopUsersEnrolledEvents.length >= 4 ? "4" : getTopUsersEnrolledEvents.length }} inscrições em eventos</TitleAtlas>
			<div class="row text-center">
				<div
					v-for="(user, index) in getTopUsersEnrolledEvents"
					class="col-lg-3 col-md-6 col-12 mb-4"
					:key="'user_' + user.id"
				>
					<template v-if="index <= 3" class="mt-5">
						<router-link
							class="text-atlas2"
							:to="{ name: 'profile', params: { username: getUserById(user.id).username } }"
						>
							<img
								:src="getUserById(user.id).picture"
								class="rounded-circle img-thumbnail"
								style="max-width: 200px; max-height: 200px;"
							>
						</router-link>
						<h5>{{ user.amount }} inscrições</h5>
						<div>
							<router-link
								class="text-atlas2"
								:to="{ name: 'profile', params: { username: getUserById(user.id).username } }"
							>@{{ getUserById(user.id).username }}</router-link>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import TitleAtlas from "@/components/TitleAtlas.vue"
import Carousel from "vue-owl-carousel"
import EventCard from "@/components/EventCard.vue"
import EventListItem from "@/components/EventListItem.vue"

export default {
	name: "HomeView",
	components: {
		TitleAtlas,
		Carousel,
		EventCard,
		EventListItem
	},
	created() {
		window.addEventListener("resize", this.handleResize)
		this.handleResize()
	},
	data() {
		return {
			windowWidth: 0,
			carouselResponsivity: {
				0: { items: 1 },
				768: { items: 2 },
				1200: { items: 3 }
			}
		}
	},
	computed: {
		...mapGetters([
			"getLoggedUserId",
			"getTodayEvents",
			"getEventsByIdsTagsIdsCourses",
			"getUserById",
			"getNextEvents",
			"getNextEventsByIdsTagsIdsCourses",
			"getTopUsersEnrolledEvents"
		])
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		}
	}
}
</script>
