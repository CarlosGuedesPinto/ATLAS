<template>
    <div class="pb-5">
		<Panel title="Adicionar evento">
			<FormEvent></FormEvent>
		</Panel>
        <Panel :title="getUserById(getLoggedUserId).profileId === 3 ? `Eventos - ${getEvents.length}` : `Meus eventos - ${getEventsByAuthorId(getLoggedUserId)}`" class="mt-5">
			<DataTable :items="getUserById(getLoggedUserId).profileId === 3 ? getEvents : getEventsByAuthorId(getLoggedUserId)" :fields="eventsFields"></DataTable>
		</Panel>
	</div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormEvent from "@/components/FormEvent.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from 'vuex';

export default {
    components: {
        Panel,
        FormEvent,
        DataTable
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
				},
				{
					key: "abbreviation",
					label: "Abreviação",
					sortable: true,
                },
                {
					key: "actions",
					label: ""
				}
			]
        }
    },
    computed: {
        ...mapGetters(["getUserById", "getLoggedUserId", "getEvents", "getEventsByAuthorId"])
    }
}
</script>
