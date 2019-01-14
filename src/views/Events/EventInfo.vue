<template>
	<div>
		<TitleAtlas>{{ event.name }}</TitleAtlas>
		<div class="row">
			<div class="col-xl-4 col-lg-3 col-md-5 col-6">
				<img :src="event.picture.poster" class="img-fluid img-thumbnail">
			</div>
			<div class="col-xl-8 col-lg-9 col-md-5 col-12">
				<div></div>
				<div>
					<h4>Descrição:</h4>
					{{ event.description }}
				</div>
				<div class="mt-4">
					<template v-for="tag in event.tags">#{{ getTagById(tag).name }}&nbsp;</template>
				</div>

				<hr class="bg-atlas1">
				<div class="row">
					<button
						class="col-lg-4 col-md-9 col-sm-20 btn btn-atlas2 px-1 mr-auto ml-auto"
						style="border-radius: 2em;"
					>
						<i class="fa fa-star"></i> Com interesse
					</button>
					<button
						class="col-lg-4 col-md-9 col-sm-20 btn btn-atlas2 px-2 mr-auto ml-auto"
						style="border-radius: 2em;"
					>
						<i class="fa fa-archive text-teca4"></i> Inscrever-me
					</button>
				</div>
				<hr class="bg-atlas1">
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
		...mapGetters(["getEventById", "getTagById"])
    },
    methods: {
        sortToDo(type) {
            switch(type) {
                case "alphabetic":
                    this.toDos.sort(/* função para ordenar */)
                    break;
            }
        }
    }
}
</script>
