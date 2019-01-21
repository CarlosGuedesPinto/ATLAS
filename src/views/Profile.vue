<template>
	<div>
		<div>
			<TitleAtlas>
				Perfil - {{ user.name }}
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
						v-if="getUserById(getLoggedUserId).profileId === 3 && user.id !== getLoggedUserId"
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
						<vs-list-item icon="person" title="Nome" :subtitle="user.name"></vs-list-item>
						<vs-list-item icon="email" title="Email" :subtitle="user.email"></vs-list-item>
						<vs-list-item icon="public" title="Nome de utilizador" :subtitle="'@' + user.username"></vs-list-item>
						<vs-list-item
							icon="date_range"
							title="Registo"
							:subtitle="$moment(user.accountCreation.date + 'T' + user.accountCreation.hour) | moment('from', 'now')"
						></vs-list-item>
					</vs-list>
				</div>
			</div>
		</div>
		<div class="mt-5">
			<TitleAtlas>
				Interesses
				<button class="btn btn-atlas2" @click="modalInterests = true" v-if="btnConditions()">
					<i class="fa fa-edit" aria-hidden="true"></i>
				</button>
			</TitleAtlas>
			<vs-list v-if="interestedTags().length || interestedCourses().length">
				<vs-list-item
					icon="local_offer"
					:title="interestedTags().length > 1 ? 'Tags' : 'Tag'"
					:subtitle="interestedTags().join(' ')"
					v-if="interestedTags().length"
				></vs-list-item>
				<vs-list-item
					icon="school"
					:title="interestedCourses().length > 1 ? 'Cursos' : 'Curso'"
					:subtitle="interestedCourses().join(',')"
					v-if="interestedCourses().length"
				></vs-list-item>
			</vs-list>
			<p
				v-else
			>Recomendamos selecionar tags e cursos de interesse, para que possamos mostrar-lhe os eventos de seu gosto.</p>
		</div>
		<div class="mt-5">
			<TitleAtlas>Eventos inscrito</TitleAtlas>
		</div>


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
		<b-modal
			title="Editar interesses"
			header-bg-variant="atlas1"
			header-text-variant="white"
			:centered="true"
			v-model="modalInterests"
			:hide-footer="true"
		>
			<FormCreateAccount :editInterests="user"></FormCreateAccount>
		</b-modal>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import TitleAtlas from "@/components/TitleAtlas.vue"
import FormCreateAccount from "@/components/FormCreateAccount.vue"

export default {
	components: { TitleAtlas, FormCreateAccount },
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
	},
	data() {
		return {
			modalProfile: false,
			modalInterests: false
		}
	},
	methods: {
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
		interestedTags() {
			let tagNames = []
			this.user.interests.tags.forEach(tag =>
				tagNames.push("#" + this.getTagById(tag).name)
			)
			return tagNames
		},
		interestedCourses() {
			let coursesNames = []
			this.user.interests.courses.forEach(course =>
				coursesNames.push(this.getCourseById(course).name)
			)
			return coursesNames
		},
		btnConditions() {
			if (this.getLoggedUserId !== -1) {
				if (
					this.getUserById(this.getLoggedUserId).profileId === 3 ||
					this.getLoggedUserId === this.user.id
				) {
					return true
				}
			}
			return false
		},
		btnRemoveClicked() {
			let events = this.getEventsByAuthorId(this.user.id)
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
						this.$store.dispatch("removeUserById", this.user.id)
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
			"getEventsByAuthorId"
		]),
		user() {
			return this.getUserByUsername(this.$route.params.username)
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
