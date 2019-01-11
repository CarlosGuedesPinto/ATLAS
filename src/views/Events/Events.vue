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
			<EventListItem
				v-for="event in getEvents"
				:key="event.id"
				:to="{name: 'eventsInfo', params: {id: event.id}}"
				:event="event"
				class="mb-1"
			></EventListItem>
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
	data() {
		return {
			name: "",
			tags: "",
			dateStart: "",
			dateEnd: "",
			carouselResponsivity: {
				0: { items: 1 },
				576: { items: 2 },
				768: { items: 3 },
				1200: { items: 4 }
			}
		}
	},
	computed: {
		...mapGetters(["getEvents"])
	}
}
</script>

<style lang="scss">
@import "../../../node_modules/@voerro/vue-tagsinput/dist/style.css";
</style>
