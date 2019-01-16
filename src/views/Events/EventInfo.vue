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
							{{ getCourseById(event.courseId).name }}
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
				<button
					class="btn btn-atlas2"
					@click="modal.active = true"
					v-if="getLoggedUserId !== -1"
				>
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
		<vs-popup
			title="Criar uma nova discussão"
			:active.sync="modal.active"
			@close="resetFormCreateDiscussion()"
		>
			<form @submit.prevent="createDiscussion()">
				<b-form-group
					label="Título"
					label-for="name"
					:state="titleState"
					:invalid-feedback="titleInvalidFeedback"
				>
					<b-form-input id="name" v-model="modal.title" type="text" maxlength="50" :state="titleState"></b-form-input>
				</b-form-group>
				<b-form-group label="Categoria">
					<b-form-radio-group
						buttons
						button-variant="outline-atlas2"
						v-model="modal.selectedCategory"
						:options="modal.categories"
						name="categories"
					/>
				</b-form-group>
				<b-form-group
					label="Texto"
					label-for="text"
					:state="textState"
					:invalid-feedback="textInvalidFeedback"
				>
					<b-form-textarea id="text" v-model="modal.text" :rows="3" :max-rows="6" :state="textState"></b-form-textarea>
				</b-form-group>
				<button type="submit" class="btn btn-atlas1 col-12">Criar discussão</button>
			</form>
		</vs-popup>
	</div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import Carousel from "vue-owl-carousel"
import EventDiscussion from "@/components/EventDiscussion.vue"

import { mapGetters } from "vuex"

export default {
	name: "EventInfoView",
	components: { TitleAtlas, Carousel, EventDiscussion },
	created() {
		this.event = this.getEventById(parseInt(this.$route.params.id))
		this.enrollments = this.getEnrollmentsByEventId(this.event.id)

		this.totalPages =
			this.event.discussions.length <= this.discussionsPerPage
				? 1
				: Math.floor(
						this.event.discussions.length / this.discussionsPerPage
				  ) + 1
	},
	data() {
		return {
			event: {},
			carouselResponsivity: {
				0: { items: 1 },
				768: { items: 2 }
			},
			enrollments: [],
			modal: {
				active: false,
				title: "",
				categories: ["Dúvida", "Sugestão"],
				selectedCategory: "Dúvida",
				text: "",
				attemptSubmit: false
			},
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
			"getLastDiscussionIdByEvent",
			"getLastDiscussionIdByEventId",
			"getLoggedUserId",
			"getCourseById"
		]),

		titleState() {
			if (!this.modal.title && !this.modal.attemptSubmit) {
				return null
			} else if (!this.modal.title && this.modal.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		titleInvalidFeedback() {
			if (!this.modal.title && this.modal.attemptSubmit) {
				return "Introduza o título"
			} else {
				return null
			}
		},
		textState() {
			if (!this.modal.text && !this.modal.attemptSubmit) {
				return null
			} else if (!this.modal.text && this.modal.attemptSubmit) {
				return false
			} else {
				return true
			}
		},
		textInvalidFeedback() {
			if (!this.modal.text && this.modal.attemptSubmit) {
				return "Introduza o texto"
			} else {
				return null
			}
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
		}
	},
	methods: {
		createDiscussion() {
			this.modal.attemptSubmit = true
			if (this.titleState && this.textState) {
				this.$store.dispatch("createEventDiscussion", {
					eventId: this.event.id,
					discussion: {
						id:
							this.getLastDiscussionIdByEventId(this.event.id) +
							1,
						authorId: this.getLoggedUserId,
						category: this.modal.selectedCategory,
						title: this.modal.title,
						upvotes: 0,
						downvotes: 0,
						date: this.$moment().format("YYYY-MM-DD"),
						hour: this.$moment().format("HH:MM"),
						usersVoted: []
					}
				})

				this.$snotify.success("Discussão criada", "", {
					timeout: 2000,
					showProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true
				})

				this.resetFormCreateDiscussion()

				this.totalPages =
					this.event.discussions.length <= this.discussionsPerPage
						? 1
						: Math.floor(
								this.event.discussions.length /
									this.discussionsPerPage
						  ) + 1
			} else {
				this.$snotify.error(
					"Preencha todos os campos corretamente",
					"",
					{
						timeout: 2000,
						showProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true
					}
				)
			}
		},
		resetFormCreateDiscussion() {
			this.modal.title = ""
			this.modal.selectedCategory = "Dúvida"
			this.modal.text = ""
			this.modal.attemptSubmit = false
			this.modal.active = false
		}
	}
}
</script>
