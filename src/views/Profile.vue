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
					<button
						class="btn btn-atlas2"
						@click="modalProfile = true"
						v-if="btnConditions()"
					>
						<i class="fa fa-cog" aria-hidden="true"></i>
					</button>
					<template v-if="getLoggedUserId !== -1">
						<button
							class="btn btn-danger ml-2"
							@click="btnRemoveClicked()"
							v-if="getUserById(getLoggedUserId).profileId === 3 && user._id !== getLoggedUserId"
						>
							<i class="fa fa-times" aria-hidden="true"></i>
						</button>
					</template>
				</TitleAtlas>
				<div class="row">
					<div class="ml-auto mr-auto mb-2 col-lg-3 col-md-4 col-6 text-center">
						<img :src="user.picture" class="img-fluid img-thumbnail rounded-circle">
						<button class="btn btn-atlas1 mt-2 col-12" id="profile-name">{{ getProfileName() }}</button>
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
			<div class="mt-5" v-if="user.profileId !== 3 && !(user.profileId !== 3 && !(user.interests.tags.length || user.interests.courses.length || user.interests.proponents.length))">
				<TitleAtlas>
					Interesses
					<button class="btn btn-atlas2" @click="modalInterests = true" v-if="btnConditions()">
						<i class="fa fa-edit" aria-hidden="true"></i>
					</button>
				</TitleAtlas>
				<vs-list v-if="user.interests.tags.length || user.interests.courses.length || user.interests.proponents.length">
					<vs-list-item
						icon="local_offer"
						title="Tags"
						:subtitle="'#' + user.interests.tags.map(tag => tag.name).join(' #')"
						v-if="user.interests.tags.length"
					></vs-list-item>
					<vs-list-item
						icon="school"
						title="Cursos"
						:subtitle="user.interests.courses.map(course => course.name).join(', ')"
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
				<TitleAtlas>Eventos criados - {{ getEventsByAuthorId(user._id).length }}</TitleAtlas>
				<template v-if="windowWidth >= 768">
					<EventListItem
						v-for="event in getEventsByAuthorId(user._id)"
						:key="'event_' + event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<template v-else>
					<EventCard
						v-for="event in getEventsByAuthorId(user._id)"
						:key="'event_' + event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
			</div>
			<div v-if="user.profileId !== 3 && getUserEnrollmentsByUserId(user._id).length" class="mt-5">
				<TitleAtlas>Eventos inscrito - {{ getUserEnrollmentsByUserId(user._id).length }}</TitleAtlas>
				<template v-if="windowWidth >= 768">
					<EventListItem
						v-for="event in getEventsBySelectedPage"
						:key="event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<template v-else>
					<EventCard
						v-for="event in getEventsBySelectedPage"
						:key="event._id"
						:event="event"
						class="mb-1"
					/>
				</template>
				<div class="mt-3" v-if="getUserEnrollmentsByUserId(user._id).length > eventsPerPage">
					<vs-pagination :total="totalPages" v-model="currentPage"/>
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
				case "EDIT_USER_BY_ID":
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
			user: []
		}
	},
	watch: {
		$route() {
			this.currentPage = 1
			this.loadPage()
		}
	},
	methods: {
		async loadPage() {
			this.$store.commit("RESET_STATE")
			this.loading = true
			const username = this.$route.params.username
			// loads user info
			try {
				const response = await this.$http.get(
					`/users/?username=${username}`
				)
				if (response.status === 200) {
					this.$store.commit("ADD_USER", response.data)
					this.user = response.data
				}
			} catch (err) {
				console.log("user")
				//this.$router.push({ name: "home" })
			}

			// loads user enrollments
			try {
				const response = await this.$http.get(
					`/events/enrollments/${this.user._id}`
				)
				if (response.status === 200) {
					this.$store.commit("ADD_EVENTS", response.data)
				}
			} catch(err) {
				console.log("enrolled events")
				console.log(err)
				//this.$router.push({ name: "home" })
			}
			
			// loads user created events
			if(this.user.profileId !== 1) {
				this.$store.commit("REMOVE_EVENTS_BY_AUTHOR_ID", this.user._id)
				try {
					const response = await this.$http.get(
						`/events/authors/${this.user._id}`
					)
					if (response.status === 200) {
						this.$store.commit("ADD_EVENTS", response.data)
					}
				} catch(err) {
					console.log("created events")
					//this.$router.push({ name: "home" })
				}
			}
			this.loading = false
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
			if (this.getLoggedUserId !== -1) {
				if (
					this.getUserById(this.getLoggedUserId).profileId === 3 ||
					this.getLoggedUserId === this.user._id
				) {
					return true
				}
			}
			return false
		},
		btnRemoveClicked() {
			let events = this.getEventsByAuthorId(this.user._id)
			if (events.length) {
				this.$vs.dialog({
					type: "confirm",
					color: "danger",
					title: "Impossível remover utilizador",
					acceptText: "Entendido",
					cancelText: "",
					text: `O utilizador ${
						this.user.username
					} não pode ser removido, uma vez que tem ${
						events.length
					} eventos criados.`
				})
			} else {
				this.$vs.dialog({
					type: "confirm",
					color: "danger",
					title: "Remover utilizador?",
					acceptText: "Remover",
					cancelText: "Cancelar",
					text: `O utilizador ${
						this.user.username
					} será removido para sempre.`,
					accept: () => {
						this.$store.dispatch("removeUserById", this.user._id)
						this.$snotify.success("Utilizador removido", "", {
							timeout: 2000,
							showProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true
						})
						this.$router.push({ name: "home" })
					}
				})
			}
		}
	},
	computed: {
		...mapGetters([
			"getUserByUsername",
			"getTagById",
			"getCourseById",
			"getLoggedUserId",
			"getUserById",
			"getEventsByAuthorId",
			"getUserEnrollmentsByUserId"
		]),
		totalPages() {
			return this.getUserEnrollmentsByUserId(this.user._id).length <=
				this.eventsPerPage
				? 1
				: Math.floor(
						this.getUserEnrollmentsByUserId(this.user._id).length /
							this.eventsPerPage
				  ) + 1
		},
		getEventsBySelectedPage() {
			if (
				this.getUserEnrollmentsByUserId(this.user._id).length >
				this.eventsPerPage
			) {
				return this.getUserEnrollmentsByUserId(this.user._id).slice(
					(this.currentPage - 1) * this.eventsPerPage,
					this.eventsPerPage * this.currentPage
				)
			} else {
				return this.getUserEnrollmentsByUserId(this.user._id)
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
