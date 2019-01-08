<template>
	<div class="container-fluid">
		<!-- User Interface controls -->
		<div class="row">
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
			@row-clicked="$router.push({name: 'backofficeUserInfo', params: {username: $event.username}})"
		>
			<template slot="userType" slot-scope="row">
				{{ getNameUserType(row.item.profileId) }}
			</template>
		</b-table>
		<div class="row">
			<div class="my-1 mr-auto ml-auto">
				<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DataTable",
	props: ["name", "items", "fields"],
	data() {
		return {
			currentPage: 1,
			perPage: 5,
			totalRows: this.items.length,
			pageOptions: [5, 10, 15],
			sortBy: null,
			sortDesc: false,
			sortDirection: "asc",
			filter: null,
			modalInfo: { title: "", content: "" }
		}
	},
	computed: {
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
			switch(profileId) {
				case 1: return "Aluno"
				case 2: return "Propon. evento."
				case 3: return "Administrador"
			}
		},
		clicked() {
			console.log("clicked")
		},
		info(item, index, button) {
			this.modalInfo.title = `Row index: ${index}`
			this.modalInfo.content = JSON.stringify(item, null, 2)
			this.$root.$emit("bv::show::modal", "modalInfo", button)
		},
		resetModal() {
			this.modalInfo.title = ""
			this.modalInfo.content = ""
		},
		onFiltered(filteredItems) {
			this.totalRows = filteredItems.length
			this.currentPage = 1
		}
	}
}
</script>

<style>
td:hover{
	cursor: pointer;
}
</style>
