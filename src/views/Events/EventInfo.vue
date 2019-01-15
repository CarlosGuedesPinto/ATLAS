<template>
	<div>
		<div>
			<TitleAtlas>{{ event.name }}</TitleAtlas>
			<div class="row">
				<div class="col-lg-4 col-md-5 col-6 ml-auto mr-auto">
					<img :src="event.picture.poster" class="img-fluid img-thumbnail">
				</div>
				<div class="col-lg-8 col-12">
					<div>
						<h4>Descrição:</h4>
						{{ event.description }}
					</div>
					<hr class="bg-atlas1">
					<div>
						<div>
							<i class="fa fa-map-marker-alt text-atlas1" aria-hidden="true"></i>
							{{ event.classroom }}
						</div>
						<div>
							<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
							{{ event.dateEnd | moment("from", "now") }}
						</div>
						<div>
							<i class="fa fa-microphone-alt text-atlas1" aria-hidden="true"></i>
							{{ getUserById(event.authorId).name }}
						</div>
						<div>
							<i class="fa fa-users text-atlas1" aria-hidden="true"></i>
							53 vão
						</div>
						<div>
							<i class="fa fa-tags text-atlas1" aria-hidden="true"></i>
							<template v-for="tag in event.tags">&nbsp;#{{ getTagById(tag).name }}</template>
						</div>
						<div>
							<i class="fa fa-graduation-cap text-atlas1" aria-hidden="true"></i>
							Tecnologias e Sistemas de Informação para a Web
						</div>
					</div>
					<hr class="bg-atlas1">
					<div class="row">
						<button class="btn btn-atlas2 px-5 col-md-5 col-12 mx-1 mr-auto ml-auto mt-2" style="border-radius: 2em;">
							<i class="fa fa-star"></i> Com interesse
						</button>
						<button class="btn btn-atlas2 px-5 col-md-5 col-12 mx-1 mr-auto ml-auto mt-2" style="border-radius: 2em;">
							<i class="fa fa-sign-in-alt text-teca4"></i> Inscrever-me
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-5" v-if="event.picture.gallery">
			<TitleAtlas>Galeria</TitleAtlas>
			<Carousel :margin="30" :nav="false" :responsive="carouselResponsivity" :autoplay="true" :loop="true">
				<img v-for="(picture, index) in event.picture.gallery" :key="event.id + '_picture_' + index" :src="picture" alt="">
			</Carousel>
		</div>
		<div class="mt-5" v-if="enrollments">
			<TitleAtlas>Inscrições - {{ enrollments.length }}</TitleAtlas>
			<Carousel :margin="30" :nav="false" :center="true" :autoplay="true">
				<template v-for="enrollment in enrollments">
					<img :src="getUserById(enrollment.userId).picture" alt="" class="rounded-circle">
					<p>{{ getUserById(enrollment.userId).username }}</p>
				</template>
			</Carousel>
		</div>
	</div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import Carousel from "vue-owl-carousel"

import { mapGetters } from "vuex"

export default {
	name: "EventInfoView",
	components: { TitleAtlas, Carousel },
	created() {
		this.event = this.getEventById(parseInt(this.$route.params.id))
		this.enrollments = this.getEnrollmentsByEventId(this.event.id)
	},
	data() {
		return {
			event: {},
			carouselResponsivity: {
				0: { items: 1 },
				768: { items: 2 },
			},
			enrollments: []
		}
	},
	computed: {
		...mapGetters(["getEventById", "getTagById", "getUserById", "getEnrollmentsByEventId"])
	},
	methods: {
		sortToDo(type) {
			switch (type) {
				case "alphabetic":
					this.toDos.sort(/* função para ordenar */)
					break
			}
		}
	}
}
</script>
