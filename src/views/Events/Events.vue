<template>
	<div>
		<Panel title="Pesquisar eventos">
			<div class="row">
				<b-form-group
					label="Nome/proponente"
					label-for="name"
					class="col-lg-3 col-12"
					@input="getUrlQuery"
				>
					<b-form-input id="name" v-model="name" type="text" maxlength="50"></b-form-input>
				</b-form-group>
				<b-form-group label="Depois de" label-for="dateStart" class="col-lg-3 col-sm-6">
					<b-form-input id="dateStart" v-model="dateStart" type="date"></b-form-input>
				</b-form-group>
				<b-form-group label="Antes de" label-for="dateEnd" class="col-lg-3 col-sm-6">
					<b-form-input id="dateEnd" v-model="dateEnd" type="date"></b-form-input>
				</b-form-group>
				<b-form-group :label="windowWidth >= 992 ? '&nbsp;' : ''" class="col-lg-3 col-12">
					<button class="btn btn-atlas1 col-12" @click="tagsCollapse = !tagsCollapse">
						<i class="fa" :class="!tagsCollapse ? 'fa-arrow-down' : 'fa-arrow-up'" aria-hidden="true"></i> Pesquisa avançada
					</button>
				</b-form-group>
				<b-collapse id="tagsCollapse" class="col-12 mb-3" v-model="tagsCollapse">
					<b-card>
						<div class="row">
							<b-form-group label="Tags" label-for="filterTag" class="col-12">
								<b-form-input
									id="filterTag"
									v-model="filterTags"
									type="text"
									maxlength="50"
									placeholder="Filtrar tags..."
								></b-form-input>
								<b-form-checkbox-group
									v-model="selectedTags"
									name="tags"
									:options="getFilteredTags"
									:stacked="true"
									style="overflow-y: scroll; max-height: 200px;"
									class="mt-2 px-1"
								></b-form-checkbox-group>
							</b-form-group>
							<b-form-group
								label="Curso"
								label-for="course"
								class="col-lg-6 col-sm-6 col-12"
								@input="getUrlQuery"
							>
								<b-form-input id="course" v-model="course" type="text" maxlength="50"></b-form-input>
							</b-form-group>
							<b-form-group
								label="Sala"
								label-for="classroom"
								class="col-lg-6 col-sm-6 col-12"
								@input="getUrlQuery"
							>
								<b-form-input id="classroom" v-model="classroom" type="text" maxlength="50"></b-form-input>
							</b-form-group>
						</div>
					</b-card>
				</b-collapse>
				<transition name="fade" mode="in-out">
					<div class="col-12" v-if="filtering">
						<button class="btn btn-atlas1 col-12" @click="clearSearch">Limpar pesquisa</button>
					</div>
				</transition>
			</div>
		</Panel>
		<div v-if="!filtering">
			<div class="pt-5">
				<TitleAtlas>Sugestões</TitleAtlas>
				<Carousel :margin="30" :nav="false" :responsive="carouselResponsivity">
					<EventCard v-for="event in getEvents" :key="event.id" :event="event"/>
				</Carousel>
			</div>
			<div class="pt-5">
				<TitleAtlas>Eventos anteriores</TitleAtlas>
				<template v-if="windowWidth >= 768">
					<EventListItem
						v-for="event in getEndedEventsSelectedPage"
						:key="event.id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<EventCard
					v-else
					v-for="event in getEndedEventsSelectedPage"
					:ended="true"
					:key="event.id"
					:event="event"
					class="mb-1"
				/>
				<vs-pagination
					:total="totalPages"
					v-model="currentPage"
					class="mt-3"
					v-if="getEndedEvents.length > endedEventsPerPage"
				/>
			</div>
		</div>
		<div v-else class="mt-5">
			<div v-if="getFilteredEvents.length">
				<TitleAtlas>{{ getFilteredEvents.length === 1 ? 'Resultado' : 'Resultados' }} da pesquisa - {{ getFilteredEvents.length }}</TitleAtlas>
				<template v-if="windowWidth >= 768">
					<EventListItem
						v-for="event in getFilteredEventsSelectedPage"
						:key="event.id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<template v-else>
					<EventCard
						v-for="event in getFilteredEventsSelectedPage"
						:key="event.id"
						:event="event"
						class="mb-1"
					/>
				</template>

				<vs-pagination
					:total="totalPages"
					v-model="currentPage"
					class="mt-3"
					v-if="getFilteredEvents.length > filteredEventsPerPage"
				/>
			</div>
			<div v-else>
				<p>Sem resultados para a sua pesquisa.</p>
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

		this.getTotalPages()

		let query = this.$route.query
		if (query) {
			if (query.nome) this.name = query.nome
			if (query.depois_de) this.dateStart = query.depois_de
			if (query.tags) {
				let tags = query.tags.split("_")
				let tagIds = []
				tags.forEach(tag => tagIds.push(this.getTagByName(tag).id))
				this.selectedTags = tagIds
				this.tagsCollapse = true
			}
			if (query.curso) {
				this.course = query.curso
				this.tagsCollapse = true
			}
			if (query.sala) {
				this.classroom = query.sala
				this.tagsCollapse = true
			}
		}
	},
	data() {
		return {
			name: "",
			tags: "",
			dateStart: "",
			dateEnd: "",
			tagsCollapse: false,
			filterTags: "",
			selectedTags: [],
			course: "",
			classroom: "",
			carouselResponsivity: {
				0: { items: 1 },
				768: { items: 2 },
				1200: {items: 3}
			},
			windowWidth: 0,
			totalPages: 1,
			currentPage: 1,
			endedEventsPerPage: 5,
			totalPagesFilteredEvents: 1,
			filteredEventsPerPage: 10
		}
	},
	computed: {
		...mapGetters([
			"getEvents",
			"getEndedEvents",
			"getUserById",
			"getTags",
			"getTagById",
			"getTagByName",
			"getCourseById"
		]),
		getEndedEventsSelectedPage() {
			if (this.getEndedEvents.length > this.endedEventsPerPage) {
				return this.getEndedEvents.slice(
					(this.currentPage - 1) * this.endedEventsPerPage,
					this.endedEventsPerPage * this.currentPage
				)
			} else {
				return this.getEndedEvents
			}
		},
		filtering() {
			this.currentPage = 1
			return (
				this.name ||
				this.dateStart ||
				this.dateEnd ||
				this.selectedTags.length ||
				this.course ||
				this.classroom
			)
		},
		getUrlQuery() {
			let queryResult = {}
			if (this.name) {
				queryResult.nome = this.name
			} else {
				delete queryResult.nome
			}

			if (this.dateStart) {
				queryResult.depois_de = this.dateStart
			} else {
				delete queryResult.depois_de
			}

			if (this.dateEnd) {
				queryResult.antes_de = this.dateEnd
			} else {
				delete queryResult.antes_de
			}

			if (this.selectedTags.length) {
				let tagNames = []
				this.selectedTags.forEach(selectedTag =>
					tagNames.push(this.getTagById(selectedTag).name)
				)
				queryResult.tags = tagNames.join("_")
			}

			if (this.course) {
				queryResult.curso = this.course
			} else {
				delete queryResult.curso
			}

			if (this.classroom) {
				queryResult.sala = this.classroom
			} else {
				delete queryResult.sala
			}

			this.getTotalPages()
			this.$router.replace({ name: "events", query: queryResult })
			return true
		},
		getFilteredEvents() {
			return this.getEvents.filter(event => {
				let result = true

				if (this.name) {
					result =
						(event.name
							.toLowerCase()
							.includes(this.name.toLowerCase()) ||
							this.getUserById(event.authorId)
								.username.toLowerCase()
								.includes(this.name.toLowerCase())) &&
						result
				}

				if (this.dateStart) {
					result =
						this.$moment(this.dateStart) <=
							this.$moment(event.dateStart) && result
				}

				if (this.dateEnd) {
					result =
						this.$moment(this.dateEnd) >=
							this.$moment(event.dateStart) && result
				}

				if (this.selectedTags.length) {
					result =
						this.selectedTags.every(selectedTag =>
							event.tags.some(
								eventTag => selectedTag === eventTag
							)
						) && result
				}

				if (this.course) {
					result =
						event.coursesIds.some(course =>
							this.getCourseById(course)
								.name.toLowerCase()
								.includes(this.course.toLowerCase())
						) && result
				}

				if (this.classroom) {
					result =
						event.classroom
							.toLowerCase()
							.includes(this.classroom.toLowerCase()) && result
				}

				return result
			})
		},
		getFilteredEventsSelectedPage() {
			if (this.getFilteredEvents.length > this.filteredEventsPerPage) {
				return this.getFilteredEvents.slice(
					(this.currentPage - 1) * this.filteredEventsPerPage,
					this.filteredEventsPerPage * this.currentPage
				)
			} else {
				return this.getFilteredEvents
			}
		},
		getFilteredTags() {
			let tags = []
			this.getTags.forEach(tag => {
				tags.push({
					text: tag.name,
					value: tag.id
				})
			})

			// alphabetical order
			tags.sort((a, b) => {
				if (a.name > b.name) {
					return 1
				} else if (a.name < b.name) {
					return -1
				}
				return 0
			})

			if (!this.filterTags) {
				return tags
			} else {
				return tags.filter(tag =>
					tag.text
						.toLowerCase()
						.includes(this.filterTags.toLowerCase())
				)
			}
		}
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		},
		clearSearch() {
			this.name = ""
			this.dateStart = ""
			this.dateEnd = ""
			this.selectedTags = []
			this.course = ""
			this.tagsCollapse = false
		},
		getTotalPages() {
			if (!this.filtering) {
				this.totalPages =
					this.getEndedEvents.length <= this.endedEventsPerPage
						? 1
						: Math.floor(
								this.getEndedEvents.length /
									this.endedEventsPerPage
						  ) + 1
			} else {
				this.totalPages =
					this.getFilteredEvents.length <= this.filteredEventsPerPage
						? 1
						: Math.floor(
								this.getFilteredEvents.length /
									this.filteredEventsPerPage
						  ) + 1
			}
		}
	}
}
</script>

<style lang="scss">
@import "../../../node_modules/@voerro/vue-tagsinput/dist/style.css";
</style>
