<template>
	<div>
		<Panel title="Pesquisar eventos">
			<div class="row">
				<b-form-group label="Nome/proponente" label-for="name" class="col-lg-3 col-sm-6">
					<b-form-input id="name" v-model="name" type="text" maxlength="50"></b-form-input>
				</b-form-group>
				<b-form-group label="Tags" label-for="tags" class="col-lg-3 col-sm-6">
					<b-form-input id="tags" v-model="tags" type="text" maxlength="50"></b-form-input>
				</b-form-group>
				<b-form-group label="A partir de" label-for="dateStart" class="col-lg-3 col-sm-6">
					<b-form-input id="dateStart" v-model="dateStart" type="date"></b-form-input>
				</b-form-group>
				<b-form-group label="Antes de" label-for="dateEnd" class="col-lg-3 col-sm-6">
					<b-form-input id="dateEnd" v-model="dateEnd" type="date"></b-form-input>
				</b-form-group>
			</div>
		</Panel>
		<div class="pt-5">
			<TitleAtlas>Sugestões</TitleAtlas>
			<Carousel :margin="30" :nav="false" :responsive="carouselResponsivity">
				<EventCard
					v-for="event in getEvents"
					:key="event.id"
					:event="event"
					:to="{name: 'eventsInfo', params: {id: event.id}}"
				/>
			</Carousel>
		</div>
		<div class="pt-5">
			<TitleAtlas>Eventos anteriores</TitleAtlas>
			<template v-if="windowWidth >= 768">
				<EventListItem
					v-for="event in getEndedEventsSelectedPage"
					:key="event.id"
					:to="{name: 'eventsInfo', params: {id: event.id}}"
					:event="event"
					class="mb-1"
				/>
			</template>
			<EventCard
				v-else
				v-for="event in getEndedEventsSelectedPage"
				:ended="true"
				:key="event.id"
				:to="{name: 'eventsInfo', params: {id: event.id}}"
				:event="event"
				class="mb-1"
			/>
			<div class="mt-3" v-if="getEndedEvents.length > endedEventsPerPage">
				<vs-pagination :total="totalPages" v-model="currentPage"/>
			</div>
		</div>
	</div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import Panel from "@/components/Panel.vue"
import Carousel from "vue-owl-carousel"
import EventCard from "@/components/EventCard.vue"
import EventListItem from "@/components/EventListItem.vue"

import { mapGetters } from "vuex"

export default {
	components: { TitleAtlas, Panel, Carousel, EventCard, EventListItem },
	created() {
		window.addEventListener("resize", this.handleResize)
		this.handleResize()

		this.totalPages =
			this.getEndedEvents.length <= this.endedEventsPerPage
				? 1
				: Math.floor(
						this.getEndedEvents.length / this.endedEventsPerPage
				  ) + 1
	},
	data() {
		return {
			name: "",
			tags: "",
			dateStart: "",
			dateEnd: "",
			carouselResponsivity: {
				0: { items: 1 },
				768: { items: 2 },
				992: { items: 3 },
				1200: { items: 4 }
			},
			windowWidth: 0,
			totalPages: 1,
			currentPage: 1,
			endedEventsPerPage: 5
		}
	},
	computed: {
		...mapGetters(["getEvents", "getEndedEvents"]),
		getEndedEventsSelectedPage() {
			if (this.getEndedEvents.length > this.endedEventsPerPage) {
				return this.getEndedEvents.slice(
					(this.currentPage - 1) * this.endedEventsPerPage,
					this.endedEventsPerPage * this.currentPage
				)
			} else {
				return this.getEndedEvents
			}
		}
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		}
	}
}
</script>

<style lang="scss">
@import "../../../node_modules/@voerro/vue-tagsinput/dist/style.css";
</style>
