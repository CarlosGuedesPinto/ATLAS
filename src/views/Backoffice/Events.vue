<template>
	<div class="pb-5">
		<Panel title="Adicionar evento">
			<FormEvent/>
		</Panel>
		<Panel
			v-if="loading"
			:title="getLoggedUser.profileId === 3 ? 'Eventos - a carregar...' : 'Meus eventos - a carregar...'"
			class="mt-5"
		>
			<b-spinner variant="atlas" label="A carregar..."></b-spinner>
		</Panel>
		<Panel
			:title="getLoggedUser.profileId === 3 ? `Eventos - ${events.length}` : `Meus eventos - ${events.length}`"
			class="mt-5"
			v-else
		>
			<DataTable name="events" :items="events" :fields="eventsFields"></DataTable>
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
					sortable: true
				},
				{
					key: "author",
					label: "Autor",
					sortable: true
				},
				{
					key: "qr",
					label: "Código QR",
					sortable: false
				}
			]
		}
	},
	methods: {
		async loadPage() {
			this.loading = true
			try {
				const response = await this.$http.get("/events")

				if (response.status === 200) {
					this.events = response.data.content.events
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
