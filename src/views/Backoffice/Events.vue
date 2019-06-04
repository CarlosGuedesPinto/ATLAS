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
		this.loadPage()
	},
	data() {
		return {
			loading: false,
			events: [],
			eventsFields: [
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
	methods: {
		async loadPage() {
			this.$store.commit("RESET_STATE")
			this.loading = true
			try {
				let response
				if(this.getLoggedUser.profileId === 2) {
					response = await this.$http.get(`/events/authors/${this.getLoggedUser._id}`)
				}
				if(this.getLoggedUser.profileId === 3) {
					response = await this.$http.get("/events")
				}
				
				if (response.status === 200) {
					this.events = response.data
					this.loading = false
				}
			} catch (err) {
				this.$router.push({ name: "home" })
			}
		}
	},
	computed: {
		...mapGetters(["getLoggedUser"])
	}
}
</script>
