<template>
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
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import { mapGetters } from "vuex"

export default {
	name: "EventInfoView",
	components: { TitleAtlas },
	created() {
		this.event = this.getEventById(parseInt(this.$route.params.id))
	},
	data() {
		return {
			event: {}
		}
	},
	computed: {
		...mapGetters(["getEventById", "getTagById", "getUserById"])
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
