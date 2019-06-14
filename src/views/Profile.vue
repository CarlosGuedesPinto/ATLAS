<template>
	<div>
		<div v-if="loading" class="text-center">
			<p class="mb-5">&nbsp;</p>
			<b-spinner variant="atlas" label="A carregar..." style="width: 8rem; height: 8rem;" class="mt-5"></b-spinner>
		</div>
		<div v-else>
			<div>
				<TitleAtlas>
					Perfil
					<button class="btn btn-atlas2" @click="modalProfile = true" v-if="btnConditions()">
						<i class="fa fa-cog" aria-hidden="true"></i>
					</button>
					<template v-if="getLoggedUser.username">
						<button
							class="btn btn-danger ml-2"
							@click="btnRemoveClicked()"
							v-if="getLoggedUser.profileId === 3 && user._id !== getLoggedUser._id"
						>
							<i class="fa fa-times" aria-hidden="true"></i>
						</button>
					</template>
				</TitleAtlas>
				<div class="row">
					<div class="ml-auto mr-auto mb-2 col-lg-3 col-md-4 col-6 text-center">
						<img :src="user.picture" class="img-fluid img-thumbnail rounded-circle">
						<button
							class="btn btn-atlas1 mt-2 col-12"
							id="profile-name"
							:class="user.profileId === 1 ? 'btn-atlas3' : (user.profileId === 2 ? 'btn-atlas2' : 'btn-atlas1')"
						>{{ getProfileName() }}</button>
					</div>
					<div class="col-lg-9 col-md-8 col-12">
						<vs-list>
							<vs-list-item icon="person" title="Nome" :subtitle="user.firstName + ' ' + user.lastName"></vs-list-item>
							<vs-list-item icon="email" title="Email" :subtitle="user.email"></vs-list-item>
							<vs-list-item icon="public" title="Nome de utilizador" :subtitle="'@' + user.username"></vs-list-item>
							<vs-list-item
								icon="date_range"
								title="Registo"
								:subtitle="$moment(user.createdAt) | moment('from', 'now')"
							></vs-list-item>
						</vs-list>
					</div>
				</div>
			</div>
			<div
				class="mt-5"
				v-if="user.profileId !== 3 && !(user.profileId !== 3 && !(user.interests.tags.length || user.interests.courses.length || user.interests.proponents.length))"
			>
				<TitleAtlas>
					Interesses
					<button class="btn btn-atlas2" @click="modalInterests = true" v-if="btnConditions()">
						<i class="fa fa-edit" aria-hidden="true"></i>
					</button>
				</TitleAtlas>
				<vs-list
					v-if="user.interests.tags.length || user.interests.courses.length || user.interests.proponents.length || getLoggedUser.username"
				>
					<vs-list-item
						icon="local_offer"
						title="Tags"
						:subtitle="'#' + user.interests.tags.map(tag => tag.name).join(' #')"
						v-if="user.interests.tags.length"
					></vs-list-item>
					<vs-list-item
						icon="school"
						title="Cursos"
						:subtitle="user.interests.courses.map(course => `${course.name} (${course.abbreviation})`).join(', ')"
						v-if="user.interests.courses.length"
					></vs-list-item>
					<vs-list-item
						icon="person"
						title="Proponentes"
						:subtitle="'@' + user.interests.proponents.map(proponent => proponent.username).join(' @')"
						v-if="user.interests.proponents.length"
					></vs-list-item>
				</vs-list>
				<p v-else>Nenhum interesse selecionado.</p>
			</div>
			<div class="mt-5" v-if="user.profileId !== 1">
				<TitleAtlas>Eventos criados - {{ events.created.length }}</TitleAtlas>
				<template v-if="windowWidth >= 768">
					<EventListItem
						v-for="event in getCreatedEventsBySelectedPage"
						:key="'event_' + event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<template v-else>
					<EventCard
						v-for="event in getCreatedEventsBySelectedPage"
						:key="'event_' + event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<div class="mt-3" v-if="events.created.length > eventsPerPage">
					<vs-pagination :total="totalPagesCreated" v-model="currentPageCreated"/>
				</div>
			</div>
			<div v-if="user.profileId !== 3 && events.enrolled.length" class="mt-5">
				<TitleAtlas>Eventos inscrito - {{ events.enrolled.length }}</TitleAtlas>
				<template v-if="windowWidth >= 768">
					<EventListItem
						v-for="event in getEnrolledEventsBySelectedPage"
						:key="event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<template v-else>
					<EventCard
						v-for="event in getEnrolledEventsBySelectedPage"
						:key="event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<div class="mt-3" v-if="events.enrolled.length > eventsPerPage">
					<vs-pagination :total="totalPagesEnrolled" v-model="currentPage"/>
				</div>
			</div>

			<b-modal
				title="Editar interesses"
				header-bg-variant="atlas1"
				header-text-variant="white"
				:centered="true"
				v-model="modalInterests"
				:hide-footer="true"
				v-if="user.profileId !== 3"
			>
				<FormCreateAccount :editInterests="user"></FormCreateAccount>
			</b-modal>

			<b-modal
				title="Editar perfil"
				header-bg-variant="atlas1"
				header-text-variant="white"
				:centered="true"
				v-model="modalProfile"
				:hide-footer="true"
			>
				<FormCreateAccount :editProfile="user"></FormCreateAccount>
			</b-modal>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import TitleAtlas from "@/components/TitleAtlas.vue"
import FormCreateAccount from "@/components/FormCreateAccount.vue"
import EventListItem from "@/components/EventListItem.vue"
import EventCard from "@/components/EventCard.vue"

export default {
	components: { TitleAtlas, FormCreateAccount, EventListItem, EventCard },
	created() {
		this.$store.subscribe(mutation => {
			switch (mutation.type) {
				case "EDIT_USER":
					this.user = mutation.payload
					if (this.getLoggedUser._id === this.user._id) {
						this.$store.commit("UPDATE_LOGGED_USER", {
							_id: this.user._id,
							picture: this.user.picture,
							profileId: this.user.profileId,
							username: this.user.username
						})
					}
					this.$router.replace({
						name: "profile",
						params: { username: mutation.payload.username }
					})
					this.modalProfile = false
					break
				case "EDIT_USER_INTERESTS_BY_ID":
					this.modalInterests = false
					break
			}
		})
		window.addEventListener("resize", this.handleResize)
		this.handleResize()
		this.loadPage()
	},
	data() {
		return {
			loading: false,
			modalProfile: false,
			modalInterests: false,
			windowWidth: 0,
			eventsPerPage: 5,
			currentPage: 1,
			currentPageCreated: 1,
			user: [],
			events: {
				created: [],
				enrolled: []
			}
		}
	},
	watch: {
		$route() {
			this.currentPage = 1
			this.currentPageCreated = 1
			this.loadPage()
		}
	},
	methods: {
		async loadPage() {
			this.$store.commit("RESET_STATE")
			const username = this.$route.params.username
			// loads user info
			try {
				this.loading = true
				const response = await this.$http.get(`/users/profile/${username}`)
				if (response.status === 200) {
					this.user = response.data.content.user

					// enrolled events
					this.events.enrolled = response.data.content.events.enrolled
					// created events
					if (
						this.user.profileId !== 1 &&
						response.data.content.events.created
					) {
						this.events.created = response.data.content.events.created
					}
				}
				this.loading = false
			} catch (err) {
				console.log(err.response)
				//this.$router.push({ name: "home" })
			}
		},
		handleResize() {
			this.windowWidth = window.innerWidth
		},
		getProfileName() {
			switch (this.user.profileId) {
				case 1:
					return "Aluno"
				case 2:
					return "Proponente de evento"
				case 3:
					return "Administrador"
			}
		},
		btnConditions() {
			if (this.getLoggedUser.username) {
				if (
					this.getLoggedUser.profileId === 3 ||
					this.getLoggedUser._id === this.user._id
				) {
					return true
				}
			}
			return false
		},
		async btnRemoveClicked() {
			try {
				const response = await this.$http.get(
					`/events/authors/${this.user._id}`
				)
				this.$vs.dialog({
					type: "confirm",
					color: "danger",
					title: "Impossível remover utilizador",
					acceptText: "Entendido",
					cancelText: "",
					text: `O utilizador ${
						this.user.username
					} não pode ser removido, uma vez que tem ${
						response.data.content.events.length
					} ${
						response.data.content.events.length === 1
							? "evento criado"
							: "eventos criados"
					}: ${response.data.content.events
						.map(event => event.name)
						.join(", ")}. Deve primeiro remover ${
						response.data.content.events.length === 1
							? "o evento"
							: "os eventos"
					} em questão.`
				})
			} catch (err) {
				if (err.response.data.name === "eventNotFound") {
					this.$vs.dialog({
						type: "confirm",
						color: "danger",
						title: "Remover utilizador?",
						acceptText: "Remover",
						cancelText: "Cancelar",
						text: `O utilizador ${
							this.user.username
						} será removido para sempre, assim como todos os dados associados a este (discussões em eventos, respostas em discussões e participações em eventos).`,
						accept: async () => {
							try {
								const response = this.$http.delete()
							} catch (err) {}
							this.$snotify.success("Utilizador removido", "", {
								timeout: 2000,
								showProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true
							})
							this.$router.push({ name: "home" })
						}
					})
				} else {
					this.$router.push({ name: "home" })
				}
			}
		}
	},
	computed: {
		...mapGetters(["getLoggedUser"]),
		totalPagesCreated() {
			return Math.ceil(this.events.created.length / this.eventsPerPage)
		},
		getCreatedEventsBySelectedPage() {
			if (this.events.created.length > this.eventsPerPage) {
				return this.events.created.slice(
					(this.currentPageCreated - 1) * this.eventsPerPage,
					(this.currentPageCreated - 1) * this.eventsPerPage +
						this.eventsPerPage
				)
			} else {
				return this.events.created
			}
		},
		totalPagesEnrolled() {
			return Math.ceil(this.events.enrolled.length / this.eventsPerPage)
		},
		getEnrolledEventsBySelectedPage() {
			if (this.events.enrolled.length > this.eventsPerPage) {
				return this.events.enrolled.slice(
					(this.currentPage - 1) * this.eventsPerPage,
					(this.currentPage - 1) * this.eventsPerPage + this.eventsPerPage
				)
			} else {
				return this.events.enrolled
			}
		}
	}
}
</script>

<style>
#profile-name {
	cursor: default;
}
.vs-list--subtitle {
	font-size: 1em !important;
}
</style>
