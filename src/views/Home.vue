<template>
	<div>
		<div v-if="!loadingData" class="text-center">
			<b-spinner variant="atlas" label="A carregar..." style="width: 8rem; height: 8rem;"></b-spinner>
		</div>
		<div v-else>
			<div v-if="events.today.length">
				<TitleAtlas>Eventos de hoje</TitleAtlas>
				<template v-if="windowWidth >= 768">
					<EventListItem
						v-for="event in events.today"
						:key="'today_' + event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<template v-else>
					<Carousel :margin="30" :nav="false" :responsive="carouselResponsivity">
						<EventCard v-for="event in events.today" :key="'today_' + event._id" :event="event"/>
					</Carousel>
				</template>
			</div>
			<div
				v-if="getLoggedUser.username && events.suggested.length"
				:class="events.today.length ? 'mt-5' : ''"
			>
				<TitleAtlas>Próximos eventos que poderá gostar</TitleAtlas>
				<template v-for="event in events.suggested">
					<template v-if="windowWidth >= 768">
						<EventListItem :key="'suggested_' + event._id" :event="event"/>
					</template>
					<template v-else>
						<EventCard :key="'suggested_' + event._id" :event="event" class="mb-1"/>
					</template>
				</template>
			</div>
			<div
				:class="events.today.length ? 'mt-5' : ''"
				v-else-if="events.next.length"
			>
				<TitleAtlas>Próximos eventos</TitleAtlas>
				<template v-for="event in events.next">
					<template v-if="windowWidth >= 768">
						<EventListItem :key="'next_' + event.id" :event="event" class="mb-1"/>
					</template>
					<template v-else>
						<EventCard :key="'next_' + event.id" :event="event" class="mb-1"/>
					</template>
				</template>
			</div>
			<div class="mt-5" v-if="users.length">
				<TitleAtlas>TOP {{ users.length >= 4 ? "4" : users.length }} inscrições em eventos</TitleAtlas>
				<div class="row text-center">
					<div
						v-for="(user, index) in users"
						class="col-lg-3 col-md-6 col-12 mb-4"
						:key="'user_' + user._id"
					>
						<template v-if="index <= 3" class="mt-5">
							<router-link
								class="text-atlas2"
								:to="{ name: 'profile', params: { username: user.username } }"
							>
								<img
									:src="user.picture"
									class="rounded-circle img-thumbnail"
									style="max-width: 200px; max-height: 200px;"
								>
							</router-link>
							<h5>{{ user.amount }} inscrições</h5>
							<div>
								<router-link
									class="text-atlas2"
									:to="{ name: 'profile', params: { username: user.username } }"
								>@{{ user.username }}</router-link>
							</div>
						</template>
					</div>
				</div>
			</div>
			<div class="mt-5" v-if="events.top.length">
				<TitleAtlas>TOP {{ events.top.length >= 4 ? "4" : events.top.length }} eventos com mais inscrições</TitleAtlas>
				<template v-if="windowWidth >= 768">
					<template v-for="(event, index) in events.top">
						<EventListItem
							:key="'top_' + event.id + '_' + index"
							:event="event"
							class="mb-1"
							v-if="index <= 3"
						/>
					</template>
				</template>
				<template v-else>
					<Carousel :margin="30" :nav="false" :responsive="carouselResponsivity">
						<template v-for="(event, index) in events.top">
							<EventCard :key="'top_' + event.id + '_' + index" :event="event" v-if="index <= 3"/>
						</template>
					</Carousel>
				</template>
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
		this.loadTodays()
		this.loadNext()
		if (this.getLoggedUser.username) {
			this.loadSuggested()
		}
		this.loadTopUsers()
		this.loadTopEvents()
	},
	data() {
		return {
			loading: {
				today: false,
				next: false,
				suggested: false,
				topEvents: false,
				users: false
			},
			events: {
				today: [],
				next: [],
				top: [],
				suggested: []
			},
			users: [],
			windowWidth: 0,
			carouselResponsivity: {
				0: { items: 1 },
				768: { items: 2 },
				1200: { items: 3 }
			}
		}
	},
	computed: {
		...mapGetters(["getLoggedUser"]),
		loadingData() {
			return (
				!this.loading.today &&
				!this.loading.next &&
				!this.loading.topEvents &&
				!this.loading.suggested &&
				!this.loading.users
			)
		}
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		},
		async loadTodays() {
			this.loading.today = true
			try {
				const response = await this.$http.get("/events/occasions/today")
				this.events.today = response.data.content.events
			} catch (err) {}
			this.loading.today = false
		},
		async loadNext() {
			this.loading.next = true
			try {
				const response = await this.$http.get("/events/occasions/next")
				this.events.next = response.data.content.events
			} catch (err) {}
			this.loading.next = false
		},
		async loadSuggested() {
			this.loading.suggested = true
			try {
				const response = await this.$http.get(
					`/events/suggested/${this.getLoggedUser._id}`
				)
				this.events.suggested = response.data.content.events
			} catch (err) {}
			this.loading.suggested = false
		},
		async loadTopUsers() {
			this.loading.users = true
			try {
				const response = await this.$http.get(`/users/top`)
				this.users = response.data.content.users
			} catch (err) {}
			this.loading.users = false
		},
		async loadTopEvents() {
			this.loading.top = true
			try {
				const response = await this.$http.get(`/events/top`)
				this.events.top = response.data.content.events
			} catch (err) {}
			this.loading.top = false
		}
	}
}
</script>
