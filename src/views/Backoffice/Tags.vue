<template>
	<div class="pb-5">
		<Panel title="Adicionar tag">
			<FormTag></FormTag>
		</Panel>
		<Panel :title="`Tags - ${getTags.length}`" class="mt-5">
			<DataTable name="tags" :items="getTags" :fields="tagsFields"></DataTable>
		</Panel>
	</div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormTag from "@/components/FormTag.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from "vuex"

export default {
	components: {
		Panel,
		FormTag,
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