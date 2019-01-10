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
			<template
				slot="userType"
				slot-scope="row"
				v-if="name === 'users'"
			>{{ getNameUserType(row.item.profileId) }}</template>

			<template slot="actions" slot-scope="row" v-if="name === 'courses' || name === 'tags'">
				<button class="btn btn-danger float-right" @click="btnRemoveClicked(parseInt(row.item.id))">
					<i class="fa fa-times" aria-hidden="true"></i>
				</button>
				<button class="btn btn-warning text-white mx-2 float-right" @click="btnEditClicked(parseInt(row.item.id))">
					<i class="fa fa-edit" aria-hidden="true"></i>
				</button>
			</template>
		</b-table>
		<div class="row" v-show="items.length > perPage">
			<div class="my-1 mr-auto ml-auto">
				<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0"/>
			</div>
		</div>
		<vs-prompt vs-title="Editar curso" :vs-active.sync="activePrompt" :vs-buttons-hidden="true">
			<FormCourse :editId="editId" v-if="name === 'courses'"></FormCourse>
			<FormTag :editId="editId" v-if="name === 'tags'"></FormTag>
		</vs-prompt>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import FormCourse from "@/components/FormCourse.vue"
import FormTag from "@/components/FormTag.vue"

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
			editId: 0
		}
	},
	created() {
		this.$store.subscribe(mutation => {
			if (mutation.type === "EDIT_COURSE" || mutation.type === "EDIT_TAG")
				this.activePrompt = false
		})
	},
	computed: {
		...mapGetters(["getCourseById", "getTagById"]),
		sortOptions() {
			return this.fields
				.filter(f => f.sortable)
				.map(f => {
					return { text: f.label, value: f.key }
				})
		}
	},
	methods: {
		...mapActions(["removeCourseById", "removeTagById"]),
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
						name: "backofficeUserInfo",
						params: { username: event.username }
					})
					break
				default:
					break
			}
		},
		btnEditClicked(id) {
			if (this.name === "courses" || this.name === "tags") {
				this.editId = id
				this.activePrompt = true
			}
		},
		btnRemoveClicked(id) {
			switch (this.name) {
				case "courses":
					this.$vs.dialog({
						type: "confirm",
						color: "danger",
						title: "Remover curso?",
						acceptText: "Remover",
						cancelText: "Cancelar",
						text: `O curso ${
							this.getCourseById(id).name
						} será removido para sempre.`,
						accept: () => {
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
						text: `A tag ${
							this.getTagById(id).name
						} será removida para sempre.`,
						accept: () => {
							this.removeTagById(id)
							this.$snotify.success("Tag removida", "", {
								timeout: 2000,
								showProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true
							})
						}
					})
					break
			}
		}
	}
}
</script>
