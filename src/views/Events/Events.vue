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
					<b-form-input
						id="name"
						v-model="name"
						type="text"
						maxlength="50"
						:disabled="loading.next || loading.previous"
					></b-form-input>
				</b-form-group>
				<b-form-group label="Depois de" label-for="dateStart" class="col-lg-3 col-sm-6">
					<b-form-input
						id="dateStart"
						v-model="dateStart"
						type="date"
						:disabled="loading.next || loading.previous"
					></b-form-input>
				</b-form-group>
				<b-form-group label="Antes de" label-for="dateEnd" class="col-lg-3 col-sm-6">
					<b-form-input
						id="dateEnd"
						v-model="dateEnd"
						type="date"
						:disabled="loading.next || loading.previous"
					></b-form-input>
				</b-form-group>
				<b-form-group :label="windowWidth >= 992 ? '.' : ''" class="col-lg-3 col-12">
					<button
						class="btn btn-atlas1 col-12"
						@click="searchCollapse = !searchCollapse"
						:disabled="loading.next || loading.previous"
					>
						<i class="fa" :class="!searchCollapse ? 'fa-arrow-down' : 'fa-arrow-up'" aria-hidden="true"></i> Pesquisa avançada
					</button>
				</b-form-group>
				<b-collapse id="searchCollapse" class="col-12 mb-3" v-model="searchCollapse">
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
							<b-form-group label="Sala" class="col-lg-6 col-sm-6 col-12">
								<b-form-select v-model="classroom">
									<option value>Selecione uma sala</option>
									<template v-if="classrooms.length">
										<option
											value="Associação de Estudantes"
											v-if="classrooms.some(classroom => classroom === 'Associação de Estudantes')"
										>Associação de Estudantes</option>
										<option
											value="Auditório"
											v-if="classrooms.some(classroom => classroom === 'Auditório')"
										>Auditório</option>
										<optgroup label="Piso 0" v-if="classroomFloorCondition('Piso 0')">
											<option
												value="Anfiteatro Joaquim Ribeiro"
												v-if="classrooms.some(classroom => classroom === 'Anfiteatro Joaquim Ribeiro')"
											>Anfiteatro Joaquim Ribeiro</option>
											<option value="B102" v-if="classrooms.some(classroom => classroom === 'B102')">B102</option>
											<option value="B103A" v-if="classrooms.some(classroom => classroom === 'B103A')">B103A</option>
											<option value="B103B" v-if="classrooms.some(classroom => classroom === 'B103B')">B103B</option>
											<option value="B104" v-if="classrooms.some(classroom => classroom === 'B104')">B104</option>
											<option value="B105" v-if="classrooms.some(classroom => classroom === 'B105')">B105</option>
											<option value="B106" v-if="classrooms.some(classroom => classroom === 'B106')">B106</option>
											<option value="B107" v-if="classrooms.some(classroom => classroom === 'B107')">B107</option>
											<option value="B108" v-if="classrooms.some(classroom => classroom === 'B108')">B108</option>
											<option value="B109" v-if="classrooms.some(classroom => classroom === 'B109')">B109</option>
											<option value="B110" v-if="classrooms.some(classroom => classroom === 'B110')">B110</option>
											<option value="B111" v-if="classrooms.some(classroom => classroom === 'B111')">B111</option>
											<option value="B112" v-if="classrooms.some(classroom => classroom === 'B112')">B112</option>
										</optgroup>
										<optgroup label="Piso 1" v-if="classroomFloorCondition('Piso 1')">
											<option value="B201" v-if="classrooms.some(classroom => classroom === 'B201')">B201</option>
											<option value="B202" v-if="classrooms.some(classroom => classroom === 'B202')">B202</option>
											<option value="B203" v-if="classrooms.some(classroom => classroom === 'B203')">B203</option>
											<option value="B204" v-if="classrooms.some(classroom => classroom === 'B204')">B204</option>
											<option value="B205" v-if="classrooms.some(classroom => classroom === 'B205')">B205</option>
											<option value="B206" v-if="classrooms.some(classroom => classroom === 'B206')">B206</option>
											<option value="B207" v-if="classrooms.some(classroom => classroom === 'B207')">B207</option>
											<option value="B208" v-if="classrooms.some(classroom => classroom === 'B208')">B208</option>
											<option value="B209" v-if="classrooms.some(classroom => classroom === 'B209')">B209</option>
											<option value="B210" v-if="classrooms.some(classroom => classroom === 'B210')">B210</option>
											<option value="B211" v-if="classrooms.some(classroom => classroom === 'B211')">B211</option>
											<option value="B212" v-if="classrooms.some(classroom => classroom === 'B212')">B212</option>
										</optgroup>
										<optgroup label="Piso 2" v-if="classroomFloorCondition('Piso 2')">
											<option value="B301" v-if="classrooms.some(classroom => classroom === 'B301')">B301</option>
											<option value="B302" v-if="classrooms.some(classroom => classroom === 'B302')">B302</option>
											<option value="B303" v-if="classrooms.some(classroom => classroom === 'B303')">B303</option>
											<option value="B304" v-if="classrooms.some(classroom => classroom === 'B304')">B304</option>
											<option value="B305" v-if="classrooms.some(classroom => classroom === 'B305')">B305</option>
											<option value="B306" v-if="classrooms.some(classroom => classroom === 'B306')">B306</option>
											<option value="B307" v-if="classrooms.some(classroom => classroom === 'B307')">B307</option>
											<option value="B308" v-if="classrooms.some(classroom => classroom === 'B308')">B308</option>
											<option value="B309" v-if="classrooms.some(classroom => classroom === 'B309')">B309</option>
											<option value="B310" v-if="classrooms.some(classroom => classroom === 'B310')">B310</option>
											<option value="B311" v-if="classrooms.some(classroom => classroom === 'B311')">B311</option>
											<option value="B312" v-if="classrooms.some(classroom => classroom === 'B312')">B312</option>
										</optgroup>
									</template>
								</b-form-select>
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
				<TitleAtlas>Próximos eventos</TitleAtlas>
				<div v-if="loading.next" class="text-center">
					<b-spinner variant="atlas" label="A carregar..." style="width: 8rem; height: 8rem;"></b-spinner>
				</div>
				<div v-else>
					<template v-if="windowWidth >= 768">
						<EventListItem v-for="event in events.next" :key="event._id" :event="event" class="mb-1"/>
					</template>
					<template v-else>
						<Carousel :margin="30" :nav="false" :responsive="carouselResponsivity">
							<EventCard v-for="event in events.next" :key="event._id" :event="event"/>
						</Carousel>
					</template>
				</div>
			</div>
			<div class="pt-5">
				<TitleAtlas>Eventos anteriores</TitleAtlas>
				<div v-if="loading.previous" class="text-center">
					<b-spinner variant="atlas" label="A carregar..." style="width: 8rem; height: 8rem;"></b-spinner>
				</div>
				<div v-else>
					<template v-if="windowWidth >= 768">
						<EventListItem
							v-for="event in getEndedEventsSelectedPage"
							:key="event._id"
							:event="event"
							class="mb-1"
						/>
					</template>
					<EventCard
						v-else
						v-for="event in getEndedEventsSelectedPage"
						:ended="true"
						:key="event._id"
						:event="event"
						class="mb-1"
					/>
					<vs-pagination
						:total="totalPages"
						v-model="currentPage"
						class="mt-3"
						v-if="events.previous.length > endedEventsPerPage"
					/>
				</div>
			</div>
		</div>
		<div v-else class="mt-5">
			<div v-if="getFilteredEvents.length">
				<TitleAtlas>{{ getFilteredEvents.length === 1 ? 'Resultado' : 'Resultados' }} da pesquisa - {{ getFilteredEvents.length }}</TitleAtlas>
				<template v-if="windowWidth >= 768">
					<EventListItem
						v-for="event in getFilteredEventsSelectedPage"
						:key="event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<template v-else>
					<EventCard
						v-for="event in getFilteredEventsSelectedPage"
						:key="event._id"
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

		this.loadNext()
		this.loadPrevious()

		let query = this.$route.query
		if (query) {
			if (query.nome) this.name = query.nome
			if (query.depois_de) this.dateStart = query.depois_de
			if (query.tags) {
				let tags = query.tags.split("_")
				this.selectedTags = tags
				this.searchCollapse = true
			}
			if (query.curso) {
				this.course = query.curso
				this.searchCollapse = true
			}
			if (query.sala) {
				this.classroom = query.sala
				this.searchCollapse = true
			}
		}
	},
	watch: {
		loadingDone() {
			if (!this.loading.next && !this.loading.previous) {
				this.getTotalPages()
				this.loadClassrooms()
				this.loadTags()
			}
		},
		getFilteredEvents() {
			this.getTotalPages()
		}
	},
	beforeRouteUpdate(to, from, next) {
		if (to.name === "events" && to.query) {
			if (to.query.tags) {
				let tags = to.query.tags.split("_")
				this.selectedTags = tags
				this.searchCollapse = true
			}
			if (to.query.sala) {
				this.classroom = to.query.sala
				this.searchCollapse = true
			}
		}
		next()
	},
	data() {
		return {
			events: {
				next: [],
				previous: []
			},
			eventTags: [],
			loading: {
				tags: false,
				next: false,
				previous: false
			},
			name: "",
			tags: "",
			dateStart: "",
			dateEnd: "",
			searchCollapse: false,
			filterTags: "",
			selectedTags: [],
			course: "",
			classroom: "",
			classrooms: [],
			carouselResponsivity: {
				0: { items: 1 },
				768: { items: 2 },
				1200: { items: 3 }
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
		loadingDone() {
			return !this.loading.next && !this.loading.previous
		},
		getEndedEventsSelectedPage() {
			if (this.events.previous.length > this.endedEventsPerPage) {
				return this.events.previous.slice(
					(this.currentPage - 1) * this.endedEventsPerPage,
					(this.currentPage - 1) * this.endedEventsPerPage +
						this.endedEventsPerPage
				)
			} else {
				return this.events.previous
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
				this.classroom ||
				this.filterTags
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
				this.selectedTags.forEach(selectedTag => tagNames.push(selectedTag))
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

			this.$router.replace({ name: "events", query: queryResult })
			return true
		},
		getFilteredEvents() {
			const next = this.events.next.filter(event => {
				let result = true

				if (this.name) {
					result =
						(event.name.toLowerCase().includes(this.name.toLowerCase()) ||
							event.author.username
								.toLowerCase()
								.includes(this.name.toLowerCase())) &&
						result
				}

				if (this.dateStart) {
					result =
						this.$moment(this.dateStart) <= this.$moment(event.dateStart) &&
						result
				}

				if (this.dateEnd) {
					result =
						this.$moment(this.dateEnd) >= this.$moment(event.dateStart) &&
						result
				}

				if (this.selectedTags.length) {
					result =
						this.selectedTags.every(selectedTag =>
							event.tags.some(eventTag => selectedTag === eventTag.name)
						) && result
				}

				if (this.course) {
					result =
						event.courses.some(
							course =>
								course.name.toLowerCase().includes(this.course.toLowerCase()) ||
								course.abbreviation
									.toLowerCase()
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

			const previous = this.events.previous.filter(event => {
				let result = true

				if (this.name) {
					result =
						(event.name.toLowerCase().includes(this.name.toLowerCase()) ||
							event.author.username
								.toLowerCase()
								.includes(this.name.toLowerCase())) &&
						result
				}

				if (this.dateStart) {
					result =
						this.$moment(this.dateStart) <= this.$moment(event.dateStart) &&
						result
				}

				if (this.dateEnd) {
					result =
						this.$moment(this.dateEnd) >= this.$moment(event.dateStart) &&
						result
				}

				if (this.selectedTags.length) {
					result =
						this.selectedTags.every(selectedTag =>
							event.tags.some(eventTag => selectedTag === eventTag.name)
						) && result
				}

				if (this.course) {
					result =
						event.courses.some(
							course =>
								course.name.toLowerCase().includes(this.course.toLowerCase()) ||
								course.abbreviation
									.toLowerCase()
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

			return next.concat(previous)
		},
		getFilteredEventsSelectedPage() {
			if (this.getFilteredEvents.length > this.filteredEventsPerPage) {
				return this.getFilteredEvents.slice(
					(this.currentPage - 1) * this.filteredEventsPerPage,
					(this.currentPage - 1) * this.filteredEventsPerPage +
						this.filteredEventsPerPage
				)
			} else {
				return this.getFilteredEvents
			}
		},
		getFilteredTags() {
			if (!this.filterTags) {
				return this.eventTags
			} else {
				return this.eventTags.filter(tag =>
					tag.toLowerCase().includes(this.filterTags.toLowerCase())
				)
			}
		}
	},
	methods: {
		async loadNext() {
			// loads next events
			try {
				this.loading.next = true
				const response = await this.$http.get("/events/occasions/next")
				if (response.status === 200) {
					this.events.next = response.data.content.events
					this.loading.next = false
				}
			} catch (err) {
				console.log(err)
			}
		},
		async loadPrevious() {
			// loads previous events
			try {
				this.loading.previous = true
				const response = await this.$http.get("/events/occasions/previous")
				if (response.status === 200) {
					this.events.previous = response.data.content.events
					this.loading.previous = false
				}
			} catch (err) {
				console.log(err)
			}
		},
		loadClassrooms() {
			let classrooms = []
			this.events.next.forEach(nextEvent => {
				if (classrooms.indexOf(nextEvent.classroom) === -1) {
					classrooms.push(nextEvent.classroom)
				}
			})

			this.events.previous.forEach(previousEvent => {
				if (classrooms.indexOf(previousEvent.classroom) === -1) {
					classrooms.push(previousEvent.classroom)
				}
			})

			classrooms.sort((a, b) => {
				if (a > b) {
					return 1
				} else if (a < b) {
					return -1
				}
				return 0
			})

			this.classrooms = classrooms
		},
		loadTags() {
			let tags = []
			this.events.next.forEach(nextEvent => {
				nextEvent.tags.forEach(tag => {
					if (tags.indexOf(tag.name) === -1) {
						tags.push(tag.name)
					}
				})
			})

			this.events.previous.forEach(previousEvent => {
				previousEvent.tags.forEach(tag => {
					if (tags.indexOf(tag.name) === -1) {
						tags.push(tag.name)
					}
				})
			})

			tags.sort((a, b) => {
				if (a > b) {
					return 1
				} else if (a < b) {
					return -1
				}
				return 0
			})
			this.eventTags = tags
		},
		handleResize() {
			this.windowWidth = window.innerWidth
		},
		clearSearch() {
			this.name = ""
			this.dateStart = ""
			this.dateEnd = ""
			this.selectedTags = []
			this.filterTags = ""
			this.course = ""
			this.classroom = ""
			this.searchCollapse = false
		},
		getTotalPages() {
			if (!this.filtering) {
				this.totalPages = Math.ceil(
					this.events.previous.length / this.endedEventsPerPage
				)
			} else {
				this.totalPages = Math.ceil(
					this.getFilteredEvents.length / this.filteredEventsPerPage
				)
			}
		},
		classroomFloorCondition(floor) {
			switch (floor) {
				case "Piso 0":
					return (
						this.classrooms.some(
							classroom => classroom === "Anfiteatro Joaquim Ribeiro"
						) ||
						this.classrooms.some(classroom => classroom === "B102") ||
						this.classrooms.some(classroom => classroom === "B103A") ||
						this.classrooms.some(classroom => classroom === "B103B") ||
						this.classrooms.some(classroom => classroom === "B104") ||
						this.classrooms.some(classroom => classroom === "B105") ||
						this.classrooms.some(classroom => classroom === "B106") ||
						this.classrooms.some(classroom => classroom === "B107") ||
						this.classrooms.some(classroom => classroom === "B108") ||
						this.classrooms.some(classroom => classroom === "B109") ||
						this.classrooms.some(classroom => classroom === "B110") ||
						this.classrooms.some(classroom => classroom === "B111") ||
						this.classrooms.some(classroom => classroom === "B112")
					)
					break
				case "Piso 1":
					return (
						this.classrooms.some(classroom => classroom === "B201") ||
						this.classrooms.some(classroom => classroom === "B202") ||
						this.classrooms.some(classroom => classroom === "B203") ||
						this.classrooms.some(classroom => classroom === "B204") ||
						this.classrooms.some(classroom => classroom === "B205") ||
						this.classrooms.some(classroom => classroom === "B206") ||
						this.classrooms.some(classroom => classroom === "B207") ||
						this.classrooms.some(classroom => classroom === "B208") ||
						this.classrooms.some(classroom => classroom === "B209") ||
						this.classrooms.some(classroom => classroom === "B210") ||
						this.classrooms.some(classroom => classroom === "B211") ||
						this.classrooms.some(classroom => classroom === "B212")
					)
					break
				case "Piso 2":
					return (
						this.classrooms.some(classroom => classroom === "B301") ||
						this.classrooms.some(classroom => classroom === "B302") ||
						this.classrooms.some(classroom => classroom === "B303") ||
						this.classrooms.some(classroom => classroom === "B304") ||
						this.classrooms.some(classroom => classroom === "B305") ||
						this.classrooms.some(classroom => classroom === "B306") ||
						this.classrooms.some(classroom => classroom === "B307") ||
						this.classrooms.some(classroom => classroom === "B308") ||
						this.classrooms.some(classroom => classroom === "B309") ||
						this.classrooms.some(classroom => classroom === "B310") ||
						this.classrooms.some(classroom => classroom === "B311") ||
						this.classrooms.some(classroom => classroom === "B312")
					)
					break
			}
		}
	}
}
</script>
