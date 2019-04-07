<template>
	<div class="pb-5">
		<Panel title="Adicionar medalha">
			<FormTag></FormTag>
		</Panel>
		<Panel :title="`Medalhas - ${getMedals.length}`" class="mt-5">
			<DataTable name="medals" :items="getMedals" :fields="medalsFields"></DataTable>
		</Panel>
	</div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormTag from "@/components/FormMedal.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from "vuex"

export default {
	components: {
		Panel,
		FormMedal,
		DataTable
	},
	data() {
		return {
			tagsFields: [
				{
					key: "id",
					label: "ID",
					sortable: true,
					sortDirection: "desc"
				},
				{
					key: "name",
					label: "Nome",
					sortable: true
				},
				{
					key: "actions",
					label: ""
				}
			]
		}
	},
	computed: {
		...mapGetters(["getTags"])
	}
}
</script>