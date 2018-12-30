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
		>
			<template slot="row-details" slot-scope="row">
				<b-card>
					<ul>
						<li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
					</ul>
				</b-card>
			</template>
		</b-table>
		<div class="row">
			<div class="my-1 mr-auto ml-auto">
				<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" variant="atlas2"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DataTable",
	props: ["items", "fields"],
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
			// Create an options list from our fields
			return this.fields
				.filter(f => f.sortable)
				.map(f => {
					return { text: f.label, value: f.key }
				})
		}
	},
	methods: {
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
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length
			this.currentPage = 1
		}
	}
}
</script>