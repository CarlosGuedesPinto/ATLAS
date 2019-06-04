<template>
	<div>
		<div v-if="loading" class="text-center">
			<p class="mb-5">&nbsp;</p>
			<b-spinner variant="atlas" label="A carregar..." style="width: 8rem; height: 8rem;" class="mt-5"></b-spinner>
		</div>
		<div v-else>
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
						<img
							:src="`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=http://localhost:8080/evento/${event.id}?inscrever=sim`"
							alt
							style="position: absolute; top: 5px;"
							:style="windowWidth >= 1200 ? 'right: 310px;' : (windowWidth >= 992 ? 'right: 250px;' : (windowWidth >= 768 ? 'right: 230px;' : 'right: 200px;'))"
						>
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
									:to="{name: 'profile', params: { username: event.author.username }}"
									class="text-atlas2"
								>
									<i class="fa fa-microphone-alt text-atlas1" aria-hidden="true"></i>
									@{{ event.author.username }}
								</router-link>
							</div>
							<div>
								<i class="fa fa-users text-atlas1 mr-1" aria-hidden="true"></i>
								<template
									v-if="!event.enrollments.length"
								>{{ event.enrollments.length }} {{ $moment(event.dateEnd + ' ' + event.hourEnd).isBefore($moment()) ? 'foram' : (event.enrollments.length === 1 ? 'vai' : 'vão')}}</template>
								<a
									href
									class="text-atlas2"
									@click.prevent="modalEnrollments = true"
									v-else
								>{{ event.enrollments.length }} {{ $moment(event.dateEnd + ' ' + event.hourEnd).isBefore($moment()) ? 'foram' : (event.enrollments.length === 1 ? 'vai' : 'vão')}}</a>
							</div>
							<div>
								<i class="fa fa-tags text-atlas1" aria-hidden="true"></i>
								<router-link
									v-for="tag in event.tags"
									:key="'tag_' + tag._id"
									:to="{name: 'events', query: { tags: tag.name } }"
									class="text-atlas2"
								> #{{ tag.name }}</router-link>
							</div>
							<div>
								<i class="fa fa-graduation-cap text-atlas1 mr-1" aria-hidden="true"></i>
								<span v-for="(course, index) in event.courses" :key="'course_' + course._id">
									<router-link
										:to="{name: 'events', query: { curso: course.abbreviation } }"
										class="text-atlas2"
									>{{ course.name }}</router-link>
									<span v-if="index < event.courses.length - 1">&nbsp;/&nbsp;</span>
								</span>
							</div>
							<div v-if="event.paid">
								<i class="fa fa-sign-in-alt text-atlas1" aria-hidden="true"></i>
								Preço de inscrição {{ event.paymentPrice }} €
							</div>
						</div>
						<template v-if="$moment(event.dateEnd).isSameOrAfter($moment().format('YYYY-MM-DD'))">
							<hr class="bg-atlas1">
							<button
								class="btn btn-atlas2 px-5 col-12 mr-auto ml-auto mt-2"
								style="border-radius: 2em;"
								@click="btnEnrollmentClicked()"
							>
								<i
									class="fa text-teca4"
									:class="!event.enrollments.some(enrollment => enrollment.user._id === getLoggedUser._id) ? 'fa-sign-in-alt' : 'fa-sign-out-alt'"
								></i>
								{{ !event.enrollments.some(enrollment => enrollment.user._id === getLoggedUser._id) ? 'Inscrever-me' : 'Desinscrever-me' }}
							</button>
						</template>
					</div>
				</div>
			</div>
			<div class="mt-5" v-if="event.picture.gallery.length">
				<TitleAtlas>Galeria</TitleAtlas>
				<b-carousel id="picturesCarousel" controls :interval="4000" v-model="slide">
					<b-carousel-slide
						v-for="picture in event.picture.gallery"
						:key="event._id + '_picture_' + picture"
						:img-src="picture"
					></b-carousel-slide>
				</b-carousel>
			</div>
			<div class="mt-5">
				<TitleAtlas>
					Discussões
					<button class="btn btn-atlas2" @click="btnCreateDiscussionClicked()">
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
						v-for="relatedEvent in related"
						:key="'relatedEvent_' + relatedEvent._id"
						:event="relatedEvent"
						class="mb-1"
					/>
				</template>
				<template v-else>
					<EventCard
						v-for="relatedEvent in related"
						:key="'relatedEvent_' + relatedEvent._id"
						:event="relatedEvent"
						class="mb-1"
					/>
				</template>
			</div>
			<b-modal
				:title="`Utilizadores inscritos - ${event.enrollments.length}`"
				header-bg-variant="atlas1"
				header-text-variant="white"
				:centered="true"
				v-model="modalEnrollments"
				:hide-footer="true"
				@hidden="enrollmentsFilter = ''"
			>
				<b-form-input
					id="enrollmentsFilter"
					v-model="enrollmentsFilter"
					placeholder="Filtrar por utilizador..."
					type="text"
				></b-form-input>
				<hr>
				<div
					v-for="(enrollment, index) in getFilteredEnrollments"
					:key="'enrollment_' + enrollment.user._id"
				>
					<div class="text-center">
						<router-link
							class="text-atlas2 ml-2"
							:to="{name: 'profile', params: { username: enrollment.user.username } }"
						>
							<img
								:src="enrollment.user.picture"
								alt
								class="rounded-circle img-thumbnail img-fluid"
								style="height: 100px; width: 100px;"
							>
						</router-link>
						<br v-if="windowWidth < 520">
						<router-link
							class="text-atlas2 ml-2"
							:to="{name: 'profile', params: { username: enrollment.user.username } }"
						>@{{ enrollment.user.username }}</router-link>
						/ {{ $moment(enrollment.createdAt).format("LLL") }}
					</div>

					<template v-if="btnConditions()" class="text-center">
						<div class="row mt-2">
							<button
								class="btn btn-atlas2 col-12 col-sm-6 ml-auto"
								v-if="event.paid"
								@click="!enrollment.paid ? enrollment.paid = true : enrollment.paid = false"
							>
								<i class="fa" :class="!enrollment.paid ? 'fa-check' : 'fa-times'" aria-hidden="true"></i>
								{{ !enrollment.paid ? 'Validar pagamento' : 'Remover pagamento' }}
							</button>
							<button
								class="btn btn-danger"
								:class="event.paid ? 'col-12 col-sm-6 mr-auto' : 'col-6 ml-auto mr-3'"
								@click="btnRemoveEnrollmentClicked(enrollment.userId)"
								:disabled="enrollment.paid"
							>
								<i class="fa fa-trash" aria-hidden="true"></i> Remover inscrição
							</button>
						</div>
					</template>
					<hr v-if="index !== event.enrollments.length - 1">
				</div>
			</b-modal>
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

import { mapGetters, mapActions } from "vuex"

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
	watch: {
		$route() {
			this.loadPage()
		}
	},
	beforeRouteUpdate(to, from, next) {
		if (to.name === "eventsInfo" && to.query.inscrever === "sim") {
			this.enroll()
		}
		next()
	},
	created() {
		this.loadPage()
		if (
			this.$route.name === "eventsInfo" &&
			this.$route.query.inscrever === "sim"
		) {
			if (
				this.$moment(
					this.event.dateEnd + " " + this.event.hourEnd
				).isSameOrAfter(this.$moment().format("YYYY-MM-DD HH:mm"))
			) {
				if (
					this.event.enrollments.some(
						enrollment => enrollment.userId === this.getLoggedUserId
					)
				) {
					this.$vs.dialog({
						type: "confirm",
						color: "primary",
						title: "Já se encontra inscrito",
						acceptText: "Entendido",
						cancelText: "",
						text: `Já efetuou inscrição no evento ${this.event.name}.`
					})
				} else {
					this.enroll()
				}
			} else {
				this.$vs.dialog({
					type: "confirm",
					color: "danger",
					title: "Inscrições fechadas",
					acceptText: "Entendido",
					cancelText: "",
					text: "Este evento já ocorreu, portanto tem as inscrições fechadas."
				})
			}
		}
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
			event: [],
			related: [],
			modalEdit: false,
			slide: 0,
			modalEnrollments: false,
			enrollmentsFilter: "",
			modal: false,
			currentPage: 1,
			discussionsPerPage: 5,
			windowWidth: 0,
			loading: false
		}
	},
	computed: {
		...mapGetters(["getEventById", "getLoggedUser"]),
		totalPages() {
			return this.event.discussions.length <= this.discussionsPerPage
				? 1
				: Math.floor(this.event.discussions.length / this.discussionsPerPage) +
						1
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
		getFilteredEnrollments() {
			if (!this.enrollmentsFilter) return this.event.enrollments

			return this.event.enrollments.filter(enrollment =>
				enrollment.user.username
					.toLowerCase()
					.includes(this.enrollmentsFilter.toLowerCase())
			)
		}
	},
	methods: {
		async loadPage() {
			const id = this.$route.params.id
			this.loading = true
			try {
				const response = await this.$http.get(`/events/ids/${id}/related`)
				if (response.status === 200) {
					this.$store.commit("ADD_EVENTS", [response.data.event])
					this.$store.commit("ADD_EVENTS", response.data.related)
					this.event = response.data.event
					this.related = response.data.related
					this.loading = false
				}
			} catch (err) {
				console.log(err)
				//this.$router.push({ name: "home" })
			}
		},
		handleResize() {
			this.windowWidth = window.innerWidth
		},
		btnCreateDiscussionClicked() {
			if (this.getLoggedUser.username) {
				this.modal = true
			} else {
        this.$store.commit("REDIRECT_AFTER_LOGIN", this.$route.path)
				this.$router.push({ name: "login" })
			}
		},
		btnConditions() {
			if (this.getLoggedUser.username) {
				if (
					this.getLoggedUser._id === this.event.author._id ||
					this.getLoggedUser.profileId === 3
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
		btnEnrollmentClicked() {
			if (!this.getLoggedUser.username) {
        this.$store.commit("REDIRECT_AFTER_LOGIN", this.$route.path)
				this.$router.push({ name: "login" })
			} else {
				if (this.getLoggedUser.profileId === 3) {
					this.$vs.dialog({
						type: "confirm",
						color: "danger",
						title: "Erro",
						acceptText: "Entendido",
						cancelText: "",
						text: "Administradores não se podem inscrever em eventos."
					})
				} else {
					if (
						!this.event.enrollments.some(
							enrollment => enrollment.user._id === this.getLoggedUser._id
						)
					) {
						this.$store.dispatch("addEventEnrollmentByEventId", {
							eventId: this.event.id,
							enrollment: {
								userId: this.getLoggedUserId,
								moment: this.$moment(),
								paid: false
							}
						})

						this.assignMedals()
						this.historyUpdate("ADD")
						//Verify if it is the first time that he applies to an event

						if (this.event.paid) {
							this.$vs.dialog({
								type: "confirm",
								color: "primary",
								title: "Efetuar pagamento",
								acceptText: "Entendido",
								cancelText: "",
								text: `Dirija-se junto ao proponente de evento para efetuar o pagamento da inscrição (${
									this.event.paymentPrice
								} €).`,
								accept: () => {
									this.$snotify.success("Inscrição efetuada", "", {
										timeout: 2000,
										showProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true
									})
								},
								cancel: () => {
									this.$snotify.success("Inscrição efetuada", "", {
										timeout: 2000,
										showProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true
									})
								}
							})
						} else {
							this.$vs.dialog({
								type: "confirm",
								color: "primary",
								title: "Inscrição efetuada",
								acceptText: "Entendido",
								cancelText: "",
								text: `A sua inscrição no evento ${
									this.event.name
								} foi efetuada com sucesso.`
							})
						}
					} else {
						this.$store.dispatch("removeEventEnrollmentByEventIdUserId", {
							eventId: this.event.id,
							userId: this.getLoggedUserId
						})
						this.historyUpdate("REMOVE")
						this.$vs.dialog({
							type: "confirm",
							color: "primary",
							title: "Inscrição removida",
							acceptText: "Entendido",
							cancelText: "",
							text: `A sua inscrição no evento ${
								this.event.name
							} foi removida com sucesso.`
						})
					}
				}
			}
		},

		assignMedals() {
			//console.log(this.getUserById(this.getLoggedUserId).leveling.medals)

			this.$store.dispatch("assignMedals", {
				userId: this.getLoggedUserId,
				type: "EVENT"
			})

			let afterMedals = this.getUserById(this.getLoggedUserId).medals

			let newMedals = afterMedals.splice(afterMedals.length, 1)

			console.log(newMedals)

			//Fazer aviso de que ganhou uma nova medalha

			/*
      if (this.getUserById(this.getLoggedUserId).history.events.length === 0) {
        this.$store.dispatch("insertNewMedalUser", {
          userId: this.getLoggedUserId,
          medalId: 1
        });
      }

      if (this.getUserById(this.getLoggedUserId).history.events.length === 9) {
        this.$store.dispatch("insertNewMedalUser", {
          userId: this.getLoggedUserId,
          medalId: 2
        });
      }*/
		},
		historyUpdate(type) {
			if (type === "ADD") {
				this.$store.dispatch("historyUpdate", {
					type: "ADD",
					userId: this.getLoggedUserId,
					eventId: this.event.id
				})
			}
			if (type === "REMOVE") {
				this.$store.dispatch("historyUpdate", {
					type: "REMOVE",
					userId: this.getLoggedUserId,
					eventId: this.event.id
				})
			}

			//reduzir codigo aqui
		},
		btnValidatePaymentClicked(userId) {},
		btnRemoveEnrollmentClicked(userId) {
			this.$store.dispatch("removeEventEnrollmentByEventIdUserId", {
				eventId: this.event.id,
				userId: userId
			})
			this.$snotify.success("Inscrição removida", "", {
				timeout: 2000,
				showProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true
			})
		}
	}
}
</script>

<style>
a:hover {
	text-decoration: none;
}
</style>

