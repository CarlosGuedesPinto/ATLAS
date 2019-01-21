<template>
	<div>
		<div>
			<TitleAtlas>{{ event.name }}</TitleAtlas>
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
							{{ event.classroom }}
						</div>
						<div>
							<i class="fa fa-calendar-alt text-atlas1" aria-hidden="true"></i>
							{{ $moment(event.dateStart).format("LL") }}
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
							<template v-for="tag in event.tags">&nbsp;#{{ getTagById(tag).name }}</template>
						</div>
						<div>
							<i class="fa fa-graduation-cap text-atlas1" aria-hidden="true"></i>
							<template v-for="courseId in event.coursesIds">{{ getCourseById(courseId).name}}</template>
						</div>
					</div>
					<hr class="bg-atlas1">
					<div class="row container">
						<button
							class="btn btn-atlas2 px-5 col-md-5 col-12 mx-1 mr-auto ml-auto mt-2"
							style="border-radius: 2em;"
						>
							<i class="fa fa-star"></i> Com interesse
						</button>
						<button
							class="btn btn-atlas2 px-5 col-md-5 col-12 mx-1 mr-auto ml-auto mt-2"
							style="border-radius: 2em;"
						>
							<i class="fa fa-sign-in-alt text-teca4"></i> Inscrever-me
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-5" v-if="event.picture.gallery">
			<TitleAtlas>Galeria</TitleAtlas>
			<Carousel
				:margin="30"
				:nav="false"
				:responsive="carouselResponsivity"
				:autoplay="true"
				:loop="true"
			>
				<img
					v-for="(picture, index) in event.picture.gallery"
					:key="event.id + '_picture_' + index"
					:src="picture"
					alt
				>
			</Carousel>
		</div>
		<!--
		<div class="mt-5" v-if="enrollments">
			<TitleAtlas>Inscrições - {{ enrollments.length }}</TitleAtlas>
			<Carousel :margin="30" :nav="false" :center="true" :autoplay="true">
				<template v-for="enrollment in enrollments">
					<img :src="getUserById(enrollment.userId).picture" alt="" class="rounded-circle" :key="enrollment.id">
					<p :key="enrollment.id + 'name'">{{ getUserById(enrollment.userId).username }}</p>
				</template>
			</Carousel>
		</div>
		-->
		<div class="mt-5">
			<TitleAtlas>
				Discussão
				<button class="btn btn-atlas2" @click="modal = true" v-if="getLoggedUserId !== -1">
					<i class="fa fa-plus" aria-hidden="true"></i>
				</button>
			</TitleAtlas>
			<EventDiscussion
				v-for="discussion in getDiscussionsSelectedPage"
				:key="discussion.id"
				:discussion="discussion"
				class="mb-1"
			/>
			<div class="mt-3" v-if="event.discussions.length > discussionsPerPage">
				<vs-pagination :total="totalPages" v-model="currentPage"/>
			</div>
		</div>
		<b-modal title="Editar discussão" header-bg-variant="atlas1" header-text-variant="white" :centered="true" v-model="modal" :hide-footer="true">
			<FormDiscussion :eventId="this.event.id"/>
		</b-modal>
		<div class="mt-5">
			<TitleAtlas>Comentários</TitleAtlas>
		</div>
	</div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import Carousel from "vue-owl-carousel"
import EventDiscussion from "@/components/EventDiscussion.vue"
import FormDiscussion from "@/components/FormDiscussion.vue"

import { mapGetters } from "vuex"

export default {
	name: "EventInfoView",
	components: { TitleAtlas, Carousel, EventDiscussion, FormDiscussion },
	created() {
		this.event = this.getEventById(parseInt(this.$route.params.id))
		this.enrollments = this.getEnrollmentsByEventId(this.event.id)
		this.totalPages =
			this.event.discussions.length <= this.discussionsPerPage
				? 1
				: Math.floor(
						this.event.discussions.length / this.discussionsPerPage
				  ) + 1

		this.$store.subscribe(mutation => {
			if (mutation.type === "CREATE_EVENT_DISCUSSION") {
				this.totalPages =
					this.event.discussions.length <= this.discussionsPerPage
						? 1
						: Math.floor(
								this.event.discussions.length /
									this.discussionsPerPage
						  ) + 1
				this.modal = false
			}
		})
	},
	data() {
		return {
			event: {},
			carouselResponsivity: {
				0: { items: 1 },
				768: { items: 2 }
			},
			enrollments: [],
			modal: false,
			totalPages: 1,
			currentPage: 1,
			discussionsPerPage: 5
		}
	},
	computed: {
		...mapGetters([
			"getEventById",
			"getTagById",
			"getUserById",
			"getEnrollmentsByEventId",
			"getLoggedUserId",
			"getCourseById"
		]),

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
		}
	}
}
</script>

<style>
a:hover {
	text-decoration: none;
}
</style>

