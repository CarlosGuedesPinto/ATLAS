<template>
	<div>
		<div>
			<TitleAtlas>
				<b class="text-atlas2">[{{ event.category }}]</b>
				{{ event.name }}
				<template v-if="btnConditions()">
					<button class="btn btn-atlas2" @click="modalEdit = true">
						<i class="fa fa-edit" aria-hidden="true"></i>
					</button>
					<button class="btn btn-danger ml-2" @click="btnRemoveClicked()">
						<i class="fa fa-times" aria-hidden="true"></i>
					</button>
				</template>
			</TitleAtlas>
			<div class="row">
				<div
					class="ml-auto mr-auto mb-2"
					:class="event.picture.poster.orientation === 'Vertical' ? 'col-lg-4 col-md-5 col-6' : 'col-lg-6 col-12'"
				>
					<img :src="event.picture.poster.url" class="img-fluid img-thumbnail">
				</div>
				<div :class="event.picture.poster.orientation === 'Vertical' ? 'col-lg-8 col-12' : 'col-12'">
					<div>
						<h4>Descrição:</h4>
						{{ event.description }}
					</div>
					<hr class="bg-atlas1">
					<div>
						<div>
							<i class="fa fa-map-marker-alt text-atlas1" aria-hidden="true"></i>
							<router-link
								class="text-atlas2 ml-1"
								:to="{name: 'events', query: { sala: event.classroom } }"
							>{{ event.classroom }}</router-link>
						</div>
						<div>
							<i class="fa fa-calendar-alt text-atlas1 mr-1" aria-hidden="true"></i>
							<span
								v-if="event.dateStart === event.dateEnd"
							>{{ $moment(event.dateStart).format("dddd[,] LL") }}</span>
							<span
								v-else
							>{{ $moment(event.dateStart).format("dddd[,] LL") }} - {{ $moment(event.dateEnd).format("dddd[,] LL") }}</span>
						</div>
						<div>
							<i class="fa fa-clock text-atlas1" aria-hidden="true"></i>
							{{ event.hourStart }} - {{ event.hourEnd }}
						</div>
						<div>
							<router-link
								:to="{name: 'profile', params: { username: getUserById(event.authorId).username }}"
								class="text-atlas2"
							>
								<i class="fa fa-microphone-alt text-atlas1" aria-hidden="true"></i>
								&nbsp;@{{ getUserById(event.authorId).username }}
							</router-link>
						</div>
						<div>
							<i class="fa fa-users text-atlas1" aria-hidden="true"></i>
							53 vão
						</div>
						<div>
							<i class="fa fa-tags text-atlas1" aria-hidden="true"></i>
							<router-link
								v-for="tag in event.tags"
								:key="'tag_' + tag"
								:to="{name: 'events', query: { tags: getTagById(tag).name } }"
								class="text-atlas2"
							>#{{ getTagById(tag).name }}</router-link>
						</div>
						<div>
							<i class="fa fa-graduation-cap text-atlas1" aria-hidden="true"></i>&nbsp;
							<span v-for="(course, index) in event.coursesIds" :key="'course_' + course">
								<router-link
									:to="{name: 'events', query: { curso: getCourseById(course).name } }"
									class="text-atlas2"
								>{{ getCourseById(course).name }}</router-link>
								<span v-if="index < event.coursesIds.length - 1">/</span>
							</span>
						</div>
						<div v-if="event.paid">
							<i class="fa fa-sign-in-alt text-atlas1" aria-hidden="true"></i>
							&nbsp;
							Preço de inscrição {{ event.paymentPrice }} €
						</div>
					</div>
					<template v-if="$moment(event.dateEnd).isAfter($moment())">
						<hr class="bg-atlas1">
						<div class="row container">
							<button
								class="btn btn-atlas2 px-5 col-md-5 col-12 mx-1 mr-auto ml-auto mt-2"
								style="border-radius: 2em;"
								:disabled="!btnsEventConditions()"
							>
								<i class="fa fa-star"></i> Com interesse
							</button>
							<button
								class="btn btn-atlas2 px-5 col-md-5 col-12 mx-1 mr-auto ml-auto mt-2"
								style="border-radius: 2em;"
								:disabled="!btnsEventConditions()"
							>
								<i class="fa fa-sign-in-alt text-teca4"></i> Inscrever-me
							</button>
						</div>
					</template>
				</div>
			</div>
		</div>
		<div class="mt-5" v-if="event.picture.gallery.length">
			<TitleAtlas>Galeria</TitleAtlas>
			<!--
			<Carousel
				:margin="30"
				:nav="false"
				:responsive="carouselResponsivity"
				:autoplay="true"
				:loop="true"
			>
				<img
					v-for="(picture, index) in event.picture.gallery"
					:key="event.id + '_picture_' + index + '_' + picture"
					:src="picture"
					alt
				>
			</Carousel>
			-->
			<b-carousel id="picturesCarousel" controls :interval="4000" v-model="slide">
				<b-carousel-slide
					v-for="picture in event.picture.gallery"
					:key="event.id + '_picture_' + picture"
					:img-src="picture"
				></b-carousel-slide>
			</b-carousel>
		</div>
		<div class="mt-5">
			<TitleAtlas>
				Discussões
				<button class="btn btn-atlas2" @click="modal = true" v-if="getLoggedUserId !== -1">
					<i class="fa fa-plus" aria-hidden="true"></i>
				</button>
			</TitleAtlas>
			<template v-if="event.discussions.length">
				<EventDiscussion
					v-for="discussion in getDiscussionsSelectedPage"
					:key="discussion.id"
					:discussion="discussion"
					class="mb-1"
				/>
				<div class="mt-3" v-if="event.discussions.length > discussionsPerPage">
					<vs-pagination :total="totalPages" v-model="currentPage"/>
				</div>
			</template>
			<p v-else>Este evento ainda não possui nenhuma discussão.</p>
		</div>

		<div class="mt-5">
			<TitleAtlas>Eventos relacionados</TitleAtlas>
			<template v-if="windowWidth >= 768">
				<EventListItem
					v-for="sugestedEvent in getSugestedEvents"
					:key="'sugested_event_' + sugestedEvent.id"
					:event="sugestedEvent"
					class="mb-1"
				/>
			</template>
			<template v-else>
				<EventCard
					v-for="sugestedEvent in getSugestedEvents"
					:key="'sugested_event_' + sugestedEvent.id"
					:event="sugestedEvent"
					class="mb-1"
				/>
			</template>
		</div>

		<b-modal
			title="Adicionar discussão"
			header-bg-variant="atlas1"
			header-text-variant="white"
			:centered="true"
			v-model="modal"
			:hide-footer="true"
		>
			<FormDiscussion :eventId="this.event.id"/>
		</b-modal>
		<b-modal
			title="Editar evento"
			header-bg-variant="atlas1"
			header-text-variant="white"
			:centered="true"
			v-model="modalEdit"
			:hide-footer="true"
		>
			<FormEvent :edit="event"></FormEvent>
		</b-modal>
	</div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import Carousel from "vue-owl-carousel"
import EventDiscussion from "@/components/EventDiscussion.vue"
import FormDiscussion from "@/components/FormDiscussion.vue"
import FormEvent from "@/components/FormEvent.vue"
import EventListItem from "@/components/EventListItem.vue"
import EventCard from "@/components/EventCard.vue"

import { mapGetters } from "vuex"

export default {
	name: "EventInfoView",
	components: {
		TitleAtlas,
		Carousel,
		EventDiscussion,
		FormDiscussion,
		FormEvent,
		EventListItem,
		EventCard
	},
	created() {
		this.$store.subscribe(mutation => {
			if (mutation.type === "EDIT_EVENT_BY_ID") {
				this.modalEdit = false
			}
			if (mutation.type === "CREATE_EVENT_DISCUSSION") {
				this.modal = false
			}
		})
		window.addEventListener("resize", this.handleResize)
		this.handleResize()
	},
	data() {
		return {
			modalEdit: false,
			slide: 0,
			enrollments: [],
			modal: false,
			currentPage: 1,
			discussionsPerPage: 5,
			windowWidth: 0
		}
	},
	computed: {
		...mapGetters([
			"getEventById",
			"getTagById",
			"getUserById",
			"getEnrollmentsByEventId",
			"getLoggedUserId",
			"getCourseById",
			"getEventsByIdsTagsIdsCourses"
		]),
		event() {
			return this.getEventById(parseInt(this.$route.params.id))
		},
		totalPages() {
			return this.event.discussions.length <= this.discussionsPerPage
				? 1
				: Math.floor(
						this.event.discussions.length / this.discussionsPerPage
				  ) + 1
		},
		getDiscussionsByPopularity() {
			return this.event.discussions.sort((a, b) => {
				if (a.upvotes - a.downvotes < b.upvotes - b.downvotes) {
					return 1
				} else if (a.upvotes - a.downvotes > b.upvotes - b.downvotes) {
					return -1
				} else {
					return 0
				}
			})
		},
		getDiscussionsSelectedPage() {
			this.event.discussions.sort((a, b) => {
				if (a.upvotes - a.downvotes < b.upvotes - b.downvotes) {
					return 1
				} else if (a.upvotes - a.downvotes > b.upvotes - b.downvotes) {
					return -1
				} else {
					return 0
				}
			})

			if (this.event.discussions.length > this.discussionsPerPage) {
				return this.event.discussions.slice(
					(this.currentPage - 1) * this.discussionsPerPage,
					this.discussionsPerPage * this.currentPage
				)
			} else {
				return this.event.discussions
			}
		},
		getSugestedEvents() {
			let events = this.getEventsByIdsTagsIdsCourses(
				this.event.tags,
				this.event.coursesIds
			)

			let index = events.findIndex(event => event === this.event)
			if (index !== -1) {
				events.splice(index, 1)
			}

			events.sort((a, b) => {
				return 0.5 - Math.random()
			})

			events.length = events.length > 3 ? 3 : events.length
			return events
		}
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		},
		getEventTags() {
			let tags = []
			this.event.tags.forEach(tag => {
				tags.push("#" + this.getTagById(tag).name)
			})
			return tags
		},
		getEventCourses() {
			let courses = []
			this.event.coursesIds.forEach(course => {
				courses.push(this.getCourseById(course).name)
			})
			return courses
		},
		btnConditions() {
			if (this.getLoggedUserId !== -1) {
				if (
					this.getLoggedUserId === this.event.authorId ||
					this.getUserById(this.getLoggedUserId).profileId === 3
				) {
					return true
				}
			}
			return false
		},
		btnRemoveClicked() {
			this.$vs.dialog({
				type: "confirm",
				color: "danger",
				title: "Remover evento?",
				acceptText: "Remover",
				cancelText: "Cancelar",
				text:
					"Este evento e todos os dados a este associado serão removidos para sempre.",
				accept: () => {
					this.$store.dispatch("removeEventById", this.event.id)
					this.$snotify.success("Evento removido", "", {
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					})
					this.$router.replace({ name: "events" })
				}
			})
		},
		btnsEventConditions() {
			if (this.getLoggedUserId !== -1) {
				if (
					this.getLoggedUserId !== this.event.authorId ||
					this.getUserById(this.getLoggedUserId).profileId !== 3
				) {
					return true
				}
			}
			return false
		}
	}
}
</script>

<style>
a:hover {
	text-decoration: none;
}
</style>

