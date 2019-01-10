<template>
	<div class="pb-5">
		<Panel title="Adicionar evento">
			<FormEvent></FormEvent>
		</Panel>
		<Panel
			:title="getUserById(getLoggedUserId).profileId === 3 ? `Eventos - ${getEvents.length}` : `Meus eventos - ${getEventsByAuthorId(getLoggedUserId).length}`"
			class="mt-5"
		>
			<DataTable
				name="events"
				:items="getUserById(getLoggedUserId).profileId === 3 ? getEvents : getEventsByAuthorId(getLoggedUserId)"
				:fields="eventsFields"
			></DataTable>
		</Panel>
	</div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormEvent from "@/components/FormEvent.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from "vuex"

export default {
	components: {
		Panel,
		FormEvent,
		DataTable
	},
	created() {
		if (this.getUserById(this.getLoggedUserId).profileId === 3)
			this.eventsFields.splice(2, 0, {
				key: "author",
				label: "Autor (ID)",
				sortable: true
			})
	},
	data() {
		return {
			eventsFields: [
				{
					key: "id",
					label: "ID",
					sortable: true,
					sortDirection: "desc"
				},
				{
					key: "name",
					label: "Nome",
					sortable: true,
					sortDirection: "desc"
				},
				{
					key: "category",
					label: "Categoria",
					sortable: true
				},
				{
					key: "tags",
					label: "Tags",
					sortable: true
				},
				{
					key: "dateStart",
					label: "Data de início",
					sortable: true
				},
				{
					key: "dateEnd",
					label: "Data de fim",
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
		...mapGetters([
			"getUserById",
			"getLoggedUserId",
			"getEvents",
			"getEventsByAuthorId"
		])
	}
}
</script>
