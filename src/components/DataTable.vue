<template>
	<div class="container-fluid">
		<!-- User Interface controls -->
		<div class="row">
			<template v-if="items.length > 5">
				<div class="col-md-6 my-1">
					<b-form-group horizontal label="Filtrar" class="mb-0">
						<b-input-group>
							<b-form-input v-model="filter" placeholder="Escreva para filtrar..."/>
						</b-input-group>
					</b-form-group>
				</div>

				<div class="col-md-6 my-1 mb-3">
					<b-form-group horizontal label="Por página" class="mb-0">
						<b-form-select :options="pageOptions" v-model="perPage"/>
					</b-form-group>
				</div>
			</template>
			<template v-else>
				<div class="col-12 my-1">
					<b-form-group horizontal label="Filtrar" class="mb-0">
						<b-input-group>
							<b-form-input v-model="filter" placeholder="Escreva para filtrar..."/>
						</b-input-group>
					</b-form-group>
				</div>
			</template>
		</div>

		<!-- Main table element -->
		<b-table
			:items="items"
			:fields="fields"
			:current-page="currentPage"
			:per-page="perPage"
			:filter="filter"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:sort-direction="sortDirection"
			@filtered="onFiltered"
			outlined
			hover
			responsive
			empty-filtered-text="Não há resultados para a sua pesquisa"
			@row-clicked="rowClicked($event)"
		>
			<template slot="name" slot-scope="row">
				<template v-if="name === 'users'">{{ row.item.firstName + " " + row.item.lastName }}</template>
				<template v-if="name === 'events'">{{ row.item.name }}</template>
				<template v-if="name === 'tags'">{{ row.item.name }}</template>
			</template>

			<template slot="username" slot-scope="row" v-if="name === 'users'">{{ "@" + row.item.username }}</template>
			<template slot="courseName" slot-scope="row" v-if="name === 'courses'">{{row.item.name }}</template>

			<template
				slot="courseAbbreviation"
				slot-scope="row"
				v-if="name === 'courses'"
			>{{row.item.abbreviation }}</template>

			<template
				slot="author"
				slot-scope="row"
				v-if="name === 'events' && getLoggedUser.profileId === 3"
			>
				<router-link
					style="text-decoration: none"
					class="text-atlas2"
					:to="{ name: 'profile', params: {username: row.item.author.username} }"
				>@{{row.item.author.username}}</router-link>
			</template>

			<template slot="qr" slot-scope="row" v-if="name === 'events'">
				<img :src="row.item.qr" width="40">
			</template>

			<template slot="actions" slot-scope="row" v-if="name === 'courses' || name === 'tags'">
				<button class="btn btn-danger float-right" @click.prevent="btnRemoveClicked(row.item)">
					<i class="fa fa-times" aria-hidden="true"></i>
				</button>
				<button
					class="btn btn-warning text-white mx-2 float-right"
					@click.prevent="btnEditClicked(row.item)"
				>
					<i class="fa fa-edit" aria-hidden="true"></i>
				</button>
			</template>
		</b-table>
		<div class="row" v-show="items.length > perPage">
			<div class="my-1 mr-auto ml-auto">
				<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0"/>
			</div>
		</div>
		<vs-prompt :vs-title="name === 'courses' ? 'Editar curso' : 'Editar tag'" :vs-active.sync="activePrompt" :vs-buttons-hidden="true">
			<FormCourse :edit="edit" v-if="name === 'courses'"></FormCourse>
			<FormTag :edit="edit" v-if="name === 'tags'"></FormTag>
		</vs-prompt>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import FormCourse from "@/components/FormCourse.vue"
import FormTag from "@/components/FormTag.vue"
import { setInterval } from 'timers';

export default {
	components: { FormCourse, FormTag },
	props: ["name", "items", "fields"],
	data() {
		return {
			currentPage: 1,
			perPage: 20,
			totalRows: this.items.length,
			pageOptions: [20, 35, 50],
			sortBy: null,
			sortDesc: false,
			sortDirection: "asc",
			filter: null,
			activePrompt: false,
			edit: {}
		}
	},
	created() {
		this.$store.subscribe(mutation => {
			if (mutation.type === "EDIT_COURSE") {
				this.activePrompt = false
			}
			if(mutation.type === "EDITED_TAG") {
				this.activePrompt = false
			}
		})
	},
	computed: {
		...mapGetters(["getLoggedUser"]),
		sortOptions() {
			return this.fields
				.filter(f => f.sortable)
				.map(f => {
					return { text: f.label, value: f.key }
				})
		}
	},
	methods: {
		getNameUserType(profileId) {
			switch (profileId) {
				case 1:
					return "Aluno"
				case 2:
					return "Propon. evento."
				case 3:
					return "Administrador"
			}
		},
		onFiltered(filteredItems) {
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
		rowClicked(event) {
			switch (this.name) {
				case "users":
					this.$router.push({
						name: "profile",
						params: { username: event.username }
					})
					break
				case "tags":
					this.$router.push({
						name: "events",
						query: { tags: event.name }
					})
					break
				case "courses":
					this.$router.push({
						name: "events",
						query: { curso: event.abbreviation }
					})
					break
				case "events":
					this.$router.push({
						name: "eventsInfo",
						params: { id: event._id }
					})
					break
				default:
					break
			}
		},
		btnEditClicked(obj) {
			if (this.name === "courses" || this.name === "tags") {
				this.edit = obj
				this.activePrompt = true
			}
		},
		btnRemoveClicked(obj) {
			switch (this.name) {
				case "courses":
					this.$vs.dialog({
						type: "confirm",
						color: "danger",
						title: "Remover curso?",
						acceptText: "Remover",
						cancelText: "Cancelar",
						text: `O curso ${this.obj.name} será removido para sempre.`,
						accept: async () => {
							this.removeCourseById(id)
							this.$snotify.success("Curso removido", "", {
								timeout: 2000,
								showProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true
							})
						}
					})
					break
				case "tags":
					this.$vs.dialog({
						type: "confirm",
						color: "danger",
						title: "Remover tag?",
						acceptText: "Remover",
						cancelText: "Cancelar",
						text: `A tag ${obj.name} será removida para sempre.`,
						accept: async () => {
							try {
								const response = this.$http.delete(`/tags/${obj._id}`)
								this.$store.commit("REMOVED_TAG", obj)
								this.$snotify.success("Tag removida", "", {
									timeout: 2000,
									showProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true
								})
							} catch (err) {
								if (!err.response.success) {
									this.$snotify.error(err.response.message.pt, "", {
										timeout: 2000,
										showProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true
									})
								} else {
									this.$snotify.error("Erro ao remover tag", "", {
										timeout: 2000,
										showProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true
									})
								}
							}
						}
					})
					break
			}
		}
	}
}
</script>